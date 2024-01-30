import express from 'express';
import { merge, get } from 'lodash';
import { updateUserById } from '../db/users';
import sharp from 'sharp';

export const uploadImage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = get(req, 'identity._id') as string;
    console.log(userId);
    if (!userId) return res.status(401).send('No user found');
    const profileBuffer = req.file.buffer;
    const { width, height } = await sharp(profileBuffer).metadata();
    const avatar = await sharp(profileBuffer)
      .resize(Math.round(width * 0.5), Math.round(height * 0.5))
      .toBuffer();
    const user = await updateUserById(userId, { avatar });
    user.save();

    res.send({ message: 'Image uploaded' });
  } catch (error) {
    res.sendStatus(400).send(error);
  }
};
