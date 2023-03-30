import User from '../models/User.js';
import {
  gerateHasedPassword,
  compareDbAndHasedPasswoed,
} from '../libs/password.js';

// For get single and multiple users
export const getUsers = async (req, res) => {
  try {
    const { id: userDetail } = req.params;
    const userDetailRegex = new RegExp(userDetail, 'ig');
    const users = await User.find({
      $or: [{ userName: userDetailRegex }, { email: userDetailRegex }],
    });
    res.status(200).json({ message: 'List of users', data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'somethig went wrong' });
  }
};

// For add one and more users
export const addUser = async (req, res) => {
  try {
    const userData = req.body;
    userData.password = await gerateHasedPassword(req.body.password);
    await User.create(userData);
    // await user.save();
    res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'somethig went wrong' });
  }
};

// For update and perfom soft delete
export const updateUser = async (req, res) => {
  try {
    const { email, password = '', newDataOfUser } = req.body;
    const user = await User.findOne({ email });
    if ('email' in newDataOfUser) {
      return res.status(400).json('You can not update your email id');
    }
    if (!user) {
      return res.status(400).json('User not found');
    } else {
      if (!('password' in newDataOfUser)) {
        await User.updateOne({ email }, { $set: { ...newDataOfUser } });
      } else {
        newDataOfUser.password = await gerateHasedPassword(
          newDataOfUser.password
        );
        await User.updateOne({ email }, { $set: { ...newDataOfUser } });
      }
      return res.status(200).json('user updated sucessfully');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json('Something went wrong');
  }
};

// For Hard delete of the user
export const deleteUser = async (req, res) => {
  try {
    const { email, password = '' } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json('User not found');
    } else {
      const isValidAuthorization = await compareDbAndHasedPasswoed(
        user.password,
        password
      );
      if (isValidAuthorization) {
        await User.deleteOne({ email });
        res.status(200).json('user deleted sucessfully');
      } else {
        res.status(400).json('Please enter the correct password');
      }
    }
  } catch (err) {
    res.status(500).json('Something went wrong');
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'List of userssss', data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'somethig went wrong' });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email = '', password = '' } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'No user found', data: null });
    } else {
      const isAuthenticatedUser = await compareDbAndHasedPasswoed(
        user.password,
        password
      );

      if (isAuthenticatedUser) {
        const selectedUser = await User.findOne({ email }, { password: false });
        res
          .status(200)
          .json({ message: 'Login done sucessfully', data: selectedUser });
      } else {
        res
          .status(400)
          .json({ message: 'plese enter correct password', data: null });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'somethig went wrong', data: null });
  }
};
