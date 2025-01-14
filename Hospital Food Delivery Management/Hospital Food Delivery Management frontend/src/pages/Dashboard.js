import React from "react";
import Layout from "../components/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold">
        Welcome to the Hospital Food Management System
      </h1>
      <p className="mt-4 text-gray-700">
        Use the sidebar to navigate through the application.
      </p>
    </Layout>
  );
};

export default Dashboard;
