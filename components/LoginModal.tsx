'use client';

import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string, language: 'uk' | 'en') => void;
};

const LoginModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState<'uk' | 'en'>('uk');

  const handleLogin = () => {
    if (email.trim()) {
      onSuccess(email, language);
    } else {
      alert('Введіть email');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ padding: 20, border: '1px solid black', backgroundColor: '#eee' }}>
      <h2>Вхід</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <select value={language} onChange={e => setLanguage(e.target.value as 'uk' | 'en')}>
        <option value="uk">Українська</option>
        <option value="en">English</option>
      </select>
      <div>
        <button onClick={handleLogin}>Увійти</button>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default LoginModal;
