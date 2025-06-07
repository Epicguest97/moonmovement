
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const prisma = new PrismaClient();
const router = express.Router();

// Get all chat rooms for the authenticated user
router.get('/rooms', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const chatRooms = await prisma.chatRoom.findMany({
      where: {
        users: {
          some: {
            userId: userId
          }
        }
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                isOnline: true,
                lastSeen: true
              }
            }
          }
        },
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                username: true
              }
            }
          }
        },
        _count: {
          select: {
            messages: {
              where: {
                isRead: false,
                senderId: {
                  not: userId
                }
              }
            }
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    res.json(chatRooms);
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
});

// Start a new chat with a user
router.post('/start', authenticateToken, async (req, res) => {
  try {
    const { username } = req.body;
    const currentUserId = req.user.userId;

    // Find the user to chat with
    const targetUser = await prisma.user.findUnique({
      where: { username }
    });

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (targetUser.id === currentUserId) {
      return res.status(400).json({ error: 'Cannot start chat with yourself' });
    }

    // Check if a chat room already exists between these users
    const existingRoom = await prisma.chatRoom.findFirst({
      where: {
        isGroup: false,
        users: {
          every: {
            userId: {
              in: [currentUserId, targetUser.id]
            }
          }
        }
      },
      include: {
        users: true
      }
    });

    if (existingRoom && existingRoom.users.length === 2) {
      return res.json(existingRoom);
    }

    // Create new chat room
    const chatRoom = await prisma.chatRoom.create({
      data: {
        isGroup: false,
        users: {
          create: [
            { userId: currentUserId },
            { userId: targetUser.id }
          ]
        }
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                isOnline: true,
                lastSeen: true
              }
            }
          }
        }
      }
    });

    res.json(chatRoom);
  } catch (error) {
    console.error('Error starting chat:', error);
    res.status(500).json({ error: 'Failed to start chat' });
  }
});

// Get messages for a specific chat room
router.get('/rooms/:roomId/messages', authenticateToken, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const userId = req.user.userId;

    // Verify user is part of this chat room
    const chatRoom = await prisma.chatRoom.findFirst({
      where: {
        id: parseInt(roomId),
        users: {
          some: {
            userId: userId
          }
        }
      }
    });

    if (!chatRoom) {
      return res.status(404).json({ error: 'Chat room not found or access denied' });
    }

    const messages = await prisma.message.findMany({
      where: {
        chatRoomId: parseInt(roomId)
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit)
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        chatRoomId: parseInt(roomId),
        senderId: {
          not: userId
        },
        isRead: false
      },
      data: {
        isRead: true
      }
    });

    res.json(messages.reverse());
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send a message
router.post('/rooms/:roomId/messages', authenticateToken, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { content, messageType = 'text', attachmentUrl } = req.body;
    const userId = req.user.userId;

    if (!content && !attachmentUrl) {
      return res.status(400).json({ error: 'Message content or attachment is required' });
    }

    // Verify user is part of this chat room
    const chatRoom = await prisma.chatRoom.findFirst({
      where: {
        id: parseInt(roomId),
        users: {
          some: {
            userId: userId
          }
        }
      },
      include: {
        users: true
      }
    });

    if (!chatRoom) {
      return res.status(404).json({ error: 'Chat room not found or access denied' });
    }

    // Find receiver for direct messages
    const receiverId = chatRoom.isGroup ? null : 
      chatRoom.users.find(u => u.userId !== userId)?.userId;

    const message = await prisma.message.create({
      data: {
        content,
        chatRoomId: parseInt(roomId),
        senderId: userId,
        receiverId,
        messageType,
        attachmentUrl
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    // Update chat room's updatedAt
    await prisma.chatRoom.update({
      where: { id: parseInt(roomId) },
      data: { updatedAt: new Date() }
    });

    res.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Search users for chat
router.get('/users/search', authenticateToken, async (req, res) => {
  try {
    const { q } = req.query;
    const currentUserId = req.user.userId;

    if (!q || q.length < 2) {
      return res.json([]);
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            id: {
              not: currentUserId
            }
          },
          {
            username: {
              contains: q,
              mode: 'insensitive'
            }
          }
        ]
      },
      select: {
        id: true,
        username: true,
        isOnline: true,
        lastSeen: true
      },
      take: 10
    });

    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

// Update user online status
router.put('/status', authenticateToken, async (req, res) => {
  try {
    const { isOnline } = req.body;
    const userId = req.user.userId;

    await prisma.user.update({
      where: { id: userId },
      data: {
        isOnline: Boolean(isOnline),
        lastSeen: new Date()
      }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;
