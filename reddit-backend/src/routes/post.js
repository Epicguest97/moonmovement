const express = require('express');
const router = express.Router();

// In-memory posts data
let posts = [];

// GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// POST a new post
router.post('/', (req, res) => {
  const { title, content, subreddit, author, imageUrl, linkUrl } = req.body;
  const newPost = {
    id: (Date.now() + Math.random()).toString(),
    title,
    content,
    subreddit,
    author: author || 'anonymous',
    timestamp: new Date().toISOString(),
    voteScore: 1,
    commentCount: 0,
    imageUrl,
    linkUrl,
    isText: !!content,
    isLink: !!linkUrl
  };
  posts.unshift(newPost);
  res.status(201).json(newPost);
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