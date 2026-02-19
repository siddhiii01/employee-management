import express from 'express';
import { Employee } from "../models/Employee.js";
import authRoutes from "../routes/auth.js";
import multer from 'multer';
import path from 'path';

const router = express.Router();

//Multer Setup -> used for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
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
router.post('/', upload.single('photo'), async(req, res) => {
    try{
        const employeeData = req.body;
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
router.get('/', async(req, res) => {
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

        const employees = await Employee.find(query);
        res.json(employees)


    }catch(e){
        res.status(500).json({ error: e.message });
    }
})

export default router;