
const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma');

// GET all startups
router.get('/', async (req, res) => {
  try {
    const startups = await prisma.startup.findMany({
      orderBy: {
        valuationNumber: 'desc'
      }
    });
    res.json(startups);
  } catch (error) {
    console.error('Error fetching startups:', error);
    res.status(500).json({ error: 'Failed to fetch startups' });
  }
});

// GET single startup by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const startup = await prisma.startup.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!startup) {
      return res.status(404).json({ error: 'Startup not found' });
    }
    
    res.json(startup);
  } catch (error) {
    console.error('Error fetching startup:', error);
    res.status(500).json({ error: 'Failed to fetch startup' });
  }
});

// PUT update startup by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sector, valuation, valuationNumber, city, foundedYear, logoUrl, description, isUnicorn } = req.body;
    
    const updatedStartup = await prisma.startup.update({
      where: { id: parseInt(id) },
      data: {
        name,
        sector,
        valuation,
        valuationNumber,
        city,
        foundedYear,
        logoUrl,
        description,
        isUnicorn
      }
    });
    
    res.json(updatedStartup);
  } catch (error) {
    console.error('Error updating startup:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Startup not found' });
    }
    res.status(500).json({ error: 'Failed to update startup' });
  }
});

// POST create new startup
router.post('/', async (req, res) => {
  try {
    const { name, sector, valuation, valuationNumber, city, foundedYear, logoUrl, description, isUnicorn } = req.body;
    
    const newStartup = await prisma.startup.create({
      data: {
        name,
        sector,
        valuation,
        valuationNumber,
        city,
        foundedYear,
        logoUrl,
        description,
        isUnicorn
      }
    });
    
    res.status(201).json(newStartup);
  } catch (error) {
    console.error('Error creating startup:', error);
    res.status(500).json({ error: 'Failed to create startup' });
  }
});

module.exports = router;
