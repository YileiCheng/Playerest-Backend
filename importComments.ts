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

const TABLE_NAME = "Comments";

const importComments = async () => {
  const comments: any[] = [];

  fs.createReadStream("dummyComments.csv")
    .pipe(csv())
    .on("data", (row) => {
      comments.push({
        id: Number(row.id),
        author: row.author,
        content: row.content,
        reviewId: Number(row.reviewId),
        like: Number(row.like),
      });
    })
    .on("end", async () => {
      console.log(`Parsed ${comments.length} comments from CSV file.`);

      for (const comment of comments) {
        try {
          await addCommentToDynamoDB(comment);
        } catch (error) {
          console.error(`Error adding comment with id ${comment.id}:`, error);
        }
      }

      console.log("All comments processed.");
    });
};

const addCommentToDynamoDB = async (comment: {
  id: number;
  author: string;
  content: string;
  reviewId: number;
  like: number;
}) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: comment.id,
      author: comment.author,
      content: comment.content,
      reviewId: comment.reviewId,
      like: comment.like,
    },
  };

  return dynamoDB.put(params).promise();
};

importComments();
