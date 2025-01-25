import React, { useState } from "react";
import "./Maintenance.css";

const Maintenance = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [newTask, setNewTask] = useState({
    description: "",
    status: "Pending",
    priority: "Low",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Add a new task
  const addTask = (e) => {
    e.preventDefault(); // Prevent form submission
    if (!newTask.description.trim()) {
      alert("Task description is required!");
      return;
    }

    // Create a new task with a unique ID
    const newTaskWithId = {
      ...newTask,
      id: Date.now(), // Use timestamp as a unique ID
    };

    setTasks((prevTasks) => [...prevTasks, newTaskWithId]); // Update state
    setNewTask({ description: "", status: "Pending", priority: "Low" }); // Reset form
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Remove task by ID
  };

  return (
    <div className="maintenance">
      <h1>Maintenance Tasks</h1>

      {/* Task Adding Form */}
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleInputChange}
          required
        />
        <select name="status" value={newTask.status} onChange={handleInputChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" value={newTask.priority} onChange={handleInputChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      {/* Task Table */}
      <table className="maintenance-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No tasks available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance;
