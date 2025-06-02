const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true, comments: true, votes: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// POST a new post
router.post('/', async (req, res) => {
  const { title, content, subreddit, author, imageUrl, linkUrl } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username: author } });
    if (!user) return res.status(400).json({ error: 'Author not found' });
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
        subreddit,
        imageUrl,
        linkUrl,
      },
      include: { author: true, comments: true, votes: true }
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error('POST / Error:', err);
    res.status(500).json({ error: 'Failed to create post', details: err.message });
  }
});

// PUT (update) a post by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
      include: { author: true, comments: true, votes: true }
    });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: 'Post not found' });
  }
});

module.exports = router; 