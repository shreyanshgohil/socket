import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import {
  conversationRoutes,
  messageRoutes,
  userRoutes,
} from './routes/index.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
app.use(express.json());

io.on('connection', (socket) => {
  console.log('connnected to user name space', socket.id);
});

app.use('/user', userRoutes);

app.use('/conversation', conversationRoutes);
app.use('/messages', messageRoutes);

await mongoose
  .connect('mongodb://localhost:27017/chat')
  .then(() => console.log('connected with database'));

server.listen(5000);
