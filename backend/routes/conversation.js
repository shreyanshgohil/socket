import { Router } from 'express';
import {
  createNewConversation,
  getConversation,
} from '../controllers/conversation.js';
const conversationRoutes = Router();

// new conversation
conversationRoutes.post('/', createNewConversation);

//get conversation of user
conversationRoutes.get('/:userId', getConversation);

export default conversationRoutes;
