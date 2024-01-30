import { deleteUser, getAllUser, updateUser } from '../controllers/users';
import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUser);
  router.delete('/user/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
