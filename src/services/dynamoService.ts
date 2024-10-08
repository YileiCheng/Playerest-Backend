import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

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

export const getMaxReviewId = async (): Promise<number> => {
  const params = {
    TableName: "Reviews",
    ProjectionExpression: "id",
  };

  try {
    const data = await dynamoDB.scan(params).promise();

    if (!data.Items || data.Items.length === 0) {
      return 0;
    }

    const maxId = Math.max(...data.Items.map((item) => item.id));

    return maxId;
  } catch (error) {
    console.error("Error fetching max review id:", error);
    throw new Error("Could not fetch max review id");
  }
};

export const addReview = async (review: {
  imageUrl: string;
  author: string;
  title: string;
  content: string;
  rate: number;
}) => {
  const currentMaxId = await getMaxReviewId();
  const newReviewId = currentMaxId + 1;

  const params = {
    TableName: "Reviews",
    Item: {
      id: newReviewId,
      imageUrl: review.imageUrl,
      author: review.author,
      title: review.title,
      content: review.content,
      rate: review.rate,
      like: 0,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      success: true,
      message: "Review added successfully!",
      id: newReviewId,
    };
  } catch (error) {
    console.error("Error adding review:", error);
    throw new Error("Could not add review");
  }
};

export const getReviewsByAuthor = async (
  author: string,
  reviewId?: number
): Promise<any[]> => {
  try {
    const params = {
      TableName: "Reviews",
      FilterExpression: "author = :author",
      ExpressionAttributeValues: {
        ":author": author,
      },
    };

    const data = await dynamoDB.scan(params).promise();

    const reviews = data.Items || [];
    if (reviewId) {
      return reviews.filter((review) => review.id !== reviewId);
    }

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews by author:", error);
    throw new Error("Could not fetch reviews by author");
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

export const getAllComments = async () => {
  const params = {
    TableName: "Comments",
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.error("Error getting all comments:", error);
    throw new Error("Could not fetch comments");
  }
};

export const getCommentsByReviewId = async (reviewId: number) => {
  const params = {
    TableName: "Comments",
    FilterExpression: "reviewId = :reviewId",
    ExpressionAttributeValues: {
      ":reviewId": reviewId,
    },
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.error(`Error getting comments for reviewId ${reviewId}:`, error);
    throw new Error("Could not fetch comments by reviewId");
  }
};

export const searchReviews = async (query: string): Promise<any[]> => {
  try {
    const params = {
      TableName: "Reviews",
    };

    const data = await dynamoDB.scan(params).promise();
    const reviews = data.Items || [];

    const lowerCaseQuery = query.toLowerCase();
    const filteredReviews = reviews.filter(
      (review) =>
        review.title.toLowerCase().includes(lowerCaseQuery) ||
        review.content.toLowerCase().includes(lowerCaseQuery) ||
        review.author.toLowerCase().includes(lowerCaseQuery)
    );

    return filteredReviews;
  } catch (error) {
    console.error("Error searching reviews:", error);
    throw new Error("Could not search reviews");
  }
};

export const getMaxDraftId = async (): Promise<number> => {
  const params = {
    TableName: "Drafts",
    ProjectionExpression: "id",
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    if (!data.Items || data.Items.length === 0) {
      return 0;
    }

    const maxId = Math.max(...data.Items.map((item) => item.id));
    return maxId;
  } catch (error) {
    console.error("Error fetching max draft id:", error);
    throw new Error("Could not fetch max draft id");
  }
};

export const storeDraft = async (draft: {
  imageUrl: string;
  author: string;
  title: string;
  content: string;
  rate?: number;
}) => {
  const currentMaxId = await getMaxDraftId();
  const newDraftId = currentMaxId + 1;

  const params = {
    TableName: "Drafts",
    Item: {
      id: newDraftId,
      imageUrl: draft.imageUrl,
      author: draft.author,
      title: draft.title,
      content: draft.content,
      rate: draft.rate ?? null,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      success: true,
      message: "Draft stored successfully!",
      id: newDraftId,
    };
  } catch (error) {
    console.error("Error storing draft:", error);
    throw new Error("Could not store draft");
  }
};

export const publishDraft = async (draftId: number) => {
  const getParams = {
    TableName: "Drafts",
    Key: { id: draftId },
  };

  try {
    const draftData = await dynamoDB.get(getParams).promise();

    if (!draftData.Item) {
      throw new Error(`Draft with id ${draftId} not found`);
    }

    const draft = draftData.Item;

    await addReview({
      imageUrl: draft.imageUrl,
      author: draft.author,
      title: draft.title,
      content: draft.content,
      rate: draft.rate,
    });

    const deleteParams = {
      TableName: "Drafts",
      Key: { id: draftId },
    };

    await dynamoDB.delete(deleteParams).promise();

    return { success: true, message: "Draft published successfully!" };
  } catch (error) {
    console.error("Error publishing draft:", error);
    throw new Error("Could not publish draft");
  }
};
