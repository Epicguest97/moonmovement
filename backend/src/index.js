
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const commentsRouter = require('./routes/comments');
const communityRouter = require('./routes/community');
const postRouter = require('./routes/post');
const newsRouter = require('./routes/news');
const authRoutes = require('./routes/auth');

app.get("/", (req, res) => {
  res.send("Reddit backend running");
});

app.use('/api/comments', commentsRouter);
app.use('/api/community', communityRouter);
app.use('/api/posts', postRouter);
app.use('/api/news', newsRouter);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
