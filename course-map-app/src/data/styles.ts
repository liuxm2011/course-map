import type { Course, CourseCategory, CourseBadge, CourseSection } from '../types';

export const SECTION_COLORS: Record<CourseCategory, { bg: string; text: string; border?: string }> = {
  general: { bg: '#5B8DB8', text: '#fff' },
  math: { bg: '#2980B9', text: '#fff' },
  base: { bg: '#7B6BB5', text: '#fff' },
  core: { bg: '#E8A838', text: '#1A1A1A' },
  elective: { bg: '#5AABB0', text: '#fff' },
  practice: { bg: '#C06060', text: '#fff' },
  campus: { bg: '#16A085', text: '#fff' },
  new: { bg: '#D45A5A', text: '#fff', border: '#922B21' },
  reformed: { bg: '#E07B30', text: '#1A1A1A' },
};

export const CATEGORY_LABELS: Record<CourseSection, string> = {
  general: '通识教育',
  math: '数学基础',
  base: '专业基础',
  core: '专业核心',
  practice: '实践环节',
};

export const SECTION_COLORS_LABEL: Record<CourseSection, { bg: string; labelColor?: string }> = {
  general: { bg: '#5B8DB8' },
  math: { bg: '#3A7FBF' },
  base: { bg: '#7B6BB5' },
  core: { bg: '#B07020' },
  practice: { bg: '#A04040' },
};

export const BADGE_CONFIG: Record<CourseBadge, { label: string; bg: string }> = {
  new: { label: '新增', bg: '#C0392B' },
  reformed: { label: '改造', bg: '#E07B30' },
  deleted: { label: '删除', bg: '#888' },
  adjusted: { label: '调前', bg: '#6C3483' },
  keep: { label: '保留', bg: '#27AE60' },
};

export const SEMESTER_LABELS = ['入学前', '学期1', '学期2', '学期3', '学期4', '学期5', '学期6', '学期7', '学期8'];
export const GRADE_LABELS = ['', '一年级', '二年级', '三年级', '四年级'];

export function getCourseStyle(course: Course): { bg: string; color: string; border?: string; textDecoration?: string; opacity?: string } {
  if (course.status === 'deleted') {
    return { bg: '#AAA', color: '#666', textDecoration: 'line-through', opacity: '0.7' };
  }
  const colors = SECTION_COLORS[course.category];
  return {
    bg: colors.bg,
    color: colors.text,
    border: colors.border ? `2px solid ${colors.border}` : undefined,
  };
}

export function generateId(): string {
  return 'course_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
}
