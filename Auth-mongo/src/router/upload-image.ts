import express from 'express';
import { uploadImage } from '../controllers/upload-image';
import { isAuthenticated, isOwner } from '../middlewares';
import multer from 'multer';

const storage = multer.memoryStorage();
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Invalid image file');
  }
};

const uploads = multer({ storage, fileFilter });

export default (router: express.Router) => {
  router.post(
    '/user/upload-image/:id',
    isAuthenticated,
    isOwner,
    uploads.single('profile'),
    uploadImage
  );
};
