import express from "express";
import dotenv from 'dotenv'
import connectDb from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import solutionRoutes from './routes/solutionRoutes.js'
import {v2 as cloudinary} from "cloudinary"
import { app,server } from "./socket/socket.js";
dotenv.config();
connectDb();

const PORT=process.env.PORT || 5000

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/solutions',solutionRoutes)

server.listen (PORT,()=>{
    console.log(`server started at ${PORT}`)
})