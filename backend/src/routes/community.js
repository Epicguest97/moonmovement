
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all communities
router.get('/', async (req, res) => {
  try {
    const communities = await prisma.community.findMany({
      orderBy: {
        memberCount: 'desc'
      }
    });
    res.json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({ error: 'Failed to fetch communities' });
  }
});

// GET single community by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const community = await prisma.community.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    
    res.json(community);
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({ error: 'Failed to fetch community' });
  }
});

// POST create new community
router.post('/', async (req, res) => {
  try {
    const { name, description, bannerImage, icon } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    
    const community = await prisma.community.create({
      data: {
        name,
        description,
        bannerImage,
        icon,
        memberCount: 1,
        onlineCount: 1
      }
    });
    
    res.status(201).json(community);
  } catch (error) {
    console.error('Error creating community:', error);
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Community name already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create community' });
    }
  }
});

// PUT update community by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, bannerImage, icon, memberCount, onlineCount } = req.body;
    
    const community = await prisma.community.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(bannerImage !== undefined && { bannerImage }),
        ...(icon !== undefined && { icon }),
        ...(memberCount !== undefined && { memberCount }),
        ...(onlineCount !== undefined && { onlineCount })
      }
    });
    
    res.json(community);
  } catch (error) {
    console.error('Error updating community:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Community not found' });
    } else if (error.code === 'P2002') {
      res.status(400).json({ error: 'Community name already exists' });
    } else {
      res.status(500).json({ error: 'Failed to update community' });
    }
  }
});

// DELETE community by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.community.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Community deleted successfully' });
  } catch (error) {
    console.error('Error deleting community:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Community not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete community' });
    }
  }
});

module.exports = router;
