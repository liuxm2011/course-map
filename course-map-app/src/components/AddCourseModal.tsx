import React, { useState, useCallback } from 'react';
import type { AddCourseFormData, CourseSection } from '../types';
import { SECTION_COLORS_LABEL, CATEGORY_LABELS } from '../data/styles';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: AddCourseFormData) => void;
}

const sectionOptions: { value: CourseSection; label: string }[] = Object.keys(SECTION_COLORS_LABEL).map(k => ({
  value: k as CourseSection,
  label: CATEGORY_LABELS[k as CourseSection],
}));

const semesterOptions = Array.from({ length: 8 }, (_, i) => i + 1);

export const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState<AddCourseFormData>({
    name: '',
    credits: '',
    semester: 1,
    section: 'general',
    status: 'active',
  });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onAdd(form);
    setForm({ name: '', credits: '', semester: 1, section: 'general', status: 'active' });
    onClose();
  }, [form, onAdd, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>添加新课程</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            课程名称 <span className="required">*</span>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="例如：机器学习进阶"
              autoFocus
            />
          </label>
          <label>
            学分
            <input
              type="text"
              value={form.credits}
              onChange={e => setForm(f => ({ ...f, credits: e.target.value }))}
              placeholder="例如：3学分"
            />
          </label>
          <label>
            学期
            <select
              value={form.semester}
              onChange={e => setForm(f => ({ ...f, semester: Number(e.target.value) }))}
            >
              {semesterOptions.map(s => (
                <option key={s} value={s}>学期{s}</option>
              ))}
            </select>
          </label>
          <label>
            课程类别
            <select
              value={form.section}
              onChange={e => setForm(f => ({ ...f, section: e.target.value as CourseSection }))}
            >
              {sectionOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>取消</button>
            <button type="submit" className="btn-submit" disabled={!form.name.trim()}>添加</button>
          </div>
        </form>
      </div>
    </div>
  );
};
