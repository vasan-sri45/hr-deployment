import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import authRouter from './router/authRoutes.js';
import adminRouter from './router/adminRoutes.js';
import employeeRouter from './router/employeeRoutes.js';
import tableRouter from './router/tableRoutes.js';
import attendenceRouter from './router/attendenceRoutes.js';
import messageRouter from './router/messageRoutes.js';
import personalRouter from './router/PersonalRoutes.js';
import ticketRouter from './router/ticketRoutes.js';
import folderRouter from './router/folderRoutes.js';
    
dotenv.config();
const app = express();
const Port = process.env.PORT || 4500;

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));

// app.options('*', cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));
// app.use(express.static(__dirname,'/uploads'));

app.use('/api/auth',authRouter);
app.use('/api/data',adminRouter);
app.use('/api/employee',employeeRouter);
app.use('/api/table',tableRouter);
app.use('/api/attendance',attendenceRouter);
app.use('/api/message',messageRouter);
app.use('/api/personal',personalRouter);
app.use('/api/support', ticketRouter);
app.use('/api/folder', folderRouter);

app.set('trust proxy', 1);

app.listen(Port,()=>{
    console.log(`server is running : ${Port}`);
    connectDB();
});