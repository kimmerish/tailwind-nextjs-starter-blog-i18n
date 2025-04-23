'use client';

import { useEffect, useState } from 'react';
import type { Activity } from '../types/activity';
import type { Block } from '../types/block';
import ActivityPicker from '../components/ActivityPicker';
import LoginModal from '../components/LoginModal';
import ContentBlock from '../components/ContentBlock';
import './globals.css'; // Підключення глобальних стилів

export default function HomePage() {
  const [user, setUser] = useState<{ email: string; language: 'uk' | 'en' } | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await fetch('/api/user');
      const userData = await userRes.json();
      setUser(userData);

      const actRes = await fetch('/api/activities');
      const actData = await actRes.json();
      setActivities(actData);

      const blockRes = await fetch('/api/blocks');
      const blockData = await blockRes.json();
      setBlocks(blockData);
    };

    fetchData();
  }, []);

  const backgroundClasses = [
    'bg-color-1',
    'bg-color-2',
    'bg-color-3',
    'bg-color-4',
    'bg-color-5',
  ];

  return (
    <main>
      {showLogin && (
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSuccess={(email, language) => {
            setUser({ email, language });
            setShowLogin(false);
          }}
        />
      )}

      {blocks.map((block, index) => {
        const backgroundClass = backgroundClasses[index % backgroundClasses.length];
        const text = user?.language === 'en' ? block.info_en : block.info_uk;

        return (
          <div key={block.id}>
            {index === 2 && user && (
              <ActivityPicker
                activities={activities}
                lang={user.language}
                userId={user.email}
              />
            )}
            <ContentBlock
              key={block.id}
              title={block.content}
              text={text}
              backgroundColor={backgroundClass}
            />
          </div>
        );
      })}
    </main>
  );
}
