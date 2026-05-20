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

const defaultForm: AddCourseFormData = {
  code: '',
  name: '',
  credits: 0,
  hours_theory: 0,
  hours_practice: 0,
  hours_weekly: 0,
  weeks_teaching: 0,
  semester: 1,
  section: 'general',
  status: 'active',
};

export const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState<AddCourseFormData>(defaultForm);

  const set = useCallback(<K extends keyof AddCourseFormData>(key: K, val: AddCourseFormData[K]) => {
    setForm(f => ({ ...f, [key]: val }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onAdd(form);
    setForm(defaultForm);
    onClose();
  }, [form, onAdd, onClose]);

  if (!isOpen) return null;

  const totalHours = form.hours_weekly * form.weeks_teaching;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content--wide" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>添加新课程</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Row 1: name + code */}
          <div className="modal-row">
            <label className="modal-field modal-field--grow">
              课程名称 <span className="required">*</span>
              <input
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="例如：机器学习进阶"
                autoFocus
              />
            </label>
            <label className="modal-field">
              课程编码
              <input
                type="text"
                value={form.code}
                onChange={e => set('code', e.target.value)}
                placeholder="如 23133022"
              />
            </label>
          </div>

          {/* Row 2: section + semester + credits */}
          <div className="modal-row">
            <label className="modal-field">
              课程模块
              <select value={form.section} onChange={e => set('section', e.target.value as CourseSection)}>
                {sectionOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
            <label className="modal-field">
              开课学期
              <select value={form.semester} onChange={e => set('semester', Number(e.target.value))}>
                {semesterOptions.map(s => <option key={s} value={s}>学期{s}</option>)}
              </select>
            </label>
            <label className="modal-field">
              学分
              <input
                type="number" min={0} step={0.5}
                value={form.credits}
                onChange={e => set('credits', Number(e.target.value))}
              />
            </label>
          </div>

          {/* Row 3: theory + practice + weekly + weeks */}
          <div className="modal-row">
            <label className="modal-field">
              理论学时
              <input type="number" min={0}
                value={form.hours_theory}
                onChange={e => set('hours_theory', Number(e.target.value))}
              />
            </label>
            <label className="modal-field">
              实践学时
              <input type="number" min={0}
                value={form.hours_practice}
                onChange={e => set('hours_practice', Number(e.target.value))}
              />
            </label>
            <label className="modal-field">
              周学时
              <input type="number" min={0}
                value={form.hours_weekly}
                onChange={e => set('hours_weekly', Number(e.target.value))}
              />
            </label>
            <label className="modal-field">
              上课周数
              <input type="number" min={0}
                value={form.weeks_teaching}
                onChange={e => set('weeks_teaching', Number(e.target.value))}
              />
            </label>
          </div>

          {totalHours > 0 && (
            <div className="modal-hint">
              总学时预计：{form.hours_weekly} × {form.weeks_teaching} = <strong>{totalHours}h</strong>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>取消</button>
            <button type="submit" className="btn-submit" disabled={!form.name.trim()}>添加</button>
          </div>
        </form>
      </div>
    </div>
  );
};
