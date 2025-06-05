
const express = require('express');
const postRoutes = require('./post');
const authRoutes = require('./auth');
const commentRoutes = require('./comments');
const communityRoutes = require('./community');
const newsRoutes = require('./news');
const startupRoutes = require('./startups');
const searchRoutes = require('./search');
const userActivityRoutes = require('./userActivity');

const router = express.Router();

router.use('/posts', postRoutes);
router.use('/auth', authRoutes);
router.use('/comments', commentRoutes);
router.use('/community', communityRoutes);
router.use('/news', newsRoutes);
router.use('/startups', startupRoutes);
router.use('/search', searchRoutes);
router.use('/user-activity', userActivityRoutes);

module.exports = router;
