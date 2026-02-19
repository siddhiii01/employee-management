import express from 'express';
import { Employee } from "../models/Employee.js";
import {authMiddleware} from '../middleware/auth.js'
import multer from 'multer';
import path from "path";
import fs from "fs";
import { validate } from '../middleware/validate.js';
import { employeeSchema } from '../validations/schema.js';
const router = express.Router();

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

//Multer Setup -> used for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
        '-' +
        uniqueSuffix +
        path.extname(file.originalname)
    )
  }
});
const upload = multer({ storage: storage });

//Create Employee
router.post('/',authMiddleware, upload.single('photo'),validate(employeeSchema), async(req, res) => {
    try{
        const employeeData = { ...req.validatedData };
        console.log(employeeData)
        
        if(req.file) employeeData.photo = req.file.path;

        //Saving Employee Data to DB
        const employee = await Employee.create(employeeData)
        console.log(employee)
        res.status(201).json({message: 'Employee Record Saved', data: employee})
    } catch(e){
        console.error(e);
        res.status(400).json({ error: e.message });
    }
});


//Get all Employess with search and filter
router.get('/',authMiddleware, async(req, res) => {
    try{
        const {search, department, designation, gender} = req.query;
        let query = {}; //filter object

        if(search){
            query.$or = [
                {fullName: { $regex: search, $options: 'i'}},
                {email: {$regex: search, $options: 'i'}},
                {department: {$regex: search, $options: 'i'}}
            ];
        }

        if (department) query.department = department;
        if (designation) query.designation = designation;
        if (gender) query.gender = gender;

        const employees = await Employee.find(query).sort({ createdAt: -1 });
        res.json({ data: employees, total: employees.length });


    }catch(e){
        res.status(500).json({ error: e.message });
    }
})

export default router;