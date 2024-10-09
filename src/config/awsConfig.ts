import AWS from "aws-sdk";
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config(); // This loads the variables from .env into process.env

// AWS S3 configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3Client = new S3Client({
    region: process.env.AWS_REGION!, // Use non-null assertion operator
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!, // Use non-null assertion operator
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, // Use non-null assertion operator
    },
  });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export { s3Client, dynamoDB };