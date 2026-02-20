# IDMS — Employee Management System
### MERN Stack Internship Assessment | IDMS Infotech Private Limited

---

##  Live Demo

**Frontend:** https://employee-management-lac-ten.vercel.app

**Test Credentials:**
```
Email:    admin@idms.com
Password: admin123
```

---

##  Features Implemented

###  Authentication Module
- Login page with responsive UI
- Email and password fields with validation
- Database-based authentication using MongoDB
- Redirects to dashboard after successful login
- Logout clears token and redirects to login

###  JWT Authentication (Mandatory)
- JWT token generated on successful login (`expiresIn: 24h`)
- Token stored in `localStorage`
- All employee routes protected with `authMiddleware`
- JWT secret stored in `.env` file
- Token expiry check on protected routes

###  Dashboard Layout
- Sticky header with IDMS logo and logout avatar
- Sub-header with page title
- Sidebar navigation with all menu items
- Main content area with search, create button, and employee table
- Pinned footer with total records count and pagination

###  Employee Creation
Modal form with the following fields:
- Full Name
- Date of Birth
- Email
- Phone Number
- Gender (Dropdown)
- Department (Dropdown)
- Designation (Dropdown)
- Employee Photo (File Upload → Cloudinary)

###  Validation
- Valid email format (Zod + react-hook-form)
- Phone number must be exactly 10 digits
- All required fields enforced
- Duplicate email shows clean error toast
- Backend validation via Zod schemas

### Data Display
- Employee records displayed in structured table
- Data fetched from MongoDB via REST API
- Photo displayed via clickable popup (no new tab)
- Action icon column

###  Search & Filter (Mandatory)
- Search by Name, Email, or Department
- Case-insensitive search using MongoDB `$regex`
- Filter by Department, Designation, Gender
- All filters work together via query parameters
- Debounced search (400ms) for performance

```
GET /api/employees?search=John&department=HR&designation=Manager
```

###  Image Upload — Cloudinary
- Employee photos uploaded directly to Cloudinary
- Persistent storage (not local disk)
- Photos viewable via popup on dashboard

###  Toast Notifications
- Success and error toasts for all actions
- Powered by `react-hot-toast`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT, bcryptjs |
| Validation | Zod (backend), react-hook-form (frontend) |
| Image Upload | Cloudinary + multer-storage-cloudinary |
| HTTP Client | Axios (with request interceptor) |
| Notifications | react-hot-toast |
| Deployment | Vercel (frontend), Render (backend) |

---

##  Folder Structure

```
employee-management/
├── backend/
│   ├── config/
│   │   └── cloudinary.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validate.js
│   ├── models/
│   │   ├── User.js
│   │   └── Employee.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── employee.js
│   ├── validations/
│   │   └── schema.js
│   ├── seed.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── Assets/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Sidebar.css
│   │   │   ├── EmployeeModal.jsx
│   │   │   └── EmployeeModal.css
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json
│   └── .env
```

---

##  Local Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

---

### 1. Clone the repository

```bash
git clone https://github.com/siddhiii01/employee-management.git
cd employee-management
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

Seed the admin user:

```bash
node seed.js
```

Start the backend server:

```bash
node server.js
```

Backend runs on: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

##  Admin Login

After running the seed file, use these credentials:

```
Email:    admin@idms.com
Password: admin123
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/employees` | Get all employees (search & filter) |
| POST | `/api/employees`  | Create new employee |

### Query Parameters for GET /api/employees
```
?search=John          → search by name, email, department
&department=HR        → filter by department
&designation=Manager  → filter by designation
&gender=Male          → filter by gender
```

---

## Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://employee-management-lac-ten.vercel.app |
| Backend | Render | https://idms-backend-b978.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |
| Images | Cloudinary | Cloud hosted |

---

## Notes

- The backend on Render may take **30-60 seconds** to wake up on first request (free tier cold start)
- All employee images are stored on Cloudinary and are permanently accessible
- Token expires in **24 hours** — user will be redirected to login automatically

---

*Submitted by: Siddhi | IDMS SDE Internship Assessment*
