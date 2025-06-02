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

// GET a single post by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: { author: true, comments: true, votes: true }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
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

// Vote (upvote or downvote) a post
router.post('/:id/vote', async (req, res) => {
  const { id } = req.params;
  const { username, type } = req.body; // type: 1 for upvote, -1 for downvote
  if (!username || ![1, -1].includes(type)) {
    return res.status(400).json({ error: 'Invalid vote data' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ error: 'User not found' });
    const postId = Number(id);
    // Check if vote exists
    const existingVote = await prisma.vote.findFirst({
      where: { userId: user.id, postId }
    });
    let vote;
    if (existingVote) {
      // Update vote
      vote = await prisma.vote.update({
        where: { id: existingVote.id },
        data: { type }
      });
    } else {
      // Create vote
      vote = await prisma.vote.create({
        data: { type, userId: user.id, postId }
      });
    }
    // Return updated post with votes
    const updatedPost = await prisma.post.findUnique({
      where: { id: postId },
      include: { author: true, comments: true, votes: true }
    });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to vote on post' });
  }
});

module.exports = router; 