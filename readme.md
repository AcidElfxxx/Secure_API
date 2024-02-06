# Secure User Authentication & Authorization System

This project implements a secure user authentication and authorization system using Node.js, Express.js, and MongoDB.

## Features

- **User Registration:** Users can register with unique usernames and securely store their passwords in the database using bcrypt hashing.
- **User Login:** Registered users can securely authenticate themselves by providing their credentials. Passwords are validated against hashed passwords stored in the database.
- **JWT-Based Authentication:** Upon successful login, users receive a JSON Web Token (JWT) containing their username and user ID. This token is signed with a secret key and sent to the client as a cookie for subsequent requests.
- **Protected Routes:** Certain routes are protected and can only be accessed by authenticated users. This is enforced using JWT-based middleware, which verifies the validity of the JWT before granting access to protected resources.
- **Error Handling:** Comprehensive error handling is implemented throughout the application to ensure graceful handling of errors and provide informative responses to users.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- bcrypt
- JSON Web Tokens (JWT)

## Create .env file

- MONGO_URI=your_mongodb_uri 
- JWT_SECRET=your_jwt_secret


