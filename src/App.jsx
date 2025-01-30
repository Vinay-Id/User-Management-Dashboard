import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import ViewUsersDetail from "./components/ViewUsersDetail";
import AddEditUserDetail from "./components/AddEditUserDetail";

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <Link to="/">
            <h1>User Management</h1>
          </Link>
          <nav>
            <ul>
              {/* <li><a href="/">Home</a></li> */}
              {/* <li><a href="/add">Add User</a></li> */}
              <Link to="/add_user">
                <button>Add User</button>
              </Link>
            </ul>
          </nav>
        </header>

        <div className="app-main">
          <Routes>
            <Route path="/" element={<ViewUsersDetail />} />
            <Route path="/add_user" element={<AddEditUserDetail />} />
            <Route path="/edit_user/:id" element={<AddEditUserDetail />} />
          </Routes>
        </div>
      </div>

      <ToastContainer position="top-right" theme="colored" />
    </Router>
  );
}

export default App;
