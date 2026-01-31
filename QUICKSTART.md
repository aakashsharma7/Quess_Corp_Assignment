# HRMS Lite - Quick Start Guide

## Prerequisites Check

Before running the application, ensure you have:
- ✅ Node.js 16+ installed
- ✅ Python 3.9+ installed
- ✅ PostgreSQL 12+ installed and running

## Step-by-Step Setup

### 1. Database Setup

Open PostgreSQL and create the database:

```sql
CREATE DATABASE hrms_lite;
```

Or use command line:
```bash
psql -U postgres
CREATE DATABASE hrms_lite;
\q
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd d:\Quess-Corp\backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Update .env file with your PostgreSQL credentials
# Edit the DATABASE_URL in .env file:
# DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/hrms_lite

# Run the backend server
python main.py
```

Backend will run on: http://localhost:8000
API Docs: http://localhost:8000/api/docs

### 3. Frontend Setup

Open a NEW terminal window:

```bash
# Navigate to frontend directory
cd d:\Quess-Corp\frontend

# Install dependencies (if not already done)
npm install

# Run the development server
npm run dev
```

Frontend will run on: http://localhost:5173

### 4. Access the Application

Open your browser and go to: http://localhost:5173

## Testing the Application

### Test Employee Management:
1. Go to "Employees" page
2. Fill in the form:
   - Employee ID: EMP001
   - Full Name: John Doe
   - Email: john@example.com
   - Department: IT
3. Click "Add Employee"
4. Verify employee appears in the list below

### Test Attendance Tracking:
1. Go to "Attendance" page
2. Select an employee from dropdown
3. Select date (today or past date)
4. Choose status (Present/Absent)
5. Click "Mark Attendance"
6. Verify attendance appears in records below

## Common Issues

### Database Connection Error
- Make sure PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Verify database credentials

### Port Already in Use
- Backend (8000): Stop any other process using port 8000
- Frontend (5173): Stop any other Vite dev server

### Module Not Found
- Backend: Make sure virtual environment is activated
- Frontend: Run `npm install` again

## Production Deployment

See README.md for detailed deployment instructions.

## Need Help?

Check the API documentation at http://localhost:8000/api/docs when backend is running.
