import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'
import employeeRoutes from "./routes/employee.js";
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB Error:', err));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', authMiddleware, employeeRoutes)

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));