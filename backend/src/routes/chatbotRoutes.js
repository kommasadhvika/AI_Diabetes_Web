import express from 'express';
import { getChatHistory, sendMessageToChatbot } from '../controllers/chatbotController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getChatHistory)
  .post(sendMessageToChatbot);

export default router;
