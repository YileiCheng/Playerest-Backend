import AWS from "aws-sdk";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";

dotenv.config();

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const TABLE_NAME = "Reviews";

const importReviews = async () => {
  const reviews: any[] = [];

  fs.createReadStream("dummyReviews.csv")
    .pipe(csv())
    .on("data", (row) => {
      reviews.push({
        id: Number(row.id),
        imageUrl: row.imageUrl,
        author: row.author,
        title: row.title,
        content: row.content,
        rate: Number(row.rate),
        like: Number(row.like),
      });
    })
    .on("end", async () => {
      console.log(`Parsed ${reviews.length} reviews from CSV file.`);
      for (const review of reviews) {
        try {
          await addReviewToDynamoDB(review);
        } catch (error) {
          console.error(`Error adding review with id ${review.id}:`, error);
        }
      }
      console.log("All reviews processed.");
    });
};

const addReviewToDynamoDB = async (review: {
  id: number;
  imageUrl: string;
  author: string;
  title: string;
  content: string;
  rate: number;
  like: number;
}) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: review.id,
      imageUrl: review.imageUrl,
      author: review.author,
      title: review.title,
      content: review.content,
      rate: review.rate,
      like: review.like,
    },
  };

  return dynamoDB.put(params).promise();
};

importReviews();
