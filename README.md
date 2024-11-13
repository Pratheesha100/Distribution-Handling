## Distribution Handling System for Nelco Food Production

Welcome to the **Distribution Handling System** project for Nelco Food Production. This application is designed to streamline and optimize the distribution processes for the company, improving efficiency and management of logistics. 

### Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

---

### About the Project

This Distribution Handling System has been specifically implemented for the use of sales employees at Nelco Food Production. The system enables sales personnel to efficiently manage the sales activities of each agency associated with Nelco. Key functionalities include:

### Features

- **Agency Sales Management**: Sales employees can oversee and record sales data for each agency, providing comprehensive insights into sales performance across different regions.
- **Employee and Product Information Access**: Users are able to view detailed information about the employees and products associated with each agency, facilitating informed decision-making and seamless sales operations.
- **Returned Product Management**: The system offers tools to track and manage returned products, allowing sales employees to handle product returns efficiently and maintain accurate inventory records.
- **Reporting**: Generates detailed reports on sales performance, employee details, product details and returned product details.

### Tech Stack

- **Frontend**: [React.js, Tailwind]
- **Backend**: [Node.js, Express]
- **Database**: [MongoDB]
- **Other Tools**: GitHub, Postman (for API testing)

---

### Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

Ensure you have the following software installed on your machine:
- Node.js
- MongoDB (or any other database used)

### Installation

1. **Clone the repository**
 ```bash
    https://github.com/Pratheesha/Distribution-Handling.git
 ````
2.**Install dependancies**
<br> Install the node modules by typing "npm i" on the intregated terminal of the project.Then open another terminal and change the directory by typing "cd client" and install node modules for the client folder by entering "npm i" on the terminal.

3.**Start the application**
<br>Type "npm run dev" on the both terminals to run the backend and the frontend.

### Usage
<br>1. Access the application at http://localhost:3000 in your browser.
<br>2. Use the admin dashboard for inventory and order management.
<br>3. Generate reports on distribution data from the dashboard.

### Project Structure
Distribution-Handling/
<br>├── api/
<br>│   ├── controllers/        # API route controllers
<br>│   ├── models/             # Database models
<br>│   ├── routes/             # API routes
<br>│   ├── utils/              # Utility functions
<br>│   └── index.js            # Application entry point
<br>├── client/ 
<br>|    ├── src/ 
<br>|       ├── components/       # source files of common pages
<br>│       ├── img/              # images
<br>│       └── pages/            # source files of web pages
<br>|    ├── .env
<br>|    └── index.html 
<br>├── .env                    # Environment variables
<br>├── package.json            # Node.js dependencies
<br>└── README.md               # Project documentation


