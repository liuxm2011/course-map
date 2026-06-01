import React, { useState, useEffect, useRef } from 'react';
import type { Course } from '../types';
import { getCourseStyle, BADGE_CONFIG } from '../data/styles';

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
  const cardRef = useRef<HTMLDivElement>(null);
  const dragHappenedRef = useRef(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
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
    setTimeout(() => { dragHappenedRef.current = false; }, 0);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragHappenedRef.current) return;
    e.stopPropagation();
    setMenuOpen(prev => !prev);
  };

  return (
    <div
      ref={cardRef}
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
