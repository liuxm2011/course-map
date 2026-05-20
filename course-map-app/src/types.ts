export type CourseCategory = 'general' | 'math' | 'base' | 'core' | 'elective' | 'practice' | 'campus' | 'new' | 'reformed';
export type CourseBadge = 'new' | 'reformed' | 'deleted' | 'adjusted' | 'keep';
export type CourseStatus = 'active' | 'deleted' | 'adjusted';
export type CourseSection = 'general' | 'math' | 'base' | 'core' | 'practice';

export interface Course {
  id: string;
  name: string;
  credits: string;
  semester: number; // 1-8
  category: CourseCategory;
  badge?: CourseBadge;
  status: CourseStatus;
  section: CourseSection;
}

export interface SemesterData {
  id: string;
  title: string;
  courses: Course[];
}

export interface AppState {
  semesters: { [semesterId: string]: Course[] };
  sections: {
    id: CourseSection;
    title: string;
    color: string;
  }[];
}

export interface AddCourseFormData {
  name: string;
  credits: string;
  semester: number;
  section: CourseSection;
  badge?: CourseBadge;
  status: CourseStatus;
}
