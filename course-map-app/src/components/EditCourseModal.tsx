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
