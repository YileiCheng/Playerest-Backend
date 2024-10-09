# Playerest-Server

This is the backend for Playerest, which is built using Node JS and TypeScript.

## Local Development

Add AWS credentials

    Create .env file in root, then add credentials

Install all project dependencies

    pnpm install

Run a local webserver to test functions

    pnpm run dev

Run script

    pnpm ts-node fileName.ts

## Local API

Get all users:

    GET http://localhost:3000/api/users

Get all reviews:

    GET http://localhost:3000/api/reviews

Add a review:

    POST http://localhost:3000/api/reviews/add

    Example body:
    {
        "imageUrl": "https://cataas.com/cat?random=51",
        "author": "coolgamer",
        "title": "Fantastic Game!",
        "content": "This game offers an incredible experience. I loved the graphics and gameplay.",
        "rate": 5
    }

Get reviews by author:

    POST http://localhost:3000/api/reviews/by-author

    Example body:
    {"author": "topgamer", "reviewId": "5"}

<!-- Login:

    POST http://localhost:3000/api/users/login

    Example body:
    {"UserId": "Yilei Cheng", "Password": "yileicheng"}

Register:

    POST http://localhost:3000/api/users/register

    Example body:
    {"UserId": "Yilei Cheng 2", "Password": "yileicheng2"} -->

SignUp:

    POST http://localhost:3000/api/users/signup

    Example body:
    {
        "email": "test@example.com",
        "username": "testuser",
        "password": "password123"
    }
    Test Example in FrontEnd:
    https://docs.amplify.aws/react/build-a-backend/auth/connect-your-frontend/using-the-authenticator/

SignIn:

    POST http://localhost:3000/api/users/signin

    Example body:
    {
        "username": "testuser",
        "password": "password123"
    }

Get all comments:

    GET http://localhost:3000/api/comments

Get comments by reviewId:

    POST http://localhost:3000/api/comments/review

    Example body:
    {"reviewId": 5}

Get a list of relevant reviews by query - SEARCH:

    POST http://localhost:3000/api/reviews/search

    Example body:
    {"query": "game"}

Add draft:

    POST http://localhost:3000/api/drafts/store

    Example body:
    {
        "imageUrl": "https://example.com/image.jpg",
        "author": "testuser",
        "title": "Great Game!",
        "content": "This is a draft review."
    }

Publish draft using draft id:

    POST http://localhost:3000/api/drafts/publish

    Example body:
    {"draftId": 1}

Upload image to AWS s3 bucket:

    POST http://localhost:3000/api/reviews/upload

    Example usage:
    // Create form data object
    const formData = new FormData();
    formData.append('image', selectedFile);
    const response = await axios.post('http://localhost:3000/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });

    Example response:
    {
        "message": "Image uploaded successfully!",
        "imageUrl": "https://plaverest-user-images.s3.eu-north-1.amazonaws.com/images/1234567890.png"
    }
