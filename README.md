# User Management Dashboard

## Objective
The goal of this project is to develop a simple web application where users can view, add, edit, and delete user details. This application interacts with a mock backend API to demonstrate common CRUD operations (Create, Read, Update, Delete) using ReactJS.

---


### Functionality:
1. **View Users**: Display all users by fetching data from the `/users` endpoint.
2. **Add Users**: Allow users to be added via a form. (Note: JSONPlaceholder will simulate a successful response but won't persist the data).
3. **Edit Users**: Allow editing of an existing user by fetching their current data, allowing edits, and sending the updated data back via the API.
4. **Delete Users**: Users can be deleted from the list by sending a delete request to the API (simulated by JSONPlaceholder).

### Error Handling:
- Handle API request failures gracefully. If an error occurs, display a user-friendly error message.

---


## How to Use

### Prerequisites
Before running the project, ensure that you have the following installed:
- **Node.js** (version >= 14.x) - [Download Node.js](https://nodejs.org/)
- **npm** (or **yarn**) - Node package manager, which comes with Node.js.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/user-management-dashboard.git
 ```

### 2.  Install Dependencies

Navigate into the project directory:

   ```bash
   cd user-management-dashboard
   ```

### 3. Install the required npm packages:

   ```bash
   npm install
   ```

### 4. Start the React development server:

   ```bash
   npm start
   ```

   The React app will be available at `http://localhost:3000` by default.
