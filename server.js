const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const chatbotRoutes = require('./routes/chatbot');
const { authenticate } = require('./middleware/auth');
const ChatMessage = require('./models/ChatMessage');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'HuggingHeart API is running',
        timestamp: new Date().toISOString()
    });
});

// Socket.io connection handling
io.use((socket, next) => {
    // Optional: authenticate socket connections using JWT
    const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];
    
    if (!token) {
        // Allow connection without token for now (can be restricted later)
        return next();
    }
    
    try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        socket.userName = decoded.name;
        next();
    } catch (error) {
        // Allow connection anyway for now (can reject with: return next(new Error('Authentication error')))
        next();
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id, socket.userId ? `User ID: ${socket.userId}` : 'Anonymous');

    // Join user's personal room for direct messages
    if (socket.userId) {
        socket.join(`user_${socket.userId}`);
    }

    // Handle chat messages
    socket.on('send_message', async (data) => {
        try {
            const { receiver_id, message } = data;
            
            if (!message || !receiver_id) {
                socket.emit('error', { message: 'Message and receiver_id are required' });
                return;
            }

            if (!socket.userId) {
                socket.emit('error', { message: 'Authentication required' });
                return;
            }

            // Save message to database
            const chatMessage = await ChatMessage.create({
                sender_id: socket.userId,
                receiver_id: receiver_id,
                message: message
            });

            // Emit to receiver
            io.to(`user_${receiver_id}`).emit('receive_message', {
                id: chatMessage.id,
                sender_id: socket.userId,
                sender_name: socket.userName,
                receiver_id: receiver_id,
                message: message,
                created_at: chatMessage.created_at
            });

            // Confirm to sender
            socket.emit('message_sent', {
                id: chatMessage.id,
                message: message,
                created_at: chatMessage.created_at
            });

        } catch (error) {
            console.error('Socket send_message error:', error);
            socket.emit('error', { message: 'Failed to send message' });
        }
    });

    // Handle typing indicator
    socket.on('typing', (data) => {
        const { receiver_id, is_typing } = data;
        if (receiver_id && socket.userId) {
            socket.to(`user_${receiver_id}`).emit('user_typing', {
                user_id: socket.userId,
                user_name: socket.userName,
                is_typing: is_typing
            });
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 HuggingHeart server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 API URL: http://localhost:${PORT}/api`);
});

module.exports = { app, server, io };
