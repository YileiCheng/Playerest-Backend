import { dynamoDB } from "../config/awsConfig"

export const getAllUsers = async () => {
  const params = {
    TableName: "Users",
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.error("Error fetching users from DynamoDB:", error);
    throw new Error("Could not fetch users");
  }
};

export const getAllReviews = async () => {
  const params = {
    TableName: "Reviews",
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.error("Error fetching reviews from DynamoDB:", error);
    throw new Error("Could not fetch reviews");
  }
};

export const checkUserExists = async (userId: string) => {
  const params = {
    TableName: "Users",
    Key: {
      UserId: userId,
    },
  };

  try {
    const data = await dynamoDB.get(params).promise();
    return !!data.Item;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw new Error("Error checking if user exists");
  }
};

export const loginUser = async (userId: string, password: string) => {
  const params = {
    TableName: "Users",
    Key: {
      UserId: userId,
    },
  };

  try {
    const data = await dynamoDB.get(params).promise();

    if (data.Item && data.Item.Password === password) {
      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: "Invalid UserId or Password" };
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("Could not log in user");
  }
};

export const registerUser = async (userId: string, password: string) => {
  const userExists = await checkUserExists(userId);

  if (userExists) {
    return { success: false, message: "User already exists" };
  }

  const params = {
    TableName: "Users",
    Item: {
      UserId: userId,
      Password: password,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    return { success: true, message: "User registered successfully!" };
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Could not register user");
  }
};
