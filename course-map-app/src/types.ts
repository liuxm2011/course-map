export type CourseCategory = 'general' | 'math' | 'base' | 'core' | 'elective' | 'practice' | 'campus' | 'new' | 'reformed';
export type CourseBadge = 'new' | 'reformed' | 'deleted' | 'adjusted' | 'keep';
export type CourseStatus = 'active' | 'deleted' | 'adjusted';
export type CourseSection = 'general' | 'math' | 'base' | 'core' | 'practice';

export interface Major {
  id: string;
  name: string;
  year: number;
}

export interface Course {
  id: string;
  major_id: string;
  code: string;
  name: string;
  credits: number;
  hours_theory: number;
  hours_practice: number;
  hours_weekly: number;
  weeks_teaching: number;
  semester: number;
  section: CourseSection;
  category: CourseCategory;
  badge?: CourseBadge;
  status: CourseStatus;
  notes?: string;
}

export interface AddCourseFormData {
  code: string;
  name: string;
  credits: number;
  hours_theory: number;
  hours_practice: number;
  hours_weekly: number;
  weeks_teaching: number;
  semester: number;
  section: CourseSection;
  badge?: CourseBadge;
  status: CourseStatus;
}
