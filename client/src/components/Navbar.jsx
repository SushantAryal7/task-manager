// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-600">Task Manager</h1>

        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-600 font-medium transition"
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-purple-600 font-medium transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-700 hover:text-purple-600 font-medium transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
