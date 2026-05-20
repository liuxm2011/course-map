import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import type { Course, Major, CourseSection, CourseCategory, AddCourseFormData } from './types';
import { generateId, SECTION_COLORS_LABEL } from './data/styles';
import { SEMESTER_LABELS } from './data/styles';
import { Header } from './components/Header';
import { Legend } from './components/Legend';
import { SemesterCell } from './components/SemesterCell';
import { AddCourseModal } from './components/AddCourseModal';
import { StatsPanel } from './components/StatsPanel';

const SECTIONS: CourseSection[] = ['general', 'math', 'base', 'core', 'practice'];
const SEMESTER_NUMS = [1, 2, 3, 4, 5, 6, 7, 8];

const App: React.FC = () => {
  const [majors, setMajors] = useState<Major[]>([]);
  const [currentMajorId, setCurrentMajorId] = useState<string>('bigdata');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'map' | 'stats'>('map');
  const [showModal, setShowModal] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // Load majors once
  useEffect(() => {
    fetch('/api/majors')
      .then(r => r.json())
      .then(json => setMajors(json.data ?? []))
      .catch(() => {});
  }, []);

  // Load courses when major changes
  useEffect(() => {
    setLoading(true);
    fetch(`/api/majors/${currentMajorId}/courses`)
      .then(r => r.json())
      .then(json => setCourses(json.data ?? []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [currentMajorId]);

  // Group courses by section+semester
  const courseMap = useMemo(() => {
    const map: { [key: string]: Course[] } = {};
    for (const section of SECTIONS) {
      for (const sem of SEMESTER_NUMS) {
        map[`${section}-${sem}`] = courses.filter(
          c => c.section === section && c.semester === sem
        );
      }
    }
    return map;
  }, [courses]);

  // Per-semester hours for stats row (active non-practice courses only)
  const semesterHours = useMemo(() => {
    const result: Record<number, number> = {};
    for (const sem of SEMESTER_NUMS) {
      result[sem] = courses
        .filter(c => c.semester === sem && c.status === 'active' && c.section !== 'practice')
        .reduce((sum, c) => sum + c.hours_weekly, 0);
    }
    return result;
  }, [courses]);

  const totalCourses = courses.length;

  // API helpers
  const apiPut = useCallback((courseId: string, patch: Partial<Course>) => {
    fetch(`/api/majors/${currentMajorId}/courses/${courseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    }).catch(() => {});
  }, [currentMajorId]);

  const apiDelete = useCallback((courseId: string) => {
    fetch(`/api/majors/${currentMajorId}/courses/${courseId}`, { method: 'DELETE' })
      .catch(() => {});
  }, [currentMajorId]);

  const apiPost = useCallback((course: Course) => {
    fetch(`/api/majors/${currentMajorId}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    }).catch(() => {});
  }, [currentMajorId]);

  // Handlers
  const handleDelete = useCallback((id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    apiDelete(id);
  }, [apiDelete]);

  const handleAdd = useCallback((data: AddCourseFormData) => {
    const newCourse: Course = {
      id: generateId(),
      major_id: currentMajorId,
      code: data.code,
      name: data.name,
      credits: data.credits,
      hours_theory: data.hours_theory,
      hours_practice: data.hours_practice,
      hours_weekly: data.hours_weekly,
      weeks_teaching: data.weeks_teaching,
      semester: data.semester,
      section: data.section,
      category: data.section,
      badge: data.badge,
      status: data.status,
      notes: '',
    };
    setCourses(prev => [...prev, newCourse]);
    apiPost(newCourse);
  }, [currentMajorId, apiPost]);

  // Drag handlers
  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, courseId: string) => {
    setDraggingId(courseId);
    e.dataTransfer.setData('text/plain', courseId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDragOverId(null);
  }, []);

  const handleDragOverCell = useCallback((e: React.DragEvent<HTMLDivElement>, cellId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(cellId);
  }, []);

  const handleDragLeaveCell = useCallback((cellId: string) => {
    if (dragOverId === cellId) setDragOverId(null);
  }, [dragOverId]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, targetCellId: string) => {
    e.preventDefault();
    setDraggingId(null);
    setDragOverId(null);

    const courseId = e.dataTransfer.getData('text/plain');
    const activeCourse = courses.find(c => c.id === courseId);
    if (!activeCourse) return;

    const parts = targetCellId.split('-');
    const targetSec = parts.slice(0, -1).join('-') as CourseSection;
    const targetSem = Number(parts[parts.length - 1]);

    if (!SECTIONS.includes(targetSec) || !SEMESTER_NUMS.includes(targetSem)) return;
    if (activeCourse.section === targetSec && activeCourse.semester === targetSem) return;

    const patch = { section: targetSec, semester: targetSem, category: targetSec as unknown as CourseCategory };
    setCourses(prev =>
      prev.map(c => c.id === courseId ? { ...c, ...patch } : c)
    );
    apiPut(courseId, patch);
  }, [courses, apiPut]);

  const exportRef = useRef<HTMLDivElement>(null);
  const handleExport = useCallback(() => {
    if (!exportRef.current) return;
    html2canvas(exportRef.current, { scale: 2, backgroundColor: '#ffffff', useCORS: true })
      .then(canvas => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = '课程地图.png';
        a.click();
      });
  }, []);

  return (
    <div className="app">
      <Header
        majors={majors}
        currentMajorId={currentMajorId}
        onMajorChange={setCurrentMajorId}
        view={view}
        onViewChange={setView}
        onAddCourse={() => setShowModal(true)}
        onExport={handleExport}
        totalCourses={totalCourses}
      />

      {loading && (
        <div className="loading-state">加载课程数据中…</div>
      )}

      {!loading && view === 'map' && (
        <div ref={exportRef}>
          <div className="map-grid">
            {/* Semester labels + per-semester hours stats */}
            <div className="col-sems">
              <div className="sem-col">
                <div className="sem-label">学期</div>
                <div className="sem-hours">周学时</div>
              </div>
              {SEMESTER_NUMS.map(sem => (
                <div className="sem-col" key={sem}>
                  <div className="sem-label">{SEMESTER_LABELS[sem]}</div>
                  <div className="sem-hours">
                    {semesterHours[sem] > 0 ? `${semesterHours[sem]}节` : '—'}
                  </div>
                </div>
              ))}
            </div>

            {/* Sections */}
            {SECTIONS.map(section => {
              const sectionColor = SECTION_COLORS_LABEL[section];
              return (
                <div className="map-section" key={section}>
                  <div className="semester-row">
                    <div className="semester-cell spacer-cell">
                      <span className="section-label" style={{ color: sectionColor.bg }}>
                        {section === 'general'  && '通识教育课程'}
                        {section === 'math'     && '数学基础课程'}
                        {section === 'base'     && '专业基础课程'}
                        {section === 'core'     && '专业核心课程（大数据方向）'}
                        {section === 'practice' && '集中实践教学环节'}
                      </span>
                    </div>
                    {SEMESTER_NUMS.map(sem => {
                      const cellId = `${section}-${sem}`;
                      return (
                        <SemesterCell
                          key={sem}
                          cellId={cellId}
                          courses={courseMap[cellId] || []}
                          isOver={dragOverId === cellId}
                          onDragStart={handleDragStart}
                          onDragOver={handleDragOverCell}
                          onDragLeave={() => handleDragLeaveCell(cellId)}
                          onDrop={handleDrop}
                          onDragEnd={handleDragEnd}
                          onDelete={handleDelete}
                          draggingId={draggingId}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <Legend />
        </div>
      )}

      {!loading && view === 'stats' && (
        <StatsPanel courses={courses} />
      )}

      <AddCourseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default App;
