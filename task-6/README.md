# Task 6

Continued from [task-5](https://github.com/dshreejal/Internship-Amnil/tree/main/task-5), Add following implementations:

- Add username, password in User schema model.
- Password must be stored in the form of hash (Use Bcrypt)
- Implement both Basic authentication as well as token based authentication strategies.
- Implement proper logic for validating the user in database.
- Add authentication middleware to all the protected routes.
- Add Api Swagger documentation
- Send Invoice email after checkout

## Project Structure

The project consists of a backend server created using Express

- [server](https://github.com/dshreejal/Internship-Amnil/tree/main/task-6/server)

## Project Setup

Fork the repository and clone it (or download the zip file and extract it)

```bash
git clone git@github.com:dshreejal/Internship-Amnil.git
```

Change directory to the project directory

```bash
cd Internship-Amnil/task-6
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
MongoURL = 'mongodb://localhost:27017/'
JWT_SECRET='Some Secret'
smtpHost = 'smtp host'
smtpPort = 1234
smtpUserEmail = 'user email'
smtpUserPassword = 'user password'
```

Run the server

```bash
npm run start
```
