import React from 'react';

interface HeaderProps {
  onAddCourse: () => void;
  onReset: () => void;
  totalCourses: number;
  activeCourses: number;
  deletedCourses: number;
}

export const Header: React.FC<HeaderProps> = ({ onAddCourse, onReset, totalCourses, activeCourses, deletedCourses }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>数据科学与大数据技术专业课程地图（AI时代改革版）</h1>
        <div className="header-subtitle">
          核心方向：从"大数据工程师"转型为"AI时代数据+智能应用复合人才" | 专业代码：080910T
        </div>
      </div>
      <div className="header-right">
        <div className="header-meta">
          萍乡学院 · 信息与计算机工程学院<br />
          数据科学与大数据技术教研室
        </div>
        <div className="header-stats">
          <span className="stat-badge stat-total">课程 {totalCourses}</span>
          <span className="stat-badge stat-active">在用 {activeCourses}</span>
          <span className="stat-badge stat-deleted">删除 {deletedCourses}</span>
        </div>
        <div className="header-actions">
          <button className="btn-add" onClick={onAddCourse}>
            ＋ 添加课程
          </button>
          <button className="btn-reset" onClick={onReset}>
            重置
          </button>
        </div>
      </div>
    </header>
  );
};
