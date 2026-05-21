import React from 'react';
import type { Major } from '../types';

interface HeaderProps {
  majors: Major[];
  currentMajorId: string;
  onMajorChange: (id: string) => void;
  currentYear: number;
  onYearChange: (year: number) => void;
  view: 'map' | 'stats';
  onViewChange: (v: 'map' | 'stats') => void;
  onAddCourse: () => void;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  majors, currentMajorId, onMajorChange,
  currentYear, onYearChange,
  view, onViewChange,
  onAddCourse, onExport,
}) => {
  const now = new Date().getFullYear();
  const yearOptions = [now - 2, now - 1, now, now + 1];

  return (
    <header className="header">
      <div className="header-left">
        <h1>专业课程地图</h1>
        <div className="header-subtitle">可拖拽编辑 · 多专业管理 · 数据云端同步</div>
      </div>

      <div className="header-center">
        <select
          className="major-select"
          value={currentYear}
          onChange={e => onYearChange(Number(e.target.value))}
        >
          {yearOptions.map(y => (
            <option key={y} value={y}>{y}年</option>
          ))}
        </select>

        <select
          className="major-select"
          value={currentMajorId}
          onChange={e => onMajorChange(e.target.value)}
          disabled={majors.length === 0}
        >
          {majors.length > 0
            ? majors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)
            : <option value="">加载中…</option>
          }
        </select>
      </div>

      <div className="header-right">
        <div className="view-tabs">
          <button
            className={`tab-btn ${view === 'map' ? 'tab-btn--active' : ''}`}
            onClick={() => onViewChange('map')}
          >课程地图</button>
          <button
            className={`tab-btn ${view === 'stats' ? 'tab-btn--active' : ''}`}
            onClick={() => onViewChange('stats')}
          >统计分析</button>
        </div>
        {view === 'map' && (
          <>
            <button className="btn-add" onClick={onAddCourse}>添加课程</button>
            <button className="btn-export" onClick={onExport}>导出地图</button>
          </>
        )}
      </div>
    </header>
  );
};
