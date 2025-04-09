import React, { useEffect, useState } from "react";
import api from "../api/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const token = localStorage.getItem('token');
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-[#0a2259] text-white px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Task Management</h1>
          <button className="text-sm underline">Log Out</button>
        </div>

        <div className="px-6 py-4">
          <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
          <button className="bg-[#2444c0] text-white px-4 py-2 rounded-md font-semibold mb-4 hover:bg-[#1a37a6]">Add New Task</button>

          <div className="flex gap-4 mb-4 text-[#1a1a1a] font-medium">
            {['All', 'Pending', 'Completed', 'Actono'].map((f) => (
              <button
                key={f}
                className={`hover:underline ${filter === f ? 'font-bold text-black' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Title</th>
                <th className="py-2">Status</th>
                <th className="py-2">Due Date</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id} className="border-b text-sm text-[#1a1a1a]">
                  <td className="py-2">
                    <input type="checkbox" className="mr-2" />
                    {task.title}
                  </td>
                  <td className="py-2">{task.status}</td>
                  <td className="py-2">{task.dueDate || "—"}</td>
                  <td className="py-2">
                    <button className="text-blue-600 hover:underline mr-2">Edit</button>
                    <button className="text-blue-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;