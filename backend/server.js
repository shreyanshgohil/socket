import express from 'express';
import mongoose from 'mongoose';
import { userRoutes } from './routes/index.js';
const app = express();
app.use(express.json());

app.use('/user', userRoutes);

await mongoose
  .connect('mongodb://localhost:27017/chat')
  .then(() => console.log('connected with database'));

app.listen(5000);
