import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import User from './models/User.js';
import {
  conversationRoutes,
  messageRoutes,
  userRoutes,
} from './routes/index.js';

const app = express();
// let users = [];
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
app.use(express.json());

io.on('connection', (socket) => {
  // For get and send message
  socket.on('message', ({ userId, reciverSocketId, message }) => {
    io.to(reciverSocketId).emit('getMessage', {
      userId,
      message,
    });
  });
  // for say someone logedIn
  socket.on('userLogedIn', ({ userData }) => {
    socket.broadcast.emit('loginDone');
  });

  // For remove an user
  socket.on('disconnect', async () => {
    await User.updateOne({ socketId: socket.id }, { $set: { socketId: null } });
  });
});

app.use('/user', userRoutes);
app.use('/conversation', conversationRoutes);
app.use('/messages', messageRoutes);

await mongoose
  .connect('mongodb://localhost:27017/chat')
  .then(() => console.log('connected with database'));

server.listen(5000);
