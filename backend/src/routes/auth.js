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
  const { tokenId, credential } = req.body;
  const googleToken = tokenId || credential;
  
  if (!googleToken) {
    return res.status(400).json({ error: 'No token provided' });
  }
  
  try {
    console.log('Processing Google authentication token');
    
    const ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const { email, name } = payload;
    
    if (!email) {
      return res.status(400).json({ error: 'Email not provided by Google' });
    }
    
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
    
    // Generate JWT token (renamed to avoid conflict)
    const jwtToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    // Return user data and token
    res.json({ 
      token: jwtToken, 
      user: { 
        id: user.id, 
        email: user.email, 
        username: user.username 
      } 
    });
  } catch (err) {
    console.error('Google auth error details:', err);
    res.status(401).json({ 
      error: 'Invalid Google token', 
      details: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Add this route for handling Google OAuth callback
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    // Exchange code for tokens
    const { tokens } = await googleClient.getToken(code);
    const idToken = tokens.id_token;
    
    // Verify ID token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID
    });
    
    const { email, name } = ticket.getPayload();
    
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
    }
    
    // Generate token
    const authToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    // Determine which domain to redirect to based on request origin or environment
    const referrer = req.get('Referrer') || '';
    let redirectDomain;
    
    if (referrer.includes('vercel.app')) {
      redirectDomain = 'https://moonmovement.vercel.app';
    } else if (referrer.includes('onrender.com')) {
      redirectDomain = 'https://moonmovement.onrender.com';
    } else {
      // Default or local development
      redirectDomain = process.env.FRONTEND_URL || 'https://moonmovement.onrender.com';
    }
    
    // Redirect to frontend with token
    res.redirect(`${redirectDomain}/auth?token=${authToken}`);
  } catch (err) {
    console.error('Google callback error:', err);
    res.redirect('https://moonmovement.vercel.app/auth?error=google_auth_failed');
  }
});

module.exports = router;