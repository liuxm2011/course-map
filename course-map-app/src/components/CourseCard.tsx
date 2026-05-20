import React from 'react';
import type { Course } from '../types';
import { getCourseStyle, BADGE_CONFIG } from '../data/styles';

interface CourseCardProps {
  course: Course;
  dragging: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDelete: (id: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, dragging, onDragStart, onDelete }) => {
  const style = getCourseStyle(course);
  const totalHours = course.hours_weekly * course.weeks_teaching;

  return (
    <div
      draggable
      onDragStart={e => { e.stopPropagation(); onDragStart(e, course.id); }}
      style={{
        ...style,
        borderRadius: 5,
        padding: '4px 8px 4px 6px',
        fontSize: 11,
        fontWeight: 500,
        position: 'relative',
        lineHeight: 1.35,
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        cursor: dragging ? 'grabbing' : 'grab',
        opacity: dragging ? 0.4 : 1,
        transition: 'box-shadow 0.15s, opacity 0.15s',
      }}
      className="course-card"
    >
      <span className="course-name">{course.name}</span>
      <span className="course-meta">
        {course.credits > 0 && <span className="course-credits">{course.credits}学分</span>}
        {totalHours > 0 && <span className="course-hours">{totalHours}h</span>}
      </span>
      {course.badge && (
        <span
          className="course-badge"
          style={{ background: BADGE_CONFIG[course.badge].bg }}
        >
          {BADGE_CONFIG[course.badge].label}
        </span>
      )}
      <button
        className="course-delete"
        onClick={e => { e.stopPropagation(); onDelete(course.id); }}
        title="删除此课程"
      >
        ×
      </button>
    </div>
  );
};
