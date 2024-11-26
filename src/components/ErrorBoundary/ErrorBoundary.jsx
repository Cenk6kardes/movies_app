import React from "react";
import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="flex justify-content-center text-center items-center min-h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500">An Error Occurred</h1>
        <p className="text-gray-700 mt-2">{error.message || "Something went wrong."}</p>
        <Button label="Go To Main Page" severity="danger" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default ErrorBoundary;
