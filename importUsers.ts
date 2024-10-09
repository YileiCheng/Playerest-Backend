import fs from "fs";
import csv from "csv-parser";
import { dynamoDB } from "./src/config/awsConfig"

const TABLE_NAME = "Users";

const importUsers = async () => {
  const users: any[] = [];

  fs.createReadStream("dummyUsers.csv")
    .pipe(csv())
    .on("data", (row) => {
      users.push({
        id: Number(row.id),
        userName: row.username,
        password: row.password,
      });
    })
    .on("end", async () => {
      console.log(`Parsed ${users.length} users from CSV file.`);
      for (const user of users) {
        try {
          await addUserToDynamoDB(user);
        } catch (error) {
          console.error(`Error adding user ${user.username}:`, error);
        }
      }
      console.log("All users processed.");
    });
};

const addUserToDynamoDB = async (user: {
  id: number;
  userName: string;
  password: string;
}) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: user.id,
      userName: user.userName,
      password: user.password,
    },
  };

  return dynamoDB.put(params).promise();
};

importUsers();
