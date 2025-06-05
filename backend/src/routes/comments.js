const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma');
const { authenticateToken } = require('../middleware/auth');

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

// POST a new comment - now requires authentication
router.post('/', authenticateToken, async (req, res) => {
  const { content, postId, parentId } = req.body;
  
  try {
    // IMPORTANT: Use the authenticated user's ID from the JWT token
    // instead of trusting any user ID sent in the request body
    const userId = req.user.userId;
    
    // Validate that the post exists
    const post = await prisma.post.findUnique({ where: { id: parseInt(postId) }});
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Create the comment using the authenticated user's ID
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(postId),
        authorId: userId,
        parentId: parentId ? parseInt(parentId) : null
      },
      include: {
        author: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });
    
    res.status(201).json(comment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Failed to create comment', details: err.message });
  }
});

// PUT (update) a comment by id - requires authentication
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  
  try {
    // Check if the comment belongs to the authenticated user
    const existingComment = await prisma.comment.findUnique({
      where: { id: Number(id) }
    });
    
    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    if (existingComment.authorId !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own comments' });
    }
    
    const updated = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content },
      include: { author: true, post: true }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// GET all comments for a specific post
router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      include: { author: true },
      orderBy: { createdAt: 'asc' }
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments for post' });
  }
});

module.exports = router;
