import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom"; // if using react-router

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    due_date: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({
      title: "",
      description: "",
      status: "Pending",
      due_date: "",
    });
    setShowModal(true);
  };

  const handleEditClick = (task) => {
    console.log(task);
    setIsEditing(true);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date ? task.due_date.substring(0, 10) : "",
    });
    setEditingTaskId(task.id);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/tasks/${editingTaskId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        
        await api.post("/tasks", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchTasks();
      setShowModal(false);
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  const handleLogout = async () => {
    try {
      await api.post(
        "/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("token");
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Task Management</h1>
          <button className="logout-btn"  onClick={handleLogout}>Log Out</button>
        </div>

        <div className="dashboard-body">
          <h2 className="section-title">Dashboard</h2>
          <button className="add-task-btn" onClick={handleAddClick}>
            Add New Task
          </button>

          <div className="filter-buttons">
            {["All", "Pending", "Completed"].map((f) => (
              <button
                key={f}
                className={`filter-btn ${
                  filter === f ? "active-filter" : ""
                }`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <table className="task-table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id}>
                  <td>☐</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.due_date || "—"}</td>
                  <td>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEditClick(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteClick(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>{isEditing ? "Edit Task" : "Add New Task"}</h3>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                  />
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                  />
                  <div className="modal-actions">
                    <button type="submit" className="save-btn">
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
