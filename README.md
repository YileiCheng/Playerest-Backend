# Playerest-Server

This is the backend for Playerest, which is built using Node JS and TypeScript.

## Local Development

Add AWS credentials

    Create .env file in root, then add credentials

Install all project dependencies

    pnpm install

Run a local webserver to test functions

    pnpm run dev

Get all users API (local):

    GET http://localhost:3000/api/users

Get all reviews API (local):

    GET http://localhost:3000/api/reviews

Login (local):

    POST http://localhost:3000/api/users/login

    Example body:
    {"UserId": "Yilei Cheng", "Password": "yileicheng"}

Login (local):

    POST http://localhost:3000/api/users/register

    Example body:
    {"UserId": "Yilei Cheng 2", "Password": "yileicheng2"}
