import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: [mongoose.Schema.ObjectId],
    },
  },
  { timestamps: true }
);
export default mongoose.model('Conversation', conversationSchema);
