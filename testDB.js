import db from './backend/database/db.js';

const test = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  console.log(rows);
};

test();
