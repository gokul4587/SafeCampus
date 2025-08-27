# SafeCampus

An anonymous reporting platform for students to report drug-related activities on campus.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your machine:

*   [Node.js](https://nodejs.org/en/download/) (which comes with npm)
*   [Python](https://www.python.org/downloads/)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/gokul4587/SafeCampus.git
    cd SafeCampus
    ```

2.  **Set up the backend**

    *   Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    *   Create a virtual environment:
        ```bash
        python -m venv venv
        ```
    *   Activate the virtual environment:
        *   On Windows:
            ```bash
            .\venv\Scripts\activate
            ```
        *   On macOS/Linux:
            ```bash
            source venv/bin/activate
            ```
    *   Install the required packages:
        ```bash
        pip install -r requirements.txt
        ```

3.  **Set up the frontend**

    *   Navigate to the `frontend` directory:
        ```bash
        cd ../frontend
        ```
    *   Install the required packages:
        ```bash
        npm install
        ```

## Usage

### Running the backend

*   Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
*   Activate the virtual environment (if not already activated).
*   Run the following command:
    ```bash
    uvicorn main:app --reload
    ```
The backend server will be running on `http://127.0.0.1:8000`.

### Running the frontend

*   Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```
*   Run the following command:
    ```bash
    npm start
    ```
The frontend development server will be running on `http://localhost:3000`.
