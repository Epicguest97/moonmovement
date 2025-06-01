const express = require('express');
const router = express.Router();

// In-memory communities data
let communities = [];

// GET all communities
router.get('/', (req, res) => {
  res.json(communities);
});

// PUT (update) a community by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const community = communities.find(c => c.id === id);
  if (community) {
    community.name = name || community.name;
    community.description = description || community.description;
    res.json(community);
  } else {
    res.status(404).json({ error: 'Community not found' });
  }
});

module.exports = router; 