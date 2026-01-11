# HuggingHeart - Hostinger Deployment Guide

This guide will help you deploy the HuggingHeart Node.js application to Hostinger.

---

## Prerequisites

1. **Hostinger Account** with Node.js hosting plan
2. **MySQL Database** created in Hostinger control panel
3. **Git** installed on your local machine
4. **Node.js** 14+ installed locally (for testing)

---

## Step 1: Prepare Your Local Environment

### 1.1 Install Dependencies

```bash
cd HuggingHeart-main
npm install
```

### 1.2 Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your local settings (for testing):

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=your_local_db_user
DB_PASSWORD=your_local_db_password
DB_NAME=huggingheart
DB_PORT=3306

JWT_SECRET=your_local_jwt_secret_change_in_production
JWT_EXPIRE=7d

UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

FRONTEND_URL=http://localhost:3000
```

### 1.3 Set Up Database Locally

1. Create MySQL database:
```sql
CREATE DATABASE huggingheart CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Import schema:
```bash
mysql -u your_user -p huggingheart < database/schema.sql
```

Or via MySQL command line:
```sql
USE huggingheart;
SOURCE database/schema.sql;
```

### 1.4 Test Locally

```bash
npm start
# or for development with auto-reload
npm run dev
```

Test the API at: `http://localhost:3000/api/health`

---

## Step 2: Prepare for Production

### 2.1 Update Environment Variables for Production

Create a production `.env` file (DO NOT commit this to git):

```env
PORT=3000
NODE_ENV=production

DB_HOST=your_hostinger_db_host
DB_USER=your_hostinger_db_user
DB_PASSWORD=your_hostinger_db_password
DB_NAME=your_hostinger_db_name
DB_PORT=3306

JWT_SECRET=generate_a_very_strong_random_secret_here_minimum_32_characters
JWT_EXPIRE=7d

UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

FRONTEND_URL=https://yourdomain.com
```

**Generate a strong JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.2 Optimize for Production

- Set `NODE_ENV=production`
- Use a strong, unique `JWT_SECRET`
- Update `FRONTEND_URL` to your actual domain
- Ensure database credentials are correct

---

## Step 3: Deploy to Hostinger

### 3.1 Access Hostinger Control Panel

1. Log in to your Hostinger account
2. Go to **hPanel** (Hosting Control Panel)
3. Select your hosting plan

### 3.2 Create MySQL Database

1. Go to **Databases** → **MySQL Databases**
2. Create a new database (e.g., `u123456789_huggingheart`)
3. Create a database user and assign it to the database
4. Note down:
   - Database name
   - Database user
   - Database password
   - Database host (usually `localhost`)

### 3.3 Upload Database Schema

**Option A: Via phpMyAdmin**
1. Go to **Databases** → **phpMyAdmin**
2. Select your database
3. Click **Import**
4. Choose `database/schema.sql`
5. Click **Go**

**Option B: Via MySQL Command Line (if you have SSH access)**
```bash
mysql -u your_db_user -p your_db_name < database/schema.sql
```

### 3.4 Upload Application Files

**Option A: Via File Manager**
1. Go to **Files** → **File Manager**
2. Navigate to your domain's root directory (usually `public_html` or a subdomain folder)
3. Upload all files from `HuggingHeart-main` folder
4. Ensure `.env` file is uploaded (create it manually if needed)

**Option B: Via Git (Recommended if SSH/Git access is available)**
1. Initialize git in your local project:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Push to Hostinger (if Git repository is set up):
```bash
git remote add hostinger your_hostinger_git_url
git push hostinger main
```

**Option C: Via FTP/SFTP**
- Use FileZilla or similar FTP client
- Connect to Hostinger FTP server
- Upload all files to the appropriate directory

### 3.5 Configure Node.js Application

1. In Hostinger hPanel, go to **Advanced** → **Node.js**
2. Create a new Node.js application:
   - **Node.js version**: Select 14.x or higher (16.x recommended)
   - **Application mode**: Production
   - **Application root**: `/public_html` (or your subdomain folder)
   - **Application startup file**: `server.js`
   - **Application URL**: Your domain/subdomain

