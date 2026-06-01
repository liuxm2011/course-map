import React from 'react';
import type { Course } from '../types';
import { CourseCard } from './CourseCard';

interface SemesterCellProps {
  cellId: string;
  courses: Course[];
  isOver: boolean;
  draggingId: string | null;
  locked: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, cellId: string) => void;
  onDragLeave: (cellId: string) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, cellId: string) => void;
  onDragEnd: () => void;
  onDelete: (id: string) => void;
  onEdit: (course: Course) => void;
}

export const SemesterCell: React.FC<SemesterCellProps> = ({
  cellId,
  courses,
  isOver,
  draggingId,
  locked,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      className={`semester-cell ${isOver && !locked ? 'semester-cell--over' : ''}`}
      onDragOver={locked ? undefined : e => onDragOver(e, cellId)}
      onDragLeave={locked ? undefined : () => onDragLeave(cellId)}
      onDrop={locked ? undefined : e => onDrop(e, cellId)}
      onDragEnd={locked ? undefined : onDragEnd}
    >
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
          dragging={draggingId === course.id}
          locked={locked}
          onDragStart={onDragStart}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
