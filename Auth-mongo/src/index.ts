import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import {
  createUser,
  deleteUserById,
  getUser,
  getUserById,
  updateUserById,
} from './db/users';
import router from './router';

const port = 3000;
const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World from Auth-Microservice!');
});

app.get('/users', async (req, res) => {
  const users = await getUser();
  console.log(users);
  res.send(users);
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  console.log(user);
  res.send(user);
});

app.delete('/users', async (req, res) => {
  const { id } = req.body;
  await deleteUserById(id);
  res.send(`User with id ${id} delete`);
});

// app.put('/users', async (req, res) => {
//   const { values } = req.body;
//   const response = await updateUserById(values.id, values);
//   console.log(`User with id ${values.id} updated with data ${values}`);
//   res.send({ message: `${values.id} data updated` });
// });

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

const MONGO_URL = 'mongodb://127.0.0.1:27017/';

mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.use('/', router());
