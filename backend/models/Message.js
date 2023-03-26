import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: [true, 'User name must be required'],
    },
    senderId: {
      type: String,
      required: [true, 'User name must be required'],
    },
    userMessage: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model('Message', messageSchema);
