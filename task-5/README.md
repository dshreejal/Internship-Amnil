# Task 5

Continued from [task-3](https://github.com/dshreejal/Internship-Amnil/tree/main/task-3) and [task-4](https://github.com/dshreejal/Internship-Amnil/tree/main/task-4). Add following implementations:

- Add a new collection Store.
- Store schema must include Name, logo, type, location (Store types are: Electronics, Grocery, Clothing, Stationery)
- Store location should be indexed using 2dSphere
- Store should be associated with User id.
- Add a new Image field in Product and User Schema
- Products should be associated with Store Schema
- Create a new Query to that sends location coordinates in request body and the API returns all the Stores within 1KM radius of the location.
  - Hint:
    - Use location coordinates of the store, Use aggregation pipeline for location based query.
    - This query must have searching based on store name

## Project Structure

The project consists of a backend server created using Express

- [server](https://github.com/dshreejal/Internship-Amnil/tree/main/task-5/server)

## Project Setup

Fork the repository and clone it (or download the zip file and extract it)

```bash
git clone git@github.com:dshreejal/Internship-Amnil.git
```

Change directory to the project directory

```bash
cd Internship-Amnil/task-5
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
```

Run the server

```bash
npm run start
```
