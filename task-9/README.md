# Task 9

## Build a Basic RESTful API with Node.js and Express

### Description:

Your task is to create a simple RESTful API using Node.js and Express.js. This project will help you get familiar with routing, handling HTTP requests, and interacting with a database. Utilize PostgreSQL database.

### Requirements:

- Setup: Initialize a new Node.js project, install Express.js, and set up a basic project structure.
- Endpoints: Create the following endpoints for your API:
  - GET /api/users - Retrieve a list of users.
  - GET /api/users/:id - Retrieve a single user by ID.
  - POST /api/users - Create a new user.
  - PUT /api/users/:id - Update an existing user by ID.
  - DELETE /api/users/:id - Delete a user by ID.
  - Data: Use an in-memory data store (like an array) or a database to store user information.
- Middleware: Implement middleware to handle request validation, error handling, and logging.
- Validation: Ensure that appropriate validation is in place to handle invalid requests (e.g., validating user input).
- Error Handling: Implement error handling to return appropriate HTTP status codes and error messages when things go wrong.
- Testing: Write unit tests for your routes and middleware functions using a testing framework Jest.
- Documentation: Create a simple documentation describing the API endpoints, request and response formats, and how to use the API.
- Implement pagination for the user list.
- Add authentication and authorization for specific routes.
- Deploy the API to a cloud platform (Netlify or any other service provider).

## Project Structure

The project consists of a backend server created using Express

- [server](https://github.com/dshreejal/Internship-Amnil/tree/main/task-9/server)

## Project Setup

Fork the repository and clone it (or download the zip file and extract it)

```bash
git clone git@github.com:dshreejal/Internship-Amnil.git
```

Change directory to the project directory

```bash
cd Internship-Amnil/task-9
```

Change directory to the server

```bash
cd server
```

Install the required dependencies

```bash
npm install
```

Add the necessary environment variables from .env.example file

```bash
PORT = 8000
JWT_SECRET='Some Secret'
smtpHost = 'smtp host'
smtpPort = 1234
smtpUserEmail = 'user email'
smtpUserPassword = 'user password'
POSTGRES_USER='postgres User'
POSTGRES_PASSWORD='postgres Password'
POSTGRES_HOST='postgres host'
POSTGRES_PORT=5432
POSTGRES_DB='db name'
```

Run the server

```bash
npm run start
```
