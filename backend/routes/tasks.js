const express = require('express');
const router = express.Router();
const db = require('../db');

// Fungsi acak waktu 5 menit - 2 jam
function generateTime() {
  return Math.floor(Math.random() * (7200 - 300 + 1)) + 300;
}

// Buat tugas baru
router.post('/', (req, res) => {
  const { user_id, title } = req.body;
  const reward_time = generateTime();

  db.query(
    'INSERT INTO tasks (user_id, title, reward_time, status) VALUES (?, ?, ?, ?)',
    [user_id, title, reward_time, 'open'],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Task created', reward_time });
    }
  );
});

// Ambil semua tugas
router.get('/', (req, res) => {
  db.query('SELECT * FROM tasks WHERE status = "open"', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
