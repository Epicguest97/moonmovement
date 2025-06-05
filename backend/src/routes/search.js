
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Search users
router.get('/users', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.json([]);
    }
    
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: q, mode: 'insensitive' } },
          { email: { contains: q, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            comments: true,
            communityMemberships: true
          }
        }
      },
      take: 20,
      orderBy: [
        { createdAt: 'desc' }
      ]
    });
    
    res.json(users);
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

// Search posts
router.get('/posts', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.json([]);
    }
    
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } },
          { subreddit: { contains: q, mode: 'insensitive' } },
          { tags: { contains: q, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        title: true,
        content: true,
        subreddit: true,
        createdAt: true,
        author: {
          select: {
            username: true
          }
        },
        _count: {
          select: {
            votes: true,
            comments: true
          }
        }
      },
      take: 20,
      orderBy: [
        { createdAt: 'desc' }
      ]
    });
    
    res.json(posts);
  } catch (error) {
    console.error('Search posts error:', error);
    res.status(500).json({ error: 'Failed to search posts' });
  }
});

// Search communities
router.get('/communities', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.json([]);
    }
    
    const communities = await prisma.community.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        description: true,
        memberCount: true,
        onlineCount: true,
        createdAt: true
      },
      take: 20,
      orderBy: [
        { memberCount: 'desc' }
      ]
    });
    
    res.json(communities);
  } catch (error) {
    console.error('Search communities error:', error);
    res.status(500).json({ error: 'Failed to search communities' });
  }
});

module.exports = router;
