# Course Card Interaction Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hover-based delete button on course cards with a click-triggered context menu offering "编辑课程" and "删除课程" options, backed by a full edit dialog that syncs changes to the database.

**Architecture:** `CourseCard` gets local `menuOpen` state and renders a floating 2-option menu on click; a new `EditCourseModal` (cloned from `AddCourseModal`) handles editing; `App.tsx` gains `handleUpdate` which calls `apiPut` and updates React state so semester/section changes automatically reflow the card to the correct column via the existing `coursesByCell` memo.

**Tech Stack:** React 18, TypeScript, HTML5 Drag & Drop (native), Cloudflare Workers + D1 (backend via existing `apiPut`/`apiDelete`)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `course-map-app/src/components/CourseCard.tsx` | Modify | Remove delete button; add click→menu; add `onEdit` prop |
| `course-map-app/src/components/EditCourseModal.tsx` | Create | Pre-filled edit form for existing courses |
| `course-map-app/src/App.tsx` | Modify | Add `editingCourse` state, `handleUpdate`, `handleEditOpen`; wire new props |
| `course-map-app/src/index.css` | Modify | Remove `.course-delete` rules; add `.course-menu` styles |

---

### Task 1: Remove delete button + add context menu to CourseCard

**Files:**
- Modify: `course-map-app/src/components/CourseCard.tsx`

- [ ] **Step 1: Rewrite CourseCard.tsx**

Replace the entire file content:

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { getCourseStyle, BADGE_CONFIG } from '../data/styles';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  dragging: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, dragging, onDragStart, onDelete, onEdit }) => {
  const style = getCourseStyle(course);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dragHappenedRef = useRef(false);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dragHappenedRef.current = true;
    setMenuOpen(false);
    e.stopPropagation();
    onDragStart(e, course.id);
  };

  const handleDragEnd = () => {
    // Reset drag flag after a tick so onClick (which fires before dragend on some browsers) doesn't trigger menu
    setTimeout(() => { dragHappenedRef.current = false; }, 0);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragHappenedRef.current) return;
    e.stopPropagation();
    setMenuOpen(prev => !prev);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      style={{
        ...style,
        cursor: dragging ? 'grabbing' : 'pointer',
        opacity: dragging ? 0.4 : 1,
      }}
      className="course-card"
      ref={menuRef}
    >
      <span className="course-name">{course.name}</span>
      <span className="course-meta">
        {course.credits > 0 && <span className="course-credits">{course.credits}学分</span>}
        {course.hours_weekly > 0 && <span className="course-hours">{course.hours_weekly}节/周</span>}
      </span>
      {course.badge && (
        <span
          className="course-badge"
          style={{ background: BADGE_CONFIG[course.badge].bg }}
        >
          {BADGE_CONFIG[course.badge].label}
        </span>
      )}
      {menuOpen && (
        <div className="course-menu" onClick={e => e.stopPropagation()}>
          <button
            className="course-menu-item"
            onClick={e => { e.stopPropagation(); setMenuOpen(false); onEdit(course); }}
          >
            编辑课程
          </button>
          <button
            className="course-menu-item course-menu-item--danger"
            onClick={e => { e.stopPropagation(); setMenuOpen(false); onDelete(course.id); }}
          >
            删除课程
          </button>
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd course-map-app && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors from `CourseCard.tsx` (there will be errors from App.tsx until Task 3).

---

### Task 2: Create EditCourseModal

**Files:**
- Create: `course-map-app/src/components/EditCourseModal.tsx`

- [ ] **Step 1: Create the file**

```tsx
import React, { useState, useCallback, useEffect } from 'react';
import type { Course, AddCourseFormData, CourseSection } from '../types';
import { SECTION_COLORS_LABEL, CATEGORY_LABELS } from '../data/styles';

interface EditCourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: AddCourseFormData) => void;
}

const sectionOptions: { value: CourseSection; label: string }[] = Object.keys(SECTION_COLORS_LABEL).map(k => ({
  value: k as CourseSection,
  label: CATEGORY_LABELS[k as CourseSection],
}));

const semesterOptions = Array.from({ length: 8 }, (_, i) => i + 1);

function courseToForm(course: Course): AddCourseFormData {
  return {
    code: course.code,
    name: course.name,
    credits: course.credits,
    hours_theory: course.hours_theory,
    hours_practice: course.hours_practice,
    hours_weekly: course.hours_weekly,
    weeks_teaching: course.weeks_teaching,
    semester: course.semester,
    section: course.section,
    badge: course.badge,
    status: course.status,
  };
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({ course, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState<AddCourseFormData | null>(null);

  // Re-populate form whenever the target course changes
  useEffect(() => {
    if (course) setForm(courseToForm(course));
  }, [course]);

  const set = useCallback(<K extends keyof AddCourseFormData>(key: K, val: AddCourseFormData[K]) => {
    setForm(f => f ? { ...f, [key]: val } : f);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !course || !form.name.trim()) return;
    onSave(course.id, form);
    onClose();
  }, [form, course, onSave, onClose]);

  if (!isOpen || !form || !course) return null;

  const totalHours = form.hours_weekly * form.weeks_teaching;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content--wide" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>编辑课程</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Row 1: name + code */}
          <div className="modal-row modal-row--2col">
            <label className="modal-field">
              <span>课程名称 <span className="required">*</span></span>
              <input
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="例如：机器学习进阶"
                autoFocus
              />
            </label>
            <label className="modal-field">
              <span>课程编码</span>
              <input
                type="text"
                value={form.code}
                onChange={e => set('code', e.target.value)}
                placeholder="如 23133022"
              />
            </label>
          </div>

          {/* Row 2: section + semester + credits */}
          <div className="modal-row modal-row--3col">
            <label className="modal-field">
              <span>课程模块</span>
              <select value={form.section} onChange={e => set('section', e.target.value as CourseSection)}>
                {sectionOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
            <label className="modal-field">
              <span>开课学期</span>
              <select value={form.semester} onChange={e => set('semester', Number(e.target.value))}>
                {semesterOptions.map(s => <option key={s} value={s}>学期{s}</option>)}
              </select>
            </label>
            <label className="modal-field">
              <span>学分</span>
              <input
                type="number" min={0} step={0.5}
                value={form.credits}
                onChange={e => set('credits', Number(e.target.value))}
              />
            </label>
          </div>

          {/* Row 3: theory + practice + weekly + weeks */}
          <div className="modal-row modal-row--4col">
            <label className="modal-field">
              <span>理论学时</span>
              <input type="number" min={0}
                value={form.hours_theory}
                onChange={e => set('hours_theory', Number(e.target.value))}
              />
            </label>
            <label className="modal-field">
              <span>实践学时</span>
              <input type="number" min={0}
                value={form.hours_practice}
                onChange={e => set('hours_practice', Number(e.target.value))}
              />
            </label>
            <label className="modal-field">
              <span>周学时</span>
              <input type="number" min={0}
                value={form.hours_weekly}
                onChange={e => set('hours_weekly', Number(e.target.value))}
              />
            </label>
            <label className="modal-field">
              <span>上课周数</span>
              <input type="number" min={0}
                value={form.weeks_teaching}
                onChange={e => set('weeks_teaching', Number(e.target.value))}
              />
            </label>
          </div>

          {totalHours > 0 && (
            <div className="modal-hint">
              总学时预计：{form.hours_weekly} × {form.weeks_teaching} = <strong>{totalHours}h</strong>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>取消</button>
            <button type="submit" className="btn-submit" disabled={!form.name.trim()}>保存</button>
          </div>
        </form>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd course-map-app && npx tsc --noEmit 2>&1 | grep "EditCourseModal"
```

Expected: no errors for this file.

---

### Task 3: Update App.tsx

**Files:**
- Modify: `course-map-app/src/App.tsx`

- [ ] **Step 1: Add EditCourseModal import near top imports**

Find the existing import block and add:
```ts
import { EditCourseModal } from './components/EditCourseModal';
```

- [ ] **Step 2: Add editingCourse state near other useState calls**

```ts
const [editingCourse, setEditingCourse] = useState<Course | null>(null);
```

- [ ] **Step 3: Add handleEditOpen and handleUpdate callbacks near other handlers**

```ts
const handleEditOpen = useCallback((course: Course) => {
  setEditingCourse(course);
}, []);

const handleUpdate = useCallback((id: string, data: AddCourseFormData) => {
  const patch = {
    code: data.code,
    name: data.name,
    credits: data.credits,
    hours_theory: data.hours_theory,
    hours_practice: data.hours_practice,
    hours_weekly: data.hours_weekly,
    weeks_teaching: data.weeks_teaching,
    semester: data.semester,
    section: data.section,
    category: data.section as unknown as CourseCategory,
    badge: data.badge,
    status: data.status,
  };
  setCourses(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));
  apiPut(id, patch);
}, [apiPut]);
```

- [ ] **Step 4: Add onEdit prop to every CourseCard render site**

Find all `<CourseCard` usages in App.tsx (there is one in the grid render). Add `onEdit={handleEditOpen}`:

```tsx
<CourseCard
  key={course.id}
  course={course}
  dragging={draggingId === course.id}
  onDragStart={handleDragStart}
  onDelete={handleDelete}
  onEdit={handleEditOpen}
/>
```

- [ ] **Step 5: Render EditCourseModal in the JSX return**

Place alongside the existing `<AddCourseModal .../>`:
```tsx
<EditCourseModal
  course={editingCourse}
  isOpen={editingCourse !== null}
  onClose={() => setEditingCourse(null)}
  onSave={handleUpdate}
/>
```

- [ ] **Step 6: Verify full TypeScript compile passes**

```bash
cd course-map-app && npx tsc --noEmit 2>&1
```

Expected: no errors.

---

### Task 4: Update CSS

**Files:**
- Modify: `course-map-app/src/index.css`

- [ ] **Step 1: Remove .course-delete rules**

Delete the following block (lines ~279–303):
```css
.course-delete {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}

.course-card:hover .course-delete { opacity: 1; }
.course-delete:hover { 
  background: #fee2e2; 
  color: #ef4444; 
}
```

- [ ] **Step 2: Add .course-menu styles after .course-card block**

```css
.course-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 200;
  background: var(--bg-surface, #fff);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  min-width: 120px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.course-menu-item {
  padding: 9px 14px;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary, #1e293b);
  transition: background 0.15s;
}

.course-menu-item:hover {
  background: var(--bg-hover, #f1f5f9);
}

.course-menu-item--danger {
  color: #ef4444;
}

.course-menu-item--danger:hover {
  background: #fee2e2;
}
```

- [ ] **Step 3: Commit all changes**

```bash
git add course-map-app/src/components/CourseCard.tsx \
        course-map-app/src/components/EditCourseModal.tsx \
        course-map-app/src/App.tsx \
        course-map-app/src/index.css
git commit -m "feat: 课程卡片改为点击菜单交互，支持编辑课程并数据库联动"
```
