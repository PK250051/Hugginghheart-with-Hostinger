# HuggingHeart API Documentation

## Base URL
```
http://localhost:3000/api
```

Production: `https://yourdomain.com/api`

---

## Authentication

Most endpoints require JWT authentication. Include the token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

Or as a cookie: `token=<your_jwt_token>`

---

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar_url": null,
    "bio": null
  }
}
```

### Get Current User Profile
**GET** `/api/auth/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar_url": "http://localhost:3000/uploads/avatar-1234567890.jpg",
    "bio": "My bio text",
    "created_at": "2025-01-11T10:00:00.000Z"
  }
}
```

---

## User Endpoints

### Get User by ID (Public Profile)
**GET** `/api/users/:id`

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar_url": "http://localhost:3000/uploads/avatar-1234567890.jpg",
    "bio": "My bio text",
    "created_at": "2025-01-11T10:00:00.000Z"
  }
}
```

### Update User Profile
**PUT** `/api/users/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
- `name` (optional): string
- `bio` (optional): string
- `avatar` (optional): image file

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "name": "Updated Name",
    "email": "john@example.com",
    "avatar_url": "http://localhost:3000/uploads/avatar-1234567890.jpg",
    "bio": "Updated bio"
  }
}
```

---

## Post Endpoints

### Create Post
**POST** `/api/posts`

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
- `content`: string (required)
- `image` (optional): image file

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "id": 1,
    "user_id": 1,
    "content": "This is my first post!",
    "image_url": "http://localhost:3000/uploads/image-1234567890.jpg",
    "likes_count": 0,
    "comments_count": 0,
    "created_at": "2025-01-11T10:00:00.000Z",
    "author_name": "John Doe",
    "author_avatar": "http://localhost:3000/uploads/avatar-1234567890.jpg"
  }
}
```

### Get Feed (All Posts)
**GET** `/api/posts/feed?limit=50&offset=0`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `limit` (optional): number (default: 50)
- `offset` (optional): number (default: 0)

**Response:**
```json
{
  "success": true,
  "posts": [
    {
      "id": 1,
      "user_id": 1,
      "content": "This is my first post!",
      "image_url": null,
      "likes_count": 5,
      "comments_count": 2,
      "created_at": "2025-01-11T10:00:00.000Z",
      "author_name": "John Doe",
      "author_avatar": "http://localhost:3000/uploads/avatar-1234567890.jpg",
      "isLiked": true
    }
  ],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "count": 1
  }
}
```

### Get Post by ID
**GET** `/api/posts/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "post": {
    "id": 1,
    "user_id": 1,
    "content": "This is my first post!",
    "image_url": null,
    "likes_count": 5,
    "comments_count": 2,
    "created_at": "2025-01-11T10:00:00.000Z",
    "author_name": "John Doe",
    "author_avatar": "http://localhost:3000/uploads/avatar-1234567890.jpg",
    "isLiked": true
  }
}
```

### Update Post
**PUT** `/api/posts/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "Updated post content"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "post": {
    "id": 1,
    "content": "Updated post content",
    ...
  }
}
```

### Delete Post
**DELETE** `/api/posts/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

### Like/Unlike Post
**POST** `/api/posts/:id/like`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "liked": true,
  "likesCount": 6
}
```

### Get Comments for Post
**GET** `/api/posts/:id/comments?limit=50&offset=0`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `limit` (optional): number (default: 50)
- `offset` (optional): number (default: 0)

**Response:**
```json
{
  "success": true,
  "comments": [
    {
      "id": 1,
      "post_id": 1,
      "user_id": 2,
      "content": "Great post!",
      "created_at": "2025-01-11T10:05:00.000Z",
      "author_name": "Jane Doe",
      "author_avatar": "http://localhost:3000/uploads/avatar-0987654321.jpg"
    }
  ],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "count": 1
  }
}
```

### Add Comment to Post
**POST** `/api/posts/:id/comments`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "This is a comment"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Comment added successfully",
  "comment": {
    "id": 1,
    "post_id": 1,
    "user_id": 1,
    "content": "This is a comment",
    "created_at": "2025-01-11T10:05:00.000Z",
    "author_name": "John Doe",
    "author_avatar": "http://localhost:3000/uploads/avatar-1234567890.jpg"
  }
}
```

### Delete Comment
**DELETE** `/api/posts/comments/:commentId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

---

## Chatbot Endpoints

### Get All Chatbot Profiles
**GET** `/api/chatbot/profiles`

**Response:**
```json
{
  "success": true,
  "profiles": [
    {
      "id": "G001",
      "name": "Luna Sharma",
      "age": 24,
      "location": "Mumbai",
      "role": "Software Engineer",
      "personality_type": "Bold Strategist",
      "avatar_url": "/assets/images/girls/G001_luna.jpg",
      "bio": "Tech enthusiast with a love for deep logic and late-night philosophy.",
      "is_active": true
    }
  ]
}
```

### Get Chatbot Profile by ID
**GET** `/api/chatbot/profiles/:id`

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "G001",
    "name": "Luna Sharma",
    "age": 24,
    "location": "Mumbai",
    "role": "Software Engineer",
    "personality_type": "Bold Strategist",
    "avatar_url": "/assets/images/girls/G001_luna.jpg",
    "bio": "Tech enthusiast with a love for deep logic and late-night philosophy.",
    "is_active": true
  }
}
```

### Get Chatbot Response
**POST** `/api/chatbot/response`

**Request Body:**
```json
{
  "message": "how are you",
  "profile_id": "G001"
}
```

**Response:**
```json
{
  "success": true,
  "response": "I'm doing great, thank you for asking! How about you? How can I help you today?",
  "profile_id": "G001"
}
```

**Note:** `profile_id` is optional. If provided, the response will be personalized for that chatbot profile.

---

## Socket.io Real-time Chat

### Connection
Connect to Socket.io server using the JWT token:

```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your_jwt_token'
  }
});
```

### Events

#### Send Message
```javascript
socket.emit('send_message', {
  receiver_id: 2,
  message: 'Hello!'
});
```

#### Receive Message
```javascript
socket.on('receive_message', (data) => {
  console.log('Message received:', data);
  // {
  //   id: 1,
  //   sender_id: 2,
  //   sender_name: "Jane Doe",
  //   receiver_id: 1,
  //   message: "Hello!",
  //   created_at: "2025-01-11T10:00:00.000Z"
  // }
});
```

#### Message Sent Confirmation
```javascript
socket.on('message_sent', (data) => {
  console.log('Message sent:', data);
});
```

#### Typing Indicator
```javascript
// Send typing status
socket.emit('typing', {
  receiver_id: 2,
  is_typing: true
});

// Receive typing status
socket.on('user_typing', (data) => {
  console.log('User typing:', data);
  // {
  //   user_id: 2,
  //   user_name: "Jane Doe",
  //   is_typing: true
  // }
});
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production use.

---

## Security Notes

1. Always use HTTPS in production
2. Store JWT secrets securely
3. Validate and sanitize all user inputs
4. Use prepared statements (already implemented via MySQL2)
5. Implement rate limiting for production
6. Add CORS restrictions in production
7. Regularly update dependencies

---

## Database Schema

See `database/schema.sql` for complete database schema.

---

## Support

For issues or questions, refer to the project repository or contact the development team.
