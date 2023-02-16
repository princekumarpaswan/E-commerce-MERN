import dotenv, { config } from "dotenv"

dotenv.config = {}

const config = {
    JWT_SECTET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
}

export default config