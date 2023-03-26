import express from 'express';
import mongoose from 'mongoose';
import {
  userRoutes,
  conversationRoutes,
  messageRoutes,
} from './routes/index.js';
const app = express();
app.use(express.json());

app.use('/user', userRoutes);

app.use('/conversation', conversationRoutes);
app.use('/messages', messageRoutes);

await mongoose
  .connect('mongodb://localhost:27017/chat')
  .then(() => console.log('connected with database'));

app.listen(5000);