3. Set Environment Variables:
   - In Node.js app settings, add environment variables:
     - `NODE_ENV=production`
     - `DB_HOST=localhost` (or Hostinger's DB host)
     - `DB_USER=your_db_user`
     - `DB_PASSWORD=your_db_password`
     - `DB_NAME=your_db_name`
     - `DB_PORT=3306`
     - `JWT_SECRET=your_production_jwt_secret`
     - `JWT_EXPIRE=7d`
     - `PORT=3000` (or the port Hostinger assigns)
     - `UPLOAD_DIR=./uploads`
     - `MAX_FILE_SIZE=5242880`
     - `FRONTEND_URL=https://yourdomain.com`

**Note:** Hostinger may use environment variables differently. Check their documentation for the correct format.

### 3.6 Install Dependencies

**Via SSH (if available):**
```bash
cd /home/u123456789/public_html
npm install --production
```

**Via Hostinger Node.js Panel:**
- Some Hostinger plans auto-install dependencies
- Check if there's a "Install Dependencies" button

### 3.7 Create Uploads Directory

Ensure the `uploads` directory exists and has write permissions:

```bash
mkdir -p uploads
chmod 755 uploads
```

Or via File Manager:
- Create `uploads` folder
- Set permissions to `755` or `777` (755 is recommended)

### 3.8 Start/Restart Application

In Hostinger Node.js panel:
1. Click **Restart** or **Start** application
2. Wait for the application to start
3. Check logs for any errors

---

## Step 4: Configure Domain & SSL

### 4.1 Point Domain to Node.js App

- If using a subdomain: Create subdomain in Hostinger and point to Node.js app
- If using main domain: Configure domain settings in Hostinger

### 4.2 Enable SSL Certificate

1. Go to **SSL** in hPanel
2. Install free SSL certificate (Let's Encrypt)
3. Force HTTPS redirect if needed

---

## Step 5: Update Frontend URLs

Update your frontend HTML/JavaScript files to use the production API URL:

```javascript
// In your frontend JavaScript files
const API_BASE_URL = 'https://yourdomain.com/api';
const SOCKET_URL = 'https://yourdomain.com';
```

---

## Step 6: Test Production Deployment

1. **Health Check:**
   ```
   https://yourdomain.com/api/health
   ```

2. **Test API Endpoints:**
   - Register: `POST /api/auth/register`
   - Login: `POST /api/auth/login`
   - Get Feed: `GET /api/posts/feed`

3. **Test Socket.io:**
   - Connect to Socket.io server
   - Send/receive messages

4. **Test File Uploads:**
   - Upload avatar image
   - Upload post image

---

## Step 7: Production Optimizations

### 7.1 Enable Process Manager (PM2) - If Available

If Hostinger supports PM2 or similar:

```bash
pm2 start server.js --name huggingheart
pm2 save
pm2 startup
```

### 7.2 Set Up Logging

- Check Hostinger logs regularly
- Set up error tracking (e.g., Sentry) if needed

### 7.3 Backup Database

- Set up regular database backups via Hostinger
- Export database regularly

### 7.4 Monitor Performance

- Monitor Node.js application performance
- Check database query performance
- Monitor file upload directory size

---

## Troubleshooting

### Application Won't Start

1. **Check Logs:**
   - View application logs in Hostinger Node.js panel
   - Check for error messages

2. **Verify Environment Variables:**
   - Ensure all required env vars are set
   - Check database credentials

3. **Check Dependencies:**
   - Ensure `node_modules` is installed
   - Check `package.json` for correct dependencies

4. **Verify Database Connection:**
   - Test database connection from application
   - Check database host, user, password

### Database Connection Errors

1. **Verify Credentials:**
   - Double-check database user, password, host
   - Ensure database exists

2. **Check Host:**
   - Hostinger may use `localhost` or a different host
   - Check Hostinger database settings

3. **Check Port:**
   - Usually `3306` for MySQL
   - Verify in Hostinger database settings

### File Upload Issues

1. **Check Permissions:**
   - Ensure `uploads` directory has write permissions (755 or 777)

2. **Check Disk Space:**
   - Ensure sufficient disk space on server

3. **Check File Size Limits:**
   - Verify `MAX_FILE_SIZE` in `.env`
   - Check Hostinger upload limits

### Socket.io Not Working

1. **Check CORS Settings:**
   - Verify `FRONTEND_URL` in environment variables
   - Check Socket.io CORS configuration

2. **Check WebSocket Support:**
   - Ensure Hostinger supports WebSockets
   - Some shared hosting may not support WebSockets

3. **Check Port:**
   - Socket.io may need specific port configuration
   - Check Hostinger Node.js port settings

---

## Hostinger-Specific Notes

1. **Shared Hosting Limitations:**
   - Some shared hosting plans may have limitations on Node.js
   - Check your plan's Node.js support

2. **Port Configuration:**
   - Hostinger may assign a specific port
   - Use the port from Hostinger Node.js panel

3. **Process Management:**
   - Some plans may auto-restart applications
   - Check Hostinger documentation for process management

4. **Environment Variables:**
   - Hostinger may require environment variables to be set in their panel
   - Check their Node.js documentation

---

## Security Checklist

- [ ] Strong JWT secret (32+ characters, random)
- [ ] HTTPS enabled
- [ ] Database credentials secure
- [ ] `.env` file not in version control
- [ ] File upload directory permissions correct (755)
- [ ] CORS configured for production domain only
- [ ] Input validation implemented
- [ ] SQL injection protection (prepared statements)
- [ ] Error messages don't expose sensitive info

---

## Support

- **Hostinger Support:** Check Hostinger documentation and support
- **Node.js Docs:** https://nodejs.org/docs
- **Express Docs:** https://expressjs.com/
- **MySQL Docs:** https://dev.mysql.com/doc/

---

## Post-Deployment Maintenance

1. **Regular Updates:**
   - Update npm packages regularly
   - Check for security vulnerabilities: `npm audit`

2. **Backup:**
   - Regular database backups
   - Backup uploaded files

3. **Monitoring:**
   - Monitor application logs
   - Monitor database performance
   - Monitor disk usage

4. **Updates:**
   - Keep Node.js version updated
   - Keep dependencies updated
   - Apply security patches promptly

---

## Additional Resources

- Hostinger Node.js Documentation
- Hostinger MySQL Documentation
- Hostinger File Manager Guide
- Hostinger SSL Certificate Guide

---

**Last Updated:** January 2025
