import type { Course, CourseCategory, CourseBadge, CourseSection } from '../types';

export const SECTION_COLORS: Record<CourseCategory, { bg: string; text: string; border?: string }> = {
  general: { bg: '#3B82F6', text: '#ffffff' },    // Blue 500
  math: { bg: '#0EA5E9', text: '#ffffff' },       // Cyan 500
  base: { bg: '#8B5CF6', text: '#ffffff' },       // Violet 500
  core: { bg: '#F59E0B', text: '#ffffff' },       // Amber 500
  elective: { bg: '#14B8A6', text: '#ffffff' },   // Teal 500
  practice: { bg: '#EF4444', text: '#ffffff' },   // Red 500
  campus: { bg: '#10B981', text: '#ffffff' },     // Emerald 500
  new: { bg: '#F43F5E', text: '#ffffff', border: '#BE123C' }, // Rose 500
  reformed: { bg: '#F97316', text: '#ffffff' },   // Orange 500
};

export const CATEGORY_LABELS: Record<CourseSection, string> = {
  general: '通识教育',
  math: '数学基础',
  base: '专业基础',
  core: '专业核心',
  practice: '实践环节',
};

export const SECTION_COLORS_LABEL: Record<CourseSection, { bg: string; labelColor?: string }> = {
  general: { bg: '#3B82F6' },
  math: { bg: '#0EA5E9' },
  base: { bg: '#8B5CF6' },
  core: { bg: '#F59E0B' },
  practice: { bg: '#EF4444' },
};

export const BADGE_CONFIG: Record<CourseBadge, { label: string; bg: string }> = {
  new: { label: '新增', bg: '#EF4444' },
  reformed: { label: '改造', bg: '#F59E0B' },
  deleted: { label: '删除', bg: '#94A3B8' },
  adjusted: { label: '调前', bg: '#8B5CF6' },
  keep: { label: '保留', bg: '#10B981' },
};

export const SEMESTER_LABELS = ['入学前', '学期1', '学期2', '学期3', '学期4', '学期5', '学期6', '学期7', '学期8'];
export const GRADE_LABELS = ['', '一年级', '二年级', '三年级', '四年级'];

export function getCourseStyle(course: Course): { backgroundColor: string; color: string; border?: string; textDecoration?: string; opacity?: string } {
  if (course.status === 'deleted') {
    return { backgroundColor: '#F1F5F9', color: '#94A3B8', border: '1px solid #CBD5E1', textDecoration: 'line-through' };
  }
  const colors = SECTION_COLORS[course.category];
  return {
    backgroundColor: colors.bg,
    color: colors.text,
    border: colors.border ? `2px solid ${colors.border}` : undefined,
  };
}

export function generateId(): string {
  return 'course_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
}
