import mongoose from "mongoose";
import AuthRoles from "../util/authRoje";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto"
import config from "../config/index";

const userSchema = mongoose.Schema(
    {
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

    },

    {
        timestamps: true
    }

);

// challenge 1 - encrypt password - hooks
userSchema.pre("save", async function (next) {
    if (!this.modified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    nexr()
})

// add more features directly to your schema

userSchema.methods = {
    // compare password
    comparePassword: async function (enterdPassword) {
        return await bcrypt.compare(enterdPassword, this.password)
    },

    // generate JWt TOKEN 
    getJwtToken: function () {
        return JWT.sign(
            {
                _id: this._id,
                role: this.role
            },
            config.JWT_SECTET,
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
    }
}



export default mongoose.model("User", userSchema)
