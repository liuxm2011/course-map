import React from 'react';

const legendItems: { color: string; label: string }[] = [
  { color: '#3B82F6', label: '通识课程' },
  { color: '#0EA5E9', label: '数学/基础课' },
  { color: '#8B5CF6', label: '专业基础课' },
  { color: '#F59E0B', label: '专业核心课' },
  { color: '#14B8A6', label: '专业选修课' },
  { color: '#EF4444', label: '集中实践课' },
  { color: '#10B981', label: '校企合作课' },
];

export const Legend: React.FC = () => {
  return (
    <div className="legend-bar">
      <span className="legend-title">课程图示：</span>
      {legendItems.map(item => (
        <div className="legend-item" key={item.label}>
          <div className="legend-dot" style={{ background: item.color }} />
          {item.label}
        </div>
      ))}
      <div className="legend-hint">拖拽课程卡片可调整学期，点击 × 可删除</div>
    </div>
  );
};
