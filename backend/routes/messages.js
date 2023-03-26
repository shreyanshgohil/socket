import { Router } from 'express';
import { createNewMessage, getAllMessages } from '../controllers/messages.js';
const messageRoutes = Router();

messageRoutes.post('/', createNewMessage);
messageRoutes.get('/:conversationId', getAllMessages);

export default messageRoutes;
