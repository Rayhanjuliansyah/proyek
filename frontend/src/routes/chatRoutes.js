import { Router } from 'express';
import { ChatStore } from '../models/Chat.js';

export const chatRouter = Router();

// Start or get existing chat
chatRouter.post('/start', (req, res) => {
  const { ustadId, userId } = req.body;
  
  // Check for existing chat
  let chat = ChatStore.findByUsers(ustadId, userId);
  
  // Create new chat if none exists
  if (!chat) {
    chat = ChatStore.create({ ustadId, userId });
  }
  
  res.json(chat);
});

// Send message
chatRouter.post('/:chatId/messages', (req, res) => {
  const chat = ChatStore.addMessage(req.params.chatId, {
    content: req.body.content,
    senderId: req.body.senderId
  });
  
  if (!chat) {
    return res.status(404).json({ message: 'Chat not found' });
  }
  
  res.json(chat);
});

// Get chat messages
chatRouter.get('/:chatId/messages', (req, res) => {
  const messages = ChatStore.getMessages(req.params.chatId);
  res.json(messages);
});