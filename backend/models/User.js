import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


//Middleware that runs Before saving the data -> Hashing the password before saving the user in DB
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); 
    //hashing the password -> user was new or pasword was newly set
    this.password = await bcrypt.hash(this.password, 10);
    next(); 
});

export const User = mongoose.model("User", userSchema);