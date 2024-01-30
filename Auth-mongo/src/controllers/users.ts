import express from 'express';
import { deleteUserById, getUser, getUserById } from '../db/users';

export const getAllUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUser();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    res.status(200).json({ message: 'User delete', user: deletedUser });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }
    const user = await getUserById(id);
    user.username = username;
    user.save();
    return res.status(200).json({ message: 'User updated', user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
