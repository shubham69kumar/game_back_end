import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoConnect = mongoose.connect(process.env.DB_CONNECTION);

export {mongoConnect, mongoose}