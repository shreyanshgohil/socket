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
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
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

  //for join the room of video calling
  socket.on('start-call', (startCallBody) => {
    const { socketId } = startCallBody;
    io.to(socketId).emit('add-call', { startCallBody });
  });

  // for got out from the video call
  socket.on('end-call', (startCallBody) => {
    const { callerEmail, userName, socketId } = startCallBody;
    io.to(socketId).emit('reject-call', {});
  });

  // For acept the call
  socket.on('call-acepted', ({ ans, logedInUser, callerUserData }) => {
    io.to(callerUserData.callerSocketId).emit('call-acepted', { ans });
  });

  socket.on('peer:nego:needed', ({ offer, socketId, callerSocketId }) => {
    io.to(socketId).emit('peer:nego:needed', { offer, callerSocketId });
  });

  socket.on('peer:nego:done', ({ ans, callerSocketId }) => {
    io.to(callerSocketId).emit('peer:nego:final', { ans });
  });
  // For remove an user
  socket.on('disconnect', async () => {
    await User.updateOne({ socketId: socket.id }, { $set: { socketId: null } });
  });
});

app.use('/user', userRoutes);
app.use('/conversation', conversationRoutes);
app.use('/messages', messageRoutes);
app.use(express.static('build'));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

await mongoose
  .connect('mongodb+srv://admin:admin@cluster0.q09m7zs.mongodb.net/test')
  .then(() => console.log('connected with database'));

server.listen(5000);
