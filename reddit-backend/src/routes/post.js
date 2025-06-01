const express = require('express');
const router = express.Router();

// In-memory posts data
let posts = [];

// GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// PUT (update) a post by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = posts.find(p => p.id === id);
  if (post) {
    post.title = title || post.title;
    post.content = content || post.content;
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

module.exports = router; 