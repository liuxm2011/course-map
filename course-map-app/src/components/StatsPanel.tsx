import React, { useMemo } from 'react';
import type { Course } from '../types';
import { SEMESTER_LABELS, SECTION_COLORS_LABEL, CATEGORY_LABELS } from '../data/styles';
import type { CourseSection } from '../types';

interface StatsPanelProps {
  courses: Course[];
}

const SEMESTER_NUMS = [1, 2, 3, 4, 5, 6, 7, 8];
const SECTIONS: CourseSection[] = ['general', 'math', 'base', 'core', 'practice'];

export const StatsPanel: React.FC<StatsPanelProps> = ({ courses }) => {
  const stats = useMemo(() => {
    const active = courses.filter(c => c.status === 'active');
    const regular = active.filter(c => c.section !== 'practice');
    const practice = active.filter(c => c.section === 'practice');

    const totalCredits = active.reduce((s, c) => s + c.credits, 0);
    const totalTheory = regular.reduce((s, c) => s + c.hours_theory, 0);
    const totalPractice = regular.reduce((s, c) => s + c.hours_practice, 0);
    const totalHours = totalTheory + totalPractice;
    const practiceRatio = totalHours > 0 ? ((totalPractice / totalHours) * 100).toFixed(1) : '0.0';
    const totalPracticeWeeks = practice.reduce((s, c) => s + c.weeks_teaching, 0);

    const bySemester = SEMESTER_NUMS.map(sem => {
      const sem_regular = regular.filter(c => c.semester === sem);
      const sem_all = active.filter(c => c.semester === sem);
      return {
        sem,
        credits: sem_all.reduce((s, c) => s + c.credits, 0),
        theory: sem_regular.reduce((s, c) => s + c.hours_theory, 0),
        practice: sem_regular.reduce((s, c) => s + c.hours_practice, 0),
        hours: sem_regular.reduce((s, c) => s + c.hours_theory + c.hours_practice, 0),
        count: sem_all.length,
      };
    });

    const bySection = SECTIONS.map(section => {
      const sec = active.filter(c => c.section === section);
      const secRegular = sec.filter(c => c.section !== 'practice');
      return {
        section,
        count: sec.length,
        credits: sec.reduce((s, c) => s + c.credits, 0),
        hours: secRegular.reduce((s, c) => s + c.hours_theory + c.hours_practice, 0),
        practiceWeeks: section === 'practice' ? sec.reduce((s, c) => s + c.weeks_teaching, 0) : 0,
      };
    });

    return { totalCredits, totalTheory, totalPractice, totalHours, practiceRatio, totalPracticeWeeks, bySemester, bySection };
  }, [courses]);

  return (
    <div className="stats-panel">
      {/* Summary cards */}
      <div className="stats-summary">
        <div className="stats-card stats-card--blue">
          <div className="stats-card-value">{stats.totalCredits.toFixed(1)}</div>
          <div className="stats-card-label">总学分</div>
        </div>
        <div className="stats-card stats-card--teal">
          <div className="stats-card-value">{stats.totalHours}</div>
          <div className="stats-card-label">课内总学时</div>
        </div>
        <div className="stats-card stats-card--purple">
          <div className="stats-card-value">{stats.totalTheory}</div>
          <div className="stats-card-label">理论学时</div>
        </div>
        <div className="stats-card stats-card--orange">
          <div className="stats-card-value">{stats.totalPractice}</div>
          <div className="stats-card-label">实践学时</div>
        </div>
        <div className="stats-card stats-card--green">
          <div className="stats-card-value">{stats.practiceRatio}%</div>
          <div className="stats-card-label">实践学时占比</div>
        </div>
        <div className="stats-card stats-card--red">
          <div className="stats-card-value">{stats.totalPracticeWeeks}W</div>
          <div className="stats-card-label">集中实践总周数</div>
        </div>
      </div>

      <div className="stats-tables">
        {/* Per-semester breakdown */}
        <div className="stats-table-wrapper">
          <h3 className="stats-table-title">各学期分布</h3>
          <table className="stats-table">
            <thead>
              <tr>
                <th>学期</th>
                <th>课程数</th>
                <th>学分</th>
                <th>理论学时</th>
                <th>实践学时</th>
                <th>合计学时</th>
              </tr>
            </thead>
            <tbody>
              {stats.bySemester.map(row => (
                <tr key={row.sem}>
                  <td className="stats-sem-label">{SEMESTER_LABELS[row.sem]}</td>
                  <td>{row.count}</td>
                  <td>{row.credits.toFixed(1)}</td>
                  <td>{row.theory}</td>
                  <td>{row.practice}</td>
                  <td className="stats-highlight">{row.hours}</td>
                </tr>
              ))}
              <tr className="stats-total-row">
                <td>合计</td>
                <td>{courses.filter(c => c.status === 'active').length}</td>
                <td>{stats.totalCredits.toFixed(1)}</td>
                <td>{stats.totalTheory}</td>
                <td>{stats.totalPractice}</td>
                <td className="stats-highlight">{stats.totalHours}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Per-section breakdown */}
        <div className="stats-table-wrapper">
          <h3 className="stats-table-title">课程模块分布</h3>
          <table className="stats-table">
            <thead>
              <tr>
                <th>模块</th>
                <th>课程数</th>
                <th>学分</th>
                <th>课内学时</th>
                <th>集中实践</th>
              </tr>
            </thead>
            <tbody>
              {stats.bySection.map(row => {
                const color = SECTION_COLORS_LABEL[row.section];
                return (
                  <tr key={row.section}>
                    <td>
                      <span className="section-dot" style={{ background: color.bg }} />
                      {CATEGORY_LABELS[row.section]}
                    </td>
                    <td>{row.count}</td>
                    <td>{row.credits.toFixed(1)}</td>
                    <td>{row.hours > 0 ? row.hours : '—'}</td>
                    <td>{row.practiceWeeks > 0 ? `${row.practiceWeeks}W` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="stats-note">
        * 课内学时 = 理论学时 + 实践学时，不含集中实践环节。集中实践环节以周数计。
      </p>
    </div>
  );
};
