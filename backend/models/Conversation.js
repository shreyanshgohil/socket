import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
    {

    },
    { timestamps: true }
);
export default mongoose.model('Conversation', conversationSchema);
