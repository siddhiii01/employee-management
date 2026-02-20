import { z } from "zod";

export const loginSchema = z.object({
    email:    z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
});

export const employeeSchema = z.object({
    fullName:    z.string().min(1, "Full name is required").trim(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    email:       z.string().email({ message: "Invalid email format" }),
    phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    gender:      z.enum(["Male", "Female", "Other"], { errorMap: () => ({ message: "Gender must be Male, Female or Other" }) }),
    department:  z.string().min(1, "Department is required"),
    designation: z.string().min(1, "Designation is required"),
});