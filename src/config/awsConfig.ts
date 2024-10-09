import AWS from "aws-sdk";
import { S3Client } from '@aws-sdk/client-s3';
import { Amplify } from 'aws-amplify';
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

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.AWS_USERPOOL_ID!,
      userPoolClientId: process.env.AWS_USERPOOL_APP_CLIENT_ID!,
      identityPoolId: process.env.AWS_IDENTITY_POOL_ID!,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: false,
        requireUppercase: false,
        requireNumbers: false,
        requireSpecialCharacters: false,
      },
    }
  },
});

export { s3Client, dynamoDB };