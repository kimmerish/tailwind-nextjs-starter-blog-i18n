'use client';

import { useEffect, useState } from 'react';
import type { Activity } from '../types/activity';
import ActivityPicker from '../components/ActivityPicker';
import LoginModal from '../components/LoginModal';
import ContentBlock from '../components/ContentBlock';

type User = {
  email: string;
  language: 'uk' | 'en';
};

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [lang, setLang] = useState<'uk' | 'en'>('uk');

  useEffect(() => {
    if (!user) return;

    fetch('/api/activities')
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error('Activities fetch error:', err));
  }, [user]);

  const handleLoginSuccess = (email: string, language: 'uk' | 'en') => {
    setUser({ email, language });
    setLang(language);
    setShowLogin(false);
  };

  return (
    <main className="min-h-screen w-full">
      {showLogin && (
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {!showLogin && (
        <>
          <ContentBlock
            title="LIGHTING.\nTHE FUTURE.\nTOGETHER"
            text={lang === 'uk' ? 'Текст з блоку 1 українською' : 'Block 1 text in English'}
          />

          <section className="p-4">
            <ActivityPicker
              activities={activities}
              userId={user?.email || ''}
              lang={lang}
            />
          </section>
        </>
      )}
    </main>
  );
}
