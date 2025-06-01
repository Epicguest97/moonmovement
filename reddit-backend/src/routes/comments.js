const express = require('express');
const router = express.Router();

// In-memory comments data
let comments = [];

// GET all comments
router.get('/', (req, res) => {
  res.json(comments);
});

// PUT (update) a comment by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const comment = comments.find(c => c.id === id);
  if (comment) {
    comment.content = content;
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

module.exports = router; 