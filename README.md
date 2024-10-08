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

Get all users (local):

    GET http://localhost:3000/api/users

Get all reviews (local):

    GET http://localhost:3000/api/reviews

Add a review (local):

    POST http://localhost:3000/api/reviews/add

    Example body:
    {
        "imageUrl": "https://cataas.com/cat?random=51",
        "author": "coolgamer",
        "title": "Fantastic Game!",
        "content": "This game offers an incredible experience. I loved the graphics and gameplay.",
        "rate": 5
    }

Get reviews by author (local):

    POST http://localhost:3000/api/reviews/by-author

    Example body:
    {"author": "topgamer", "reviewId": "5"}

Login (local):

    POST http://localhost:3000/api/users/login

    Example body:
    {"UserId": "Yilei Cheng", "Password": "yileicheng"}

Register (local):

    POST http://localhost:3000/api/users/register

    Example body:
    {"UserId": "Yilei Cheng 2", "Password": "yileicheng2"}

Get all comments (local):

    GET http://localhost:3000/api/comments

Get comments by reviewId (local):

    POST http://localhost:3000/api/comments/review

    Example body:
    {"reviewId": 5}
