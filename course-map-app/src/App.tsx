import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import type { Course, CourseSection, AddCourseFormData } from './types';
import { initialCourses } from './data/courses';
import { generateId, SECTION_COLORS_LABEL } from './data/styles';
import { SEMESTER_LABELS } from './data/styles';
import { Header } from './components/Header';
import { Legend } from './components/Legend';
import { SemesterCell } from './components/SemesterCell';
import { AddCourseModal } from './components/AddCourseModal';

const STORAGE_KEY = 'course-map-data';

function loadCourses(): Course[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return initialCourses;
}

function saveCourses(courses: Course[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

const SECTIONS: CourseSection[] = ['general', 'math', 'base', 'core', 'practice'];
const SEMESTER_NUMS = [1, 2, 3, 4, 5, 6, 7, 8];

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(loadCourses);
  const [showModal, setShowModal] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  // Group courses by section+semester
  const courseMap = useMemo(() => {
    const map: { [key: string]: Course[] } = {};
    for (const section of SECTIONS) {
      for (const sem of SEMESTER_NUMS) {
        const id = `${section}-${sem}`;
        map[id] = courses.filter(c => c.section === section && c.semester === sem);
      }
    }
    return map;
  }, [courses]);

  // Stats
  const totalCourses = courses.length;

  // Handlers
  const handleDelete = useCallback((id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  }, []);

  const handleAdd = useCallback((data: AddCourseFormData) => {
    const newCourse: Course = {
      id: generateId(),
      name: data.name,
      credits: data.credits,
      semester: data.semester,
      category: data.section,
      status: data.status,
      section: data.section,
      badge: data.badge,
    };
    setCourses(prev => [...prev, newCourse]);
  }, []);

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
    if (dragOverId === cellId) {
      setDragOverId(null);
    }
  }, [dragOverId]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, targetCellId: string) => {
    e.preventDefault();
    setDraggingId(null);
    setDragOverId(null);

    const courseId = e.dataTransfer.getData('text/plain');
    const activeCourse = courses.find(c => c.id === courseId);
    if (!activeCourse) return;

    // Parse target cell: "section-semester"
    const [targetSection, targetSemStr] = targetCellId.split('-');
    const targetSem = Number(targetSemStr);
    const targetSec = targetSection as CourseSection;

    if (!SECTIONS.includes(targetSec) || !SEMESTER_NUMS.includes(targetSem)) return;

    // If same cell, reorder (move to bottom of cell for simplicity)
    if (activeCourse.section === targetSec && activeCourse.semester === targetSem) {
      return; // Already in the same cell, no change needed
    }

    // Move to different cell
    setCourses(prev =>
      prev.map(c =>
        c.id === courseId
          ? { ...c, section: targetSec, semester: targetSem, category: targetSec }
          : c
      )
    );
  }, [courses]);

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
        onAddCourse={() => setShowModal(true)}
        onExport={handleExport}
        totalCourses={totalCourses}
      />

      <div ref={exportRef}>
      <div className="map-grid">
        {/* Semester labels */}
        <div className="col-sems">
          <div className="sem-label" />
          {SEMESTER_NUMS.map(sem => (
            <div className="sem-label" key={sem}>{SEMESTER_LABELS[sem]}</div>
          ))}
        </div>

        {/* Sections */}
        {SECTIONS.map(section => {
          const sectionColor = SECTION_COLORS_LABEL[section];

          return (
            <div className="map-section" key={section}>
              <div className="section-title" style={{ background: `${sectionColor.bg}15`, color: sectionColor.bg }}>
                <span className="section-text">
                  {section === 'general' && '通识教育课程'}
                  {section === 'math' && '数学基础课程'}
                  {section === 'base' && '专业基础课程'}
                  {section === 'core' && '专业核心课程（大数据方向）'}
                  {section === 'practice' && '集中实践教学环节'}
                </span>
                <span className="section-count">
                  {courses.filter(c => c.section === section && c.status === 'active').length}门在用
                  {courses.filter(c => c.section === section && c.status === 'deleted').length > 0 &&
                    ` / ${courses.filter(c => c.section === section && c.status === 'deleted').length}门删除`}
                </span>
              </div>
              <div className="semester-row">
                <div className="semester-cell spacer-cell" />
                {SEMESTER_NUMS.map(sem => {
                  const cellId = `${section}-${sem}`;
                  const semCourses = courseMap[cellId] || [];
                  return (
                    <SemesterCell
                      key={sem}
                      cellId={cellId}
                      courses={semCourses}
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

      {/* Add course modal */}
      <AddCourseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default App;
