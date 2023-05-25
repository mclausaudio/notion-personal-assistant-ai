Setup and Installation

    Navigate to the server folder in your terminal.
    Run npm install to install all the required dependencies.

Running the Application

    To start the application, run npm start in the terminal. This should start the backend server.
    The server by default runs on http://localhost:5000 (or the port you have set in your environment).

API Endpoints

Process And Submit To Notion (/api/process-and-submit):

This is a POST endpoint which takes in the user input text, processes it using the OpenAI API, and submits the processed input to the user's Notion database.