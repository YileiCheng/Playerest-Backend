import multer from "multer";
import multerS3 from "multer-s3";
import { s3Client } from "../config/awsConfig";
import dotenv from 'dotenv';

dotenv.config(); // This loads the variables from .env into process.env

const bucketName = process.env.AWS_BUCKET_NAME;

if (!bucketName) {
  throw new Error('AWS_BUCKET_NAME is not defined in the environment variables');
}

export const uploadImage = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: bucketName,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `reviewImages/${Date.now().toString()}-${file.originalname}`); // Unique file name
    }
  })
});