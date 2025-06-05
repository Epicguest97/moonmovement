const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { JWT_SECRET, JWT_EXPIRES_IN, GOOGLE_CLIENT_ID } = require('../config');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Signup
router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });
    if (existing) {
      return res.status(400).json({ error: 'Email or username already in use' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, username, password: hash }
    });
    res.json({ id: user.id, email: user.email, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Google Authentication
router.post('/google', async (req, res) => {
  // Look for either tokenId or credential in the request
  const { tokenId, credential } = req.body;
  const token = tokenId || credential;
  
  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }
  
  try {
    // Add more debug logging
    console.log('Received Google auth token:', token ? 'Present' : 'Missing');
    console.log('Google Client ID being used:', GOOGLE_CLIENT_ID);
    
    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    });
    
    const { email, name, picture } = ticket.getPayload();
    
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email }
    });
    
    // If user doesn't exist, create a new one
    if (!user) {
      // Generate username from email (before the @)
      let username = email.split('@')[0];
      
      // Check if username exists, if so, add random numbers
      const existingUsername = await prisma.user.findUnique({ 
        where: { username } 
      });
      
      if (existingUsername) {
        username = `${username}${Math.floor(1000 + Math.random() * 9000)}`;
      }
      
      // Create new user with random password (they'll login with Google)
      const randomPassword = Math.random().toString(36).slice(-10);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
      user = await prisma.user.create({
        data: { 
          email, 
          username,
          password: hashedPassword,
          googleId: ticket.getUserId()
        }
      });
    } else if (!user.googleId) {
      // If existing user but first time with Google, update their Google ID
      user = await prisma.user.update({
        where: { email },
        data: { googleId: ticket.getUserId() }
      });
    }
    
    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    // Return user data and token
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        username: user.username 
      } 
    });
  } catch (err) {
    console.error('Google auth error details:', err);
    res.status(401).json({ error: 'Invalid Google token', details: err.message });
  }
});

module.exports = router;