# Automate-EventAttendence

A full-stack application designed to streamline and automate the process of managing event attendance. It features a React frontend and a Node.js/Express backend connected to a MongoDB database.

## Features

*   **Event Management:** Create, view, update, and delete events.
*   **User Authentication:** Secure user registration and login (likely using JWT based on dependencies).
*   **Attendance Tracking:** Mechanisms to record and manage attendee participation.
*   **File Uploads:** Supports uploading files (e.g., event images) via the backend.

## Tech Stack

*   **Frontend:** React, Vite, React Router
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (with Mongoose ODM)
*   **Styling:** CSS (potentially CSS Modules or other libraries within components)

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (which includes npm)
*   [MongoDB](https://www.mongodb.com/try/download/community) (running locally or provide a connection URI)
*   [Git](https://git-scm.com/)

## Getting Started

Follow these steps to get the project running locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kulshreya03/Automate-EventAttendence.git
    cd Automate-EventAttendence
    ```

2.  **Backend Setup:**
    *   Navigate to the backend directory:
        ```bash
        cd event-backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `event-backend` directory and add the following variables (replace placeholders with your actual values):
        ```dotenv
        MONGO_URI=your_mongodb_connection_string
        PORT=5000
        # Add any other required variables like JWT_SECRET if applicable
        # JWT_SECRET=your_jwt_secret_key 
        ```
    *   Start the backend server:
        ```bash
        npm run dev 
        ```
        The backend server should now be running (typically on `http://localhost:5000`).

3.  **Frontend Setup:**
    *   Navigate to the frontend directory from the root project folder:
        ```bash
        cd ../event-frontend 
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Start the frontend development server:
        ```bash
        npm run dev
        ```
        The frontend application should now be running (typically on `http://localhost:5173` or another port specified by Vite).

## Available Scripts

### Backend (`event-backend`)

*   `npm start`: Starts the server using `nodemon` (restarts on file changes).
*   `npm run dev`: Alias for `npm start`.

### Frontend (`event-frontend`)

*   `npm run dev`: Starts the Vite development server.
*   `npm run build`: Builds the production-ready application.
*   `npm run lint`: Lints the codebase using ESLint.
*   `npm run preview`: Serves the production build locally for preview.

## Environment Variables

The backend requires the following environment variables defined in the `event-backend/.env` file:

*   `MONGO_URI`: Your MongoDB connection string.
*   `PORT`: The port number for the backend server (defaults to 5000 if not set).
*   `JWT_SECRET`: (Likely needed if JWT authentication is fully implemented) A secret key for signing JSON Web Tokens.

## Folder Structure
