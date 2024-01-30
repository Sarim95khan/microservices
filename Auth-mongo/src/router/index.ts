import express from 'express';
import authentication from './authentication';
import users from './users';
import uploadImage from './upload-image';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  uploadImage(router);
  return router;
};
