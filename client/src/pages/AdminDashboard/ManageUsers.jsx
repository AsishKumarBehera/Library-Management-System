import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AdminDashboard/ManageUser.css";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [user, setUser] = useState({ name: "", email: "", role: "User", membership: "Basic" });

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:2000/api/users");
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Add or update user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await axios.put(`http://localhost:2000/api/users/${editingUser._id}`, user);
            } else {
                await axios.post("http://localhost:2000/api/users/add", user);
            }
            fetchUsers();
            setUser({ name: "", email: "", role: "User", membership: "Basic" });
            setEditingUser(null);
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    // Delete user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:2000/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <div className="handm">
                <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow">
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        className="border p-2 mr-2"
                    />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="border p-2 mr-2"
                    />
                    <select name="role" value={user.role} onChange={handleChange} className="border p-2 mr-2">
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <select name="membership" value={user.membership} onChange={handleChange} className="border p-2 mr-2">
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                    </select>
                    <button type="submit" className="bg-blue-500 text-white p-2">
                        {editingUser ? "Update User" : "Add User"}
                    </button>
                </form>
            </div>


            {/* User Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Membership</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="text-center">
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2">{user.membership}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => setEditingUser(user)}
                                    className="bg-yellow-500 text-white px-2 py-1 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteUser(user._id)}
                                    className="bg-red-500 text-white px-2 py-1"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
