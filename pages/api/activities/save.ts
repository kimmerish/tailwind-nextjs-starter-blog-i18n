// /pages/api/activities/save.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не дозволено' });
  }

  // Очікувані поля на бекенді
const { email, activities } = req.body;

if (!email || !Array.isArray(activities)) {
  return res.status(400).json({ message: 'Invalid input' });
}


  let column = '';


  try {
    const ids = activities.join(',');  // Перетворюємо масив активностей в рядок для зберігання в БД
    await db.execute(
      `UPDATE users SET ${column} = ? WHERE email = ?`,
      [ids, email]
    );

    return res.status(200).json({ message: 'Активності оновлено' });
  } catch (error) {
    console.error('Помилка в БД:', error);
    return res.status(500).json({ message: 'Помилка на сервері' });
  }
}
