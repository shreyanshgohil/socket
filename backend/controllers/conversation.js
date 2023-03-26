import Conversation from '../models/Conversation.js';

// For create a new conversation
export const createNewConversation = async (req, res) => {
  try {
    const { senderId, reciverId } = req.body;
    const newConversation = new Conversation({
      members: [senderId, reciverId],
    });
    await newConversation.save();
    res.status(200).json('new conversation created sucessfully');
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong');
  }
};

// for get all our conversations
export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });

    res
      .status(200)
      .json({ message: 'Conversation finds sucessfully', conversations });
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong');
  }
};
