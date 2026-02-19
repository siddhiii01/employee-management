import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other']
        },
        department: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true
        },
        photo: {
            type: String
        }
    }, { timestamps: true}
);

export const Employee = mongoose.model("Employee", employeeSchema);