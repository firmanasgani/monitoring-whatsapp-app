import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl">Page not found</p>
      <Link to="/dashboard" className="mt-4 text-blue-500 hover:underline">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;

