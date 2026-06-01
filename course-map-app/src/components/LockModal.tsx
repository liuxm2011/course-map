import React, { useState, useCallback, useEffect } from 'react';

interface LockModalProps {
  isOpen: boolean;
  mode: 'lock' | 'unlock';
  onClose: () => void;
  onConfirm: (password: string) => boolean;
}

export const LockModal: React.FC<LockModalProps> = ({ isOpen, mode, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) { setPassword(''); setError(false); }
  }, [isOpen]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const ok = onConfirm(password);
    if (!ok) { setError(true); setPassword(''); }
  }, [password, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content lock-modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === 'lock' ? '定稿确认' : '解锁确认'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <label className="modal-field">
            <span>{mode === 'lock' ? '输入定稿密码以锁定地图' : '输入密码以解除定稿'}</span>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              autoFocus
              placeholder="请输入密码"
            />
          </label>
          {error && <div className="lock-modal-error">密码错误，请重试</div>}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>取消</button>
            <button type="submit" className="btn-submit" disabled={!password}>确认</button>
          </div>
        </form>
      </div>
    </div>
  );
};
