# Smart Placement Preparation Tracker

## Overview

Smart Placement Preparation Tracker is a web-based application developed to help students organize and monitor their coding preparation for placements. The system allows users to add coding problems, track solved and unsolved questions, and monitor overall progress.

---

## Features

* Search coding problems
* Add problems from dataset
* Filter by difficulty level
* Filter by solved/unsolved status
* Mark problems as solved or unsolved
* Delete problems
* Progress analytics
* Dark mode support

---

## Technology Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Tools Used

* VS Code
* Postman
* MongoDB Compass

---

## Project Structure

```text
Smart Placement Preparation Tracker/

client/
│
├── data/
│   └── problems.json
│
├── index.html
├── script.js
├── style.css

server/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── problemController.js
│
├── models/
│   └── problem.js
│
├── routes/
│   └── problemRoutes.js
│
├── package.json
├── package-lock.json
├── .env
├── server.js
```

## Installation Steps

### Clone repository

```bash
git clone <repository-url>
```

### Move to server folder

```bash
cd server
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Start backend server

```bash
npm start
```

### Run frontend

Open `index.html` in browser.

---

## Working Procedure

1. Open application
2. Search coding problems
3. Add problems
4. Track solved/unsolved status
5. Monitor preparation progress

---

## Future Scope

* AI-based problem recommendations
* Company-specific preparation tracking
* Personalized analytics
* Cloud deployment

---

## Conclusion

This project helps students manage coding preparation in a structured and efficient manner and improves placement preparation tracking.

---

Developed by: Priyanshu Ranjan
