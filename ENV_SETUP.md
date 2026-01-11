# Environment Variables Setup Guide

## Create .env File

Create a `.env` file in the root directory (`HuggingHeart-main/.env`) with the following content:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=huggingheart
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## Environment Variables Explained

### Server Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Port number for the server | `3000` | No |
| `NODE_ENV` | Environment mode (`development` or `production`) | `development` | No |

### Database Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DB_HOST` | MySQL database host | `localhost` | Yes |
| `DB_USER` | MySQL database username | - | Yes |
| `DB_PASSWORD` | MySQL database password | - | Yes |
| `DB_NAME` | MySQL database name | `huggingheart` | Yes |
| `DB_PORT` | MySQL database port | `3306` | No |

**Example for Hostinger:**
```env
DB_HOST=localhost
DB_USER=u123456789_dbuser
DB_PASSWORD=your_secure_password
DB_NAME=u123456789_huggingheart
DB_PORT=3306
```

### JWT Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | Secret key for JWT token signing | - | Yes |
| `JWT_EXPIRE` | JWT token expiration time | `7d` | No |

**Generate a strong JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Important:** Use a strong, random secret in production (minimum 32 characters).

### File Upload Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `UPLOAD_DIR` | Directory for uploaded files | `./uploads` | No |
| `MAX_FILE_SIZE` | Maximum file size in bytes (5MB = 5242880) | `5242880` | No |

**File Size Examples:**
- 1MB = 1048576 bytes
- 5MB = 5242880 bytes
- 10MB = 10485760 bytes

### CORS Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FRONTEND_URL` | Frontend URL for CORS (use `*` for all origins) | `http://localhost:3000` | No |

**Production Example:**
```env
FRONTEND_URL=https://yourdomain.com
```

## Local Development Setup

1. **Create `.env` file:**
   ```bash
   cd HuggingHeart-main
   # Create .env file with content above
   ```

2. **Update database credentials:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_local_mysql_password
   DB_NAME=huggingheart
   ```

3. **Generate JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Copy the output to `JWT_SECRET` in `.env`

4. **Set environment:**
   ```env
   NODE_ENV=development
   PORT=3000
   ```

## Production Setup (Hostinger)

1. **Create `.env` file on server** (via File Manager or SSH)

2. **Set production values:**
   ```env
   NODE_ENV=production
   PORT=3000  # Or port assigned by Hostinger
   
   DB_HOST=localhost  # Usually localhost on Hostinger
   DB_USER=your_hostinger_db_user
   DB_PASSWORD=your_hostinger_db_password
   DB_NAME=your_hostinger_db_name
   DB_PORT=3306
   
   JWT_SECRET=generate_strong_random_secret_here_minimum_32_chars
   JWT_EXPIRE=7d
   
   UPLOAD_DIR=./uploads
   MAX_FILE_SIZE=5242880
   
   FRONTEND_URL=https://yourdomain.com
   ```

3. **Important Production Settings:**
   - Set `NODE_ENV=production`
   - Use a strong, unique `JWT_SECRET` (generate with command above)
   - Update `FRONTEND_URL` to your actual domain
   - Verify database credentials from Hostinger control panel

## Security Notes

1. **Never commit `.env` to git** (already in `.gitignore`)
2. **Use strong passwords** for database
3. **Generate strong JWT secret** (32+ random characters)
4. **Use HTTPS in production** (set `FRONTEND_URL` to `https://`)
5. **Restrict CORS** in production (don't use `*`)
6. **Keep secrets secure** (don't share `.env` file)

## Verification

After creating `.env` file:

1. **Check if file exists:**
   ```bash
   ls -la .env
   ```

2. **Verify database connection:**
   ```bash
   npm start
   # Should see: ✅ Database connected successfully
   ```

3. **Test API:**
   ```bash
   curl http://localhost:3000/api/health
   ```

## Troubleshooting

### Database Connection Error
- Verify database credentials in `.env`
- Ensure MySQL is running
- Check database host and port
- Verify database exists

### JWT Secret Error
- Ensure `JWT_SECRET` is set in `.env`
- Use a strong secret (32+ characters)
- Don't use default or common values

### File Upload Error
- Ensure `uploads` directory exists
- Check `UPLOAD_DIR` path in `.env`
- Verify directory permissions

### Port Already in Use
- Change `PORT` in `.env` to different port
- Or stop the process using the port

---

**Last Updated:** January 2025
