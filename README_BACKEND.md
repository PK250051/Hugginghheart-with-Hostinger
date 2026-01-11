# HuggingHeart - Full-Stack Social Media Platform

A complete Node.js + MySQL + Socket.io social media platform converted from static HTML to a fully functional backend system.

## 🚀 Features

- **User Authentication**: JWT-based authentication (register, login, profile)
- **Social Feed**: Create, read, update, delete posts with images
- **Interactions**: Like posts, add comments
- **Real-time Chat**: Socket.io-powered real-time messaging
- **Chatbot System**: SQL-based chatbot responses (replaces CSV)
- **Profile System**: User profiles with avatar upload and bio
- **RESTful API**: Clean REST API architecture
- **MVC Structure**: Organized Model-View-Controller pattern
- **MySQL Database**: Robust database schema with relationships
- **File Uploads**: Image upload support with Multer
- **Security**: JWT authentication, password hashing, SQL injection protection

## 📋 Requirements

- Node.js 14.0.0 or higher
- MySQL 5.7+ or MariaDB 10.3+
- npm 6.0.0 or higher

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=huggingheart
DB_PORT=3306

JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

FRONTEND_URL=http://localhost:3000
```

**Important:** Generate a strong JWT secret for production:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Set Up Database

Create MySQL database and import schema:

```bash
mysql -u root -p
CREATE DATABASE huggingheart CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE huggingheart;
SOURCE database/schema.sql;
```

Or via command line:
```bash
mysql -u root -p huggingheart < database/schema.sql
```

### 4. Create Uploads Directory

```bash
mkdir uploads
```

### 5. Start Server

Development (with auto-reload):
```bash
npm run dev
```

Production:
```bash
npm start
```

Server will start on `http://localhost:3000`

### 6. Test API

Health check:
```bash
curl http://localhost:3000/api/health
```

## 📁 Project Structure

```
HuggingHeart-main/
├── server.js              # Main server entry point
├── package.json           # Dependencies
├── .env                   # Environment variables (create from .env.example)
│
├── database/
│   └── schema.sql         # MySQL database schema
│
├── config/
│   └── database.js        # Database connection pool
│
├── middleware/
│   ├── auth.js            # JWT authentication
│   └── upload.js          # File upload (Multer)
│
├── models/                # Database models (MVC)
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│   ├── Like.js
│   ├── ChatMessage.js
│   └── Chatbot.js
│
├── controllers/           # Business logic (MVC)
│   ├── authController.js
│   ├── userController.js
│   ├── postController.js
│   └── chatbotController.js
│
├── routes/                # API routes (MVC)
│   ├── auth.js
│   ├── users.js
│   ├── posts.js
│   └── chatbot.js
│
├── uploads/               # User uploaded files
│
└── assets/
    └── js/
        └── api.js         # Frontend API client helper
```

See `PROJECT_STRUCTURE.md` for detailed documentation.

## 📚 API Documentation

Complete API documentation is available in `API_DOCUMENTATION.md`.

### Key Endpoints

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

