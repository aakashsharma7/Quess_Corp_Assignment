# HRMS Lite - Human Resource Management System

A modern, lightweight Human Resource Management System built with React, FastAPI, and PostgreSQL.

## 🚀 Features

- **Employee Management**: Add, view, and delete employee records
- **Attendance Tracking**: Mark and track daily attendance for employees
- **Modern UI/UX**: Beautiful, responsive design with micro-animations
- **Real-time Validation**: Client and server-side validation
- **RESTful API**: Clean, well-documented API endpoints

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- Framer Motion (animations)
- React Hot Toast (notifications)

### Backend
- Python 3.9+
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic (validation)

## 📋 Prerequisites

- Node.js 16+ and npm
- Python 3.9+
- PostgreSQL 12+

## 🔧 Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Quess-Corp
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE hrms_lite;
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# Edit .env and update DATABASE_URL with your PostgreSQL credentials
# DATABASE_URL=postgresql://username:password@localhost:5432/hrms_lite

# Run the server
python main.py
```

The backend API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/api/docs`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
Quess-Corp/
├── backend/
│   ├── routes/
│   │   ├── employees.py
│   │   └── attendance.py
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔌 API Endpoints

### Employees
- `POST /api/employees` - Create new employee
- `GET /api/employees` - Get all employees
- `DELETE /api/employees/{employee_id}` - Delete employee

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/{employee_id}` - Get attendance for specific employee

## 🎨 UI Features

- Glassmorphism design
- Gradient backgrounds
- Smooth micro-animations
- Responsive layout
- Loading states
- Empty states
- Error handling with toast notifications

## 🚀 Building for Production

### Backend

```bash
cd backend
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend

```bash
cd frontend
npm run build
```

The build output will be in the `dist/` directory.

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://username:password@localhost:5432/hrms_lite
APP_NAME=HRMS Lite
DEBUG=True
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for Quess Corp

## 🙏 Acknowledgments

- FastAPI for the amazing Python web framework
- React team for the powerful UI library
- Framer Motion for smooth animations
