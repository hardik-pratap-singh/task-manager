# Task Master Pro

![image](https://github.com/hardik-pratap-singh/task-manager/assets/97048877/3faa8645-388f-465c-9f5e-14740945d66d)

## Project Description

Task Master Pro is a Task Management Web Application that allows users to efficiently manage their tasks. 
The app provides functionality for users to register and log in, create, update, and delete tasks, mark tasks as completed, filter tasks by status, and search tasks by name.

## Features

- **User Registration and Login**: Secure user registration and login system.
- **Task Management**: Create, update, and delete tasks.
- **Task Status**: Mark tasks as completed.
- **Task Filtering**: Filter tasks by their status (completed, pending).
- **Task Search**: Search tasks by name.

## Front-end

- **Framework**: React.js
- **Pages**:
  - **Home/Login Page**: A simple login form.
  - **Registration Page**: A form for user registration.
  - **Dashboard**: Displays tasks with options to create, update, delete, filter, and search.
- **Design**: Responsive and user-friendly interface using Bootstrap.

## Back-end

- **Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens) for user authentication.
  
## API Endpoints

#### API for Authentication

- **User Registration**: `POST /api/signup`
- **User Login**: `POST /api/login`
- **Get User**: `GET /api/getuser`
- **Update Password**: `PUT /api/updatePassword`

#### API for Tasks

- **Add Task**: `POST /api/addTask`
- **Get Tasks**: `GET /api/getTask`
- **Get Completed Tasks**: `GET /api/getCompletedTasks`
- **Get Pending Tasks**: `GET /api/getPendingTasks`
- **Search Tasks**: `GET /api/search/:searchkey?`
- **Delete Task**: `DELETE /api/deleteTask/:id`
- **Update Task**: `PUT /api/updateTask/:id`


## Additional Features (Optional)

- **User Profile**: Ability to update password and other user details.

## Installation

### Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/hardik-pratap-singh/task-manager.git
2. Navigate to the project directory:
   ```bash
   cd task-manager
3. Install dependencies for both front-end and back-end:
   ```bash
    cd backend
    npm install
    
    cd ../frontend
    npm install
4. Set up environment variables:
   Rename the `example.env` file to `.env` in the backend directory and add the following -
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
   Similarly rename the `example.env` file to `.env` in the frontend directorly and add the following -
   ```bash
   VITE_BASE_URL=http://localhost:5000
5. Start the back-end server
   ```bash
   cd backend
   npm start
6. Start the front-end server
   ```bash
   cd frontend
   npm start


Task Master Pro is [Live](https://task-master-pro.netlify.app/) <br>
Demo Video [here](https://drive.google.com/file/d/1TW76SpWQNbQqBbEGmtmQDXowr6LjbHbX/view?usp=sharing)
