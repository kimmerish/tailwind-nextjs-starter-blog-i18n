'use client';

import { useState } from 'react';
import type { Activity } from '../types/activity';

type Props = {
  activities: Activity[];
  lang: 'uk' | 'en';
  userId: string;
};

const ActivityPicker = ({ activities, lang, userId }: Props) => {
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);

  const handleSelect = (activityId: number) => {
    if (selectedActivities.includes(activityId)) {
      setSelectedActivities(selectedActivities.filter(id => id !== activityId));
    } else {
      setSelectedActivities([...selectedActivities, activityId]);
    }
  };

  const handleSave = async () => {
    if (!selectedActivities.length) {
      alert(lang === 'uk' ? 'Будь ласка, виберіть хоч одну активність' : 'Please select at least one activity');
      return;
    }

    try {
      const res = await fetch('/api/activities/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userId, activities: selectedActivities }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert(lang === 'uk' ? 'Збережено успішно' : 'Saved successfully');
    } catch (err) {
      alert(lang === 'uk' ? 'Помилка збереження' : 'Save failed');
    }
  };

  return (
    <div>
      {[1, 2, 3].map(day => (
        <div key={day}>
          <h3>{lang === 'uk' ? `День ${day}` : `Day ${day}`}</h3>
          {activities
            .filter(act => act.day === day)
            .map(act => (
              <label key={act.id}>
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(act.id)}
                  onChange={() => handleSelect(act.id)}
                />
                {lang === 'uk' ? act.title_uk : act.title_en}
              </label>
            ))}
          <br />
        </div>
      ))}
      <button onClick={handleSave}>{lang === 'uk' ? 'Зберегти вибір' : 'Save selection'}</button>
    </div>
  );
};

export default ActivityPicker;
