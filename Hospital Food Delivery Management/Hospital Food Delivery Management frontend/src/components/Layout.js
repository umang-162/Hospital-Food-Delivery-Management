import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white">
        <div className="p-4 text-2xl font-bold">Hospital Manager</div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link to="/" className="block px-4 py-2 hover:bg-blue-500">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/patients"
                className="block px-4 py-2 hover:bg-blue-500"
              >
                Patient Management
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;
