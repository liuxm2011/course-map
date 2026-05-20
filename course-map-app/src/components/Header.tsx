import React from 'react';

interface HeaderProps {
  onAddCourse: () => void;
  totalCourses: number;
}

export const Header: React.FC<HeaderProps> = ({ onAddCourse, totalCourses }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>数据科学与大数据技术专业课程地图（AI时代改革版）</h1>
        <div className="header-subtitle">
          核心方向：从"大数据工程师"转型为"AI时代数据+智能应用复合人才" | 专业代码：080910T
        </div>
      </div>
      <div className="header-right">
        <div className="header-stats">
          <span className="stat-badge">共 {totalCourses} 门课程</span>
        </div>
        <button className="btn-add" onClick={onAddCourse}>
           添加课程
        </button>
      </div>
    </header>
  );
};
