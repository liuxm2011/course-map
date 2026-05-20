import React from 'react';
import { BADGE_CONFIG } from '../data/styles';

const legendItems: { color: string; label: string }[] = [
  { color: '#5B8DB8', label: '通识课程' },
  { color: '#2980B9', label: '数学/基础课' },
  { color: '#7B6BB5', label: '专业基础课' },
  { color: '#E8A838', label: '专业核心课' },
  { color: '#5AABB0', label: '专业选修课' },
  { color: '#C06060', label: '集中实践课' },
  { color: '#16A085', label: '校企合作课' },
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
