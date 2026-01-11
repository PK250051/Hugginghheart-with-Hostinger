# HuggingHeart Project Structure

## Directory Structure

```
HuggingHeart-main/
├── server.js                 # Main server entry point
├── package.json              # Node.js dependencies and scripts
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
│
├── database/
│   └── schema.sql            # MySQL database schema
│
├── config/
│   └── database.js           # MySQL connection pool configuration
│
├── middleware/
│   ├── auth.js               # JWT authentication middleware
│   └── upload.js             # Multer file upload configuration
│
├── models/
│   ├── User.js               # User model (database operations)
│   ├── Post.js               # Post model
│   ├── Comment.js            # Comment model
│   ├── Like.js               # Like model
│   ├── ChatMessage.js        # Chat message model
│   └── Chatbot.js            # Chatbot response model
│
├── controllers/
│   ├── authController.js     # Authentication logic (register, login, profile)
│   ├── userController.js     # User profile management
│   ├── postController.js     # Post CRUD operations, likes, comments
│   └── chatbotController.js  # Chatbot profile and response handling
│
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── users.js              # User routes
│   ├── posts.js              # Post routes
│   └── chatbot.js            # Chatbot routes
│
├── uploads/                  # User uploaded files (images)
│   └── .gitkeep
│
├── assets/                   # Frontend static assets
│   ├── css/
│   ├── js/
│   └── images/
│
├── *.html                    # Frontend HTML files
│
└── Documentation/
    ├── API_DOCUMENTATION.md  # Complete API documentation
    ├── DEPLOYMENT.md         # Hostinger deployment guide
    └── PROJECT_STRUCTURE.md  # This file
```

## Architecture Overview

### MVC (Model-View-Controller) Pattern

**Models** (`models/`):
- Handle all database operations
- Use MySQL connection pool
- Provide clean API for data access
- No business logic (that's in controllers)

**Controllers** (`controllers/`):
- Handle HTTP request/response
- Validate input data
- Call models for database operations
- Return JSON responses

**Routes** (`routes/`):
- Define API endpoints
- Apply middleware (authentication, uploads)
- Connect URLs to controllers

**Middleware** (`middleware/`):
- `auth.js`: JWT token verification
- `upload.js`: File upload handling (multer)

**Config** (`config/`):
- Database connection pool
- Environment configuration

## Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MySQL2**: MySQL database driver (with connection pooling)
- **Socket.io**: Real-time WebSocket communication
- **JWT (jsonwebtoken)**: Authentication tokens
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **Morgan**: HTTP request logging

### Database
- **MySQL 5.7+** or **MariaDB 10.3+**
- Tables: users, posts, comments, likes, chat_messages, chatbot_responses, chatbot_profiles

### Frontend (Existing)
- Static HTML/CSS/JavaScript
- Needs to be updated to call backend APIs

## API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (protected)

### Users
- `GET /api/users/:id` - Get public user profile
- `PUT /api/users/profile` - Update user profile (protected)

### Posts
- `POST /api/posts` - Create post (protected)
- `GET /api/posts/feed` - Get feed (protected)
- `GET /api/posts/:id` - Get post by ID (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `POST /api/posts/:id/like` - Like/unlike post (protected)
- `GET /api/posts/:id/comments` - Get comments (protected)
- `POST /api/posts/:id/comments` - Add comment (protected)
- `DELETE /api/posts/comments/:commentId` - Delete comment (protected)

### Chatbot
- `GET /api/chatbot/profiles` - Get all chatbot profiles
- `GET /api/chatbot/profiles/:id` - Get chatbot profile by ID
- `POST /api/chatbot/response` - Get chatbot response

## Real-time Features (Socket.io)

### Events
- `send_message` - Send chat message
- `receive_message` - Receive chat message
- `typing` - Typing indicator
- `user_typing` - Receive typing status
- `message_sent` - Message sent confirmation

## Environment Variables

Required environment variables (see `.env.example`):

```
PORT=3000
NODE_ENV=production
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=huggingheart
DB_PORT=3306
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
FRONTEND_URL=https://yourdomain.com
```

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: bcryptjs with salt rounds
3. **SQL Injection Protection**: Prepared statements via MySQL2
4. **File Upload Validation**: File type and size restrictions
5. **CORS Configuration**: Configurable CORS settings
6. **Input Validation**: Request body validation in controllers

## Database Schema

### Core Tables
- `users` - User accounts
- `posts` - User posts
- `comments` - Post comments
- `likes` - Post likes
- `chat_messages` - Real-time chat messages

### Chatbot Tables
- `chatbot_profiles` - Chatbot observer profiles (G001-G010)
- `chatbot_responses` - Chatbot response database (replaces CSV)

## Development Workflow

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Up Environment:**
   - Copy `.env.example` to `.env`
   - Update database credentials
   - Set JWT secret

3. **Set Up Database:**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

4. **Run Development Server:**
   ```bash
   npm run dev  # Uses nodemon for auto-reload
   # or
   npm start    # Standard start
   ```

5. **Test API:**
   - Health check: `http://localhost:3000/api/health`
   - Use Postman or similar tool to test endpoints

## Production Deployment

See `DEPLOYMENT.md` for detailed Hostinger deployment instructions.

## Next Steps for Frontend Integration

1. Update frontend JavaScript to call backend APIs
2. Implement JWT token storage (localStorage/sessionStorage)
3. Update authentication forms to use API
4. Update feed to fetch from API
5. Integrate Socket.io client for real-time chat
6. Update chatbot integration to use API

## File Naming Conventions

- **Models**: PascalCase (e.g., `User.js`)
- **Controllers**: camelCase with "Controller" suffix (e.g., `authController.js`)
- **Routes**: lowercase (e.g., `auth.js`)
- **Middleware**: lowercase (e.g., `auth.js`)
- **Config**: lowercase (e.g., `database.js`)

## Code Style

- Use async/await for asynchronous operations
- Use try-catch for error handling
- Return consistent JSON responses: `{ success: boolean, message: string, data?: any }`
- Use prepared statements for all database queries
- Validate input in controllers
- Keep models focused on database operations only

## Dependencies Explained

- **express**: Web framework for Node.js
- **mysql2**: MySQL client with promise support and connection pooling
- **jsonwebtoken**: JWT token generation and verification
- **bcryptjs**: Password hashing (bcrypt implementation in JavaScript)
- **socket.io**: Real-time bidirectional event-based communication
- **multer**: Multipart/form-data handling for file uploads
- **cors**: Express middleware for enabling CORS
- **dotenv**: Loads environment variables from .env file
- **morgan**: HTTP request logger middleware
- **nodemon** (dev): Automatically restarts Node.js application on file changes

---

**Last Updated:** January 2025
