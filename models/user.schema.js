import mongoose from "mongoose";
import AuthRoles from "../util/authRoje";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name must be less the 50"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "password is required"],
        unique: true,
        maxLength: [8, "password must be at list 8 characters"],
        select: false
    },
    role: {
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,

})