import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const exists = await User.findOne({ email: "admin@idms.com" });
if (exists) {
    console.log("Admin already exists");
} else {
    await User.create({ email: "admin@idms.com", password: "admin123" });
    console.log("Admin created — email: admin@idms.com / password: admin123");
}

process.exit();