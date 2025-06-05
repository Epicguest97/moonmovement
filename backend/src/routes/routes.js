
const express = require('express');
const authRoutes = require('./auth');
const postRoutes = require('./post');
const commentRoutes = require('./comments');
const newsRoutes = require('./news');
const startupRoutes = require('./startups');
const communityRoutes = require('./community');
const userActivityRoutes = require('./userActivity');
const searchRoutes = require('./search');
const userSettingsRoutes = require('./userSettings');

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/auth', userSettingsRoutes); // Mount user settings under /auth
router.use('/', postRoutes);
router.use('/', commentRoutes);
router.use('/news', newsRoutes);
router.use('/startups', startupRoutes);
router.use('/community', communityRoutes);
router.use('/user-activity', userActivityRoutes);
router.use('/search', searchRoutes);

module.exports = router;