**Posts:**
- `POST /api/posts` - Create post
- `GET /api/posts/feed` - Get feed
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comments` - Add comment

**Chatbot:**
- `GET /api/chatbot/profiles` - Get chatbot profiles
- `POST /api/chatbot/response` - Get chatbot response

See `API_DOCUMENTATION.md` for complete endpoint documentation.

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in request headers:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are returned on register/login and should be stored client-side (e.g., localStorage).

## 💬 Real-time Chat (Socket.io)

Socket.io is configured for real-time chat. Connect using:

```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your_jwt_token'
  }
});
```

See `API_DOCUMENTATION.md` for Socket.io event documentation.

## 🤖 Chatbot System

The chatbot system stores responses in MySQL database (not CSV). Responses are searched using:

1. Full-text search on question text
2. Keyword matching
3. Profile-specific responses (if profile_id provided)

Add chatbot responses via SQL or API endpoint.

## 🗄️ Database

### Tables

- `users` - User accounts
- `posts` - User posts
- `comments` - Post comments
- `likes` - Post likes
- `chat_messages` - Real-time chat messages
- `chatbot_profiles` - Chatbot observer profiles (G001-G010)
- `chatbot_responses` - Chatbot response database

See `database/schema.sql` for complete schema.

## 🔒 Security Features

1. **JWT Authentication**: Secure token-based auth
2. **Password Hashing**: bcryptjs (10 salt rounds)
3. **SQL Injection Protection**: Prepared statements
4. **File Upload Validation**: Type and size restrictions
5. **CORS Configuration**: Configurable cross-origin requests
6. **Input Validation**: Request body validation

## 📦 Dependencies

### Production
- `express` - Web framework
- `mysql2` - MySQL driver with connection pooling
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `socket.io` - Real-time WebSocket communication
- `multer` - File upload handling
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `morgan` - HTTP request logging

### Development
- `nodemon` - Auto-reload on file changes

See `package.json` for complete list.

## 🌐 Frontend Integration

A frontend API client helper is provided in `assets/js/api.js`. Include it in your HTML:

```html
<script src="assets/js/api.js"></script>
```

Usage example:
```javascript
// Login
const response = await AuthAPI.login('user@example.com', 'password');

// Get feed
const feed = await PostAPI.getFeed();

// Create post
await PostAPI.createPost('My post content', imageFile);
```

See `assets/js/api.js` for complete API client documentation.

## 🚢 Deployment

See `DEPLOYMENT.md` for detailed Hostinger deployment instructions.

### Quick Deployment Checklist

1. ✅ Set up MySQL database on Hostinger
2. ✅ Import `database/schema.sql`
3. ✅ Upload application files
4. ✅ Set environment variables in Hostinger panel
5. ✅ Install dependencies (`npm install --production`)
6. ✅ Create `uploads` directory with write permissions
7. ✅ Start/restart Node.js application
8. ✅ Test API endpoints
9. ✅ Configure SSL certificate
10. ✅ Update frontend API URLs

## 🧪 Testing

Test the API using curl, Postman, or the provided frontend API client:

```bash
# Health check
curl http://localhost:3000/api/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## 🐛 Troubleshooting

### Database Connection Error
- Verify database credentials in `.env`
- Ensure MySQL is running
- Check database host and port

### JWT Token Error
- Ensure `JWT_SECRET` is set in `.env`
- Use a strong, random secret (32+ characters)

### File Upload Error
- Ensure `uploads` directory exists
- Check directory permissions (755 or 777)
- Verify `MAX_FILE_SIZE` setting

### Socket.io Not Working
- Check CORS settings
- Verify WebSocket support on hosting
- Check Socket.io client connection URL

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL user | - |
| `DB_PASSWORD` | MySQL password | - |
| `DB_NAME` | MySQL database name | `huggingheart` |
| `DB_PORT` | MySQL port | `3306` |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration | `7d` |
| `UPLOAD_DIR` | Upload directory | `./uploads` |
| `MAX_FILE_SIZE` | Max file size (bytes) | `5242880` (5MB) |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 🤝 Contributing

This is a converted project. To contribute:

1. Follow MVC architecture
2. Use async/await for async operations
3. Return consistent JSON responses
4. Validate all inputs
5. Use prepared statements for database queries
6. Add error handling

## 📄 License

[Add your license here]

## 📞 Support

For issues, questions, or support:
- Check `API_DOCUMENTATION.md` for API details
- Check `DEPLOYMENT.md` for deployment help
- Check `PROJECT_STRUCTURE.md` for code organization

## 🎯 Next Steps

1. **Frontend Integration**: Update HTML/JS files to use API
2. **Add More Features**: Notifications, search, etc.
3. **Optimize**: Add caching, rate limiting
4. **Monitor**: Add logging, error tracking
5. **Scale**: Optimize database queries, add indexes

---

**Built with:** Node.js, Express, MySQL, Socket.io

**Last Updated:** January 2025
