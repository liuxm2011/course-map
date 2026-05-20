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
  return (
    <div
      draggable
      onDragStart={e => { e.stopPropagation(); onDragStart(e, course.id); }}
      style={{
        ...style,
        cursor: dragging ? 'grabbing' : 'grab',
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
