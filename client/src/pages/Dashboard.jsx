import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  // Get userName from localStorage and fetch tasks
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
      fetchTasks(); // Fetch tasks when the user logs in
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request header
        },
      });
      setTasks(response.data);
      console.log("tasks------", tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Handle task submission
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title: taskName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );
      setTaskName(""); // Clear task input
      fetchTasks(); // Refresh task list
    } catch (err) {
      console.error("Error creating task ---------:", err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token"); // Remove token from localStorage on logout
    navigate("/login");
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request header
        },
      });
      fetchTasks(); // Refresh task list after delete
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {userName} 👋
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Your Tasks
          </h2>

          {/* Task Creation Form */}
          <form onSubmit={handleTaskSubmit} className="mb-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter a new task"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-xl hover:bg-green-700 transition"
              >
                Add Task
              </button>
            </div>
          </form>

          {/* Task List */}
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks yet.</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-200 p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <p className="text-gray-800">{task.title}</p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
