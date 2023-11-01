# Task 6

Continued from [task-6](https://github.com/dshreejal/Internship-Amnil/tree/main/task-6),

- Implement postgresql in task 6 (user, product, order routes)

## Project Structure

The project consists of a backend server created using Express

- [server](https://github.com/dshreejal/Internship-Amnil/tree/main/task-7/server)

## Project Setup

Fork the repository and clone it (or download the zip file and extract it)

```bash
git clone git@github.com:dshreejal/Internship-Amnil.git
```

Change directory to the project directory

```bash
cd Internship-Amnil/task-7
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
