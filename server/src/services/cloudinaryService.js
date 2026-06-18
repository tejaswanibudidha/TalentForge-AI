import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

dotenv.config();

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

function ensureCloudinaryConfig() {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary configuration is missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment.');
  }
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

function bufferToStream(buffer) {
  return Readable.from(buffer);
}

export async function uploadBufferToCloudinary(buffer, options = {}) {
  ensureCloudinaryConfig();

  const { publicId, folder, resourceType = 'auto' } = options;
  const uploadOptions = {
    folder,
    resource_type: resourceType,
    public_id: publicId,
    overwrite: true,
    secure: true,
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });

    bufferToStream(buffer).pipe(uploadStream);
  });
}
