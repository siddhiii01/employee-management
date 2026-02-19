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
userSchema.pre("save", async function() {
    if(!this.isModified("password")) return ; 
    //hashing the password -> user was new or pasword was newly set
    this.password = await bcrypt.hash(this.password, 10);
     
});

export const User = mongoose.model("User", userSchema);