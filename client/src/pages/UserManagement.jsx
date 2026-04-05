import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import SearchFilter from "../components/SearchFilter";
import useAuth from "../hooks/useAuth";
import "../css/UserManagement.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const USER_URL = "/api/users";

const UserManagement = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const roles = ["admin", "user", "maintenance"];
  const maintenanceRoles = [
    "Electrican",
    "Plumber",
    "General Tecnhician",
    "IT Technician",
    "Groundsman",
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(USER_URL, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`
          }
        });

        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleChange = (id, field, value) => {
    const updatedUsers = users.map((user) => {
      if (user._id === id) {
        let updated = { ...user, [field]: value };

        // Reset maintenanceRole if role changed
        if (field === "role" && value !== "maintenance") {
          updated.maintenanceRole = null;
        }
        return updated;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${USER_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(USER_URL, users, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      });
      alert("Users updated successfully!");
    } catch (err) {
      console.error("Error saving users:", err);
    }
  };

  if (auth?.role !== "admin") return <p>Access denied</p>;

  return (
    <div className="page-container">
      <Sidebar role={auth?.role} activePage="users" />

      <div className="main-content">
        <div className="page-header">
          <h2>User Management</h2>
          <button onClick={handleSave}>Save</button>
        </div>

        <SearchFilter />

        <div className="table-container">
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Maintenance Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleChange(user._id, "name", e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => handleChange(user._id, "email", e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        value={user.phone || ""}
                        placeholder="-"
                        onChange={(e) => handleChange(user._id, "phone", e.target.value)}
                      />
                    </td>

                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleChange(user._id, "role", e.target.value)}
                      >
                        {roles.map((r) => (
                          <option key={r} value={r}>
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>
                      {user.role === "maintenance" ? (
                        <select
                          value={user.maintenanceRole || ""}
                          onChange={(e) =>
                            handleChange(user._id, "maintenanceRole", e.target.value)
                          }
                        >
                          <option value="">Select Role</option>
                          {maintenanceRoles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <button onClick={() => handleDelete(user._id)}> <FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;