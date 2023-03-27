import { Router } from 'express';
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
  getAllUsers,
  loginUser,
} from '../controllers/user.js';
const userRoutes = Router();

userRoutes.get('/all', getAllUsers);

userRoutes.post('/login', loginUser);

userRoutes.get('/:id', getUsers);

userRoutes.post('/add-user', addUser);

userRoutes.patch('/update-user', updateUser);

userRoutes.delete('/delete-user', deleteUser);

export default userRoutes;
