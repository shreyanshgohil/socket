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
let users = [];
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
app.use(express.json());

// For add the user
const addUser = (userId, socketId) => {
  const isUserExist = users.some((singleUser) => singleUser._id === userId);
  if (!isUserExist) {
    users.push({ userId, socketId });
  }
};

// For remove the user
const removeUser = (socketId) => {
  users = users.filter((singleUser) => singleUser.socketId !== socketId);
};

// For find the user
const getUser = (userId) => {
  users.find((singleUser) => singleUser.userId === userId);
};

io.on('connection', (socket) => {
  // For add an user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  // For get and send message
  socket.on('message', ({ userId, reciverId, message }) => {
    // const user = getUser(reciverId);
    io.to(reciverId).emit('getMessage', {
      userId,
      message,
    });
  });

  // For remove an user
  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

app.use('/user', userRoutes);

app.use('/conversation', conversationRoutes);
app.use('/messages', messageRoutes);

await mongoose
  .connect('mongodb://localhost:27017/chat')
  .then(() => console.log('connected with database'));

server.listen(5000);
