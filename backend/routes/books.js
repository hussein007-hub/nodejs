const express = require('express');
const db = require('../db');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Get all books
router.get('/', auth, (req, res) => {
  db.query('SELECT * FROM books WHERE user_id = ?', [req.user.id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add book
router.post('/', auth, (req, res) => {
  const { title, author } = req.body;
  db.query('INSERT INTO books (title, author, user_id) VALUES (?, ?, ?)', [title, author, req.user.id], err => {
    if (err) throw err;
    res.json({ message: 'Book added' });
  });
});

// Update book
router.put('/:id', auth, (req, res) => {
  const { title, author } = req.body;
  db.query('UPDATE books SET title = ?, author = ? WHERE id = ? AND user_id = ?', [title, author, req.params.id, req.user.id], err => {
    if (err) throw err;
    res.json({ message: 'Book updated' });
  });
});

// Delete book
router.delete('/:id', auth, (req, res) => {
  db.query('DELETE FROM books WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], err => {
    if (err) throw err;
    res.json({ message: 'Book deleted' });
  });
});

module.exports = router;
