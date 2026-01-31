# HRMS Lite - Deployment Guide

## Deployment Options

This guide covers deploying the HRMS Lite application to production.

## Option 1: Deploy to Render + Vercel (Recommended)

### Backend Deployment (Render)

1. **Create a Render account** at https://render.com

2. **Create a new PostgreSQL database**:
   - Go to "New" → "PostgreSQL"
   - Choose a name (e.g., hrms-lite-db)
   - Select free tier
   - Create database
   - Copy the "Internal Database URL"

3. **Create a new Web Service**:
   - Go to "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: hrms-lite-api
     - **Root Directory**: backend
     - **Environment**: Python 3
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   
4. **Add Environment Variables**:
   - `DATABASE_URL`: (paste the Internal Database URL from step 2)
   - `FRONTEND_URL`: (will add after frontend deployment)
   - `DEBUG`: False

5. **Deploy** and copy the service URL (e.g., https://hrms-lite-api.onrender.com)

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at https://vercel.com

2. **Update frontend configuration**:
   - Create `frontend/.env.production`:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

3. **Deploy to Vercel**:
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: frontend
     - **Build Command**: `npm run build`
     - **Output Directory**: dist
   
4. **Add Environment Variable**:
   - `VITE_API_URL`: Your Render backend URL

5. **Deploy** and copy the deployment URL

6. **Update Backend CORS**:
   - Go back to Render
   - Update `FRONTEND_URL` environment variable with your Vercel URL
   - Redeploy the backend

## Option 2: Deploy to Railway

### Full Stack Deployment

1. **Create a Railway account** at https://railway.app

2. **Create a new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Add PostgreSQL**:
   - Click "New"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically create DATABASE_URL

4. **Deploy Backend**:
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Configure:
     - **Root Directory**: backend
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Add environment variables:
     - `DATABASE_URL`: (auto-configured)
     - `FRONTEND_URL`: (will add later)

5. **Deploy Frontend**:
   - Add another service from the same repo
   - Configure:
     - **Root Directory**: frontend
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm run preview`
   - Add environment variable:
     - `VITE_API_URL`: Your backend Railway URL

6. **Update CORS**: Add frontend URL to backend's FRONTEND_URL

## Option 3: Traditional VPS Deployment

### Using DigitalOcean/AWS/Azure

1. **Setup Server**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install dependencies
   sudo apt install python3-pip python3-venv postgresql nginx nodejs npm -y
   ```

2. **Setup PostgreSQL**:
   ```bash
   sudo -u postgres psql
   CREATE DATABASE hrms_lite;
   CREATE USER hrms_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE hrms_lite TO hrms_user;
   \q
   ```

3. **Deploy Backend**:
   ```bash
   cd /var/www/hrms-lite/backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install gunicorn
   
   # Create systemd service
   sudo nano /etc/systemd/system/hrms-api.service
   ```
   
   Service file content:
   ```ini
   [Unit]
   Description=HRMS Lite API
   After=network.target
   
   [Service]
   User=www-data
   WorkingDirectory=/var/www/hrms-lite/backend
   Environment="PATH=/var/www/hrms-lite/backend/venv/bin"
   ExecStart=/var/www/hrms-lite/backend/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
   
   [Install]
   WantedBy=multi-user.target
   ```
   
   ```bash
   sudo systemctl start hrms-api
   sudo systemctl enable hrms-api
   ```

4. **Deploy Frontend**:
   ```bash
   cd /var/www/hrms-lite/frontend
   npm install
   npm run build
   ```

5. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Frontend
       location / {
           root /var/www/hrms-lite/frontend/dist;
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## Post-Deployment Checklist

- [ ] Database is accessible and tables are created
- [ ] Backend API is running and accessible
- [ ] Frontend is deployed and loads correctly
- [ ] CORS is configured properly
- [ ] Environment variables are set correctly
- [ ] API endpoints work (test with /api/docs)
- [ ] Can create employees
- [ ] Can mark attendance
- [ ] No console errors in browser
- [ ] Responsive design works on mobile

## Monitoring

### Backend Health Check
```bash
curl https://your-backend-url.com/api/health
```

### Database Connection
Check logs for database connection errors.

## Troubleshooting

### CORS Errors
- Ensure FRONTEND_URL in backend matches your frontend domain
- Check that CORS middleware is properly configured

### Database Connection Issues
- Verify DATABASE_URL format
- Check database is running and accessible
- Ensure firewall allows database connections

### 502 Bad Gateway
- Check backend service is running
- Verify port configuration
- Check backend logs for errors

## Security Considerations

1. **Environment Variables**: Never commit .env files
2. **Database**: Use strong passwords
3. **HTTPS**: Enable SSL certificates (Let's Encrypt)
4. **API Rate Limiting**: Consider adding rate limiting
5. **Input Validation**: Already implemented in backend

## Scaling

For production use, consider:
- Connection pooling (already configured in SQLAlchemy)
- Redis for caching
- Load balancer for multiple backend instances
- CDN for frontend static assets
- Database read replicas for heavy read operations

## Support

For deployment issues, check:
- Backend logs
- Frontend browser console
- Database logs
- Server logs (if using VPS)
