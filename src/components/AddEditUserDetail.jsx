import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AddEditUserDetail() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const user = response.data;
      setFormData({
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1] || "",
        email: user.email,
        department: user.company.name,
      });
    } catch (error) {
      toast.error("Failed to fetch user data.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { firstName, lastName, email, department } = formData;
    if (!firstName || !lastName || !email || !department) {
      // if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' ||  department.trim() === '') {
      toast.error("All fields are required!");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (id) {
        await axios.put(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          formData
        );
        toast.success("User updated successfully!");
      } else {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          {
            ...formData,
            id: Date.now(),
          }
        );
        console.log('user data:-',response.data);       
        toast.success("User added successfully!");
      }
      navigate("/");
    } catch (error) {
      toast.error(id ? "Failed to update user." : "Failed to add user.");
    }
  };

  return (
    <div className="add-edit-user">
      <h2>{id ? "Edit User" : "Add User"}</h2>
      <form className="add-edit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName.trim()}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName.trim()}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email.trim()}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department.trimStart()}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{id ? "Update User" : "Add User"}</button>
      </form>
    </div>
  );
}

export default AddEditUserDetail;
