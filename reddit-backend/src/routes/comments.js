const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: { author: true, post: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST a new comment
router.post('/', async (req, res) => {
  const { content, author, postId, parentId } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username: author } });
    if (!user) return res.status(400).json({ error: 'Author not found' });
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
        authorId: user.id,
        parentId: parentId ? Number(parentId) : null
      },
      include: { author: true, post: true }
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// PUT (update) a comment by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updated = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content },
      include: { author: true, post: true }
    });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: 'Comment not found' });
  }
});

module.exports = router; 