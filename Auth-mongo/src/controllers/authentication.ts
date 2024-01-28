import { getUserByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';
import express from 'express';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Please write email and password' });
    }
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );
    if (!user) {
      return res.status(400).json({ message: 'No user fount' });
    }
    const expectedHash = authentication(user.authentication.salt, password);
    console.log(
      `Expected Hash ${expectedHash}, DB Hash: ${user.authentication.password}`
    );
    if (user.authentication.password != expectedHash) {
      return res.status(400).json({ message: 'Invalid User' });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie('SARIM-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      res.status(400).send('Missing required fields');
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).send('User already exists');
    }

    const salt = random();
    const newUser = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(newUser).end();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
