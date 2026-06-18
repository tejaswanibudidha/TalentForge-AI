import multer from 'multer';
import path from 'path';

const memoryStorage = multer.memoryStorage();

const pdfFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf'];
  const allowedExtensions = ['.pdf'];
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(extension)) {
    return cb(new Error('Resume must be a PDF file.'));
  }

  cb(null, true);
};

const imageFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const allowedExtensions = ['.jpeg', '.jpg', '.png', '.webp', '.gif'];
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(extension)) {
    return cb(new Error('Profile image must be a JPG, PNG, WEBP, or GIF file.'));
  }

  cb(null, true);
};

export const resumeUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: pdfFilter,
}).single('resume');

export const profileImageUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter,
}).single('profileImage');
