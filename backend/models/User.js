import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'User name must be required'],
      min: 3,
      max: 20,
      unique: [true, 'User name must be unique'],
    },
    phone: {
      type: Number,
      required: [true, 'Phone number must be required'],
      unique: [true, 'User name must be unique'],
    },
    email: {
      type: String,
      required: [true, 'Email id must be required'],
      max: 50,
      unique: [true, 'Email id must be unique'],
    },
    password: {
      type: String,
      required: true,

    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    aboutUser: {
      type: String,
      max: 50,
      default: 'Heyy I am using shreyansh +',
    },
    city: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    bookmarkPosts: [
      {
        type: Array,
        default: [],
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model('User', userSchema);
