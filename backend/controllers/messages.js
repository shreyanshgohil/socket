import Message from '../models/Message.js';
import { Router } from 'express';
const messageRoutes = Router();

//create the message
export const createNewMessage = async (req, res) => {
  try {
    const { conversationId, senderId, userMessage } = req.body;
    const newMessage = new Message({
      conversationId,
      senderId,
      userMessage,
    });
    await newMessage.save();
    res.status(200).json('New Message created sucessfully');
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong');
  }
};

// Get and all messages of conversation

export const getAllMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({
      conversationId,
    });
    res.status(200).json({ message: 'Messages find successfully', messages });
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong');
  }
};

export default messageRoutes;
