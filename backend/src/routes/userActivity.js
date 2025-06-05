
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Get user activities
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const activities = await prisma.userActivity.findMany({
      where: {
        userId: parseInt(userId)
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    });
    
    // Calculate total karma
    const totalKarma = activities.reduce((sum, activity) => sum + activity.points, 0);
    
    // Group activities by type
    const activityStats = {
      totalKarma,
      posts: activities.filter(a => a.activityType === 'post_created').length,
      comments: activities.filter(a => a.activityType === 'comment_created').length,
      votes: activities.filter(a => a.activityType === 'vote_cast').length,
      communitiesJoined: activities.filter(a => a.activityType === 'community_joined').length,
      activities: activities
    };
    
    res.json(activityStats);
  } catch (error) {
    console.error('Get user activities error:', error);
    res.status(500).json({ error: 'Failed to fetch user activities' });
  }
});

// Create activity record
router.post('/', async (req, res) => {
  try {
    const { userId, activityType, description, points, metadata } = req.body;
    
    const activity = await prisma.userActivity.create({
      data: {
        userId: parseInt(userId),
        activityType,
        description,
        points: points || 0,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });
    
    res.json(activity);
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

module.exports = router;
