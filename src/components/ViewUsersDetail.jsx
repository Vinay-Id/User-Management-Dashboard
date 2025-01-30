import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

function ViewUsersDetail() {
  const [userData, setUserData] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUserData(res.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch users.");
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userToDelete}`
      );
      setUserData((prevUsers) =>
        prevUsers.filter((user) => user.id !== userToDelete)
      );
      toast.success("User deleted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete user.");
      setIsModalOpen(false);
    }
  };

  const openModal = (id) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="view-users">
      {isLoading && <div className="loading">Loading...</div>}

      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.split(" ")[0]}</td>
              <td>{user.name.split(" ")[1]}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <Link to={`/edit_user/${user.id}`}>
                  <button className="editBtn">
                    <FaEdit size={15} />
                  </button>
                </Link>
                <button onClick={() => openModal(user.id)} className="icon-btn">
                  <FaTrash size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this user?</h3>
            <div className="modal-actions">
              <button className="confirm" onClick={handleDeleteUser}>
                Delete
              </button>
              <button className="cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewUsersDetail;
