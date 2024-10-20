import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(loginForm.email)) {
      setEmailError(true);
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/users/login`, loginForm)
        .then((response) => {
          console.log(response.data);
          if (response.data.data) {
            localStorage.setItem("token", response.data.data.accessToken);
            window.location.href = "/dashboard";
          } else {
            setEmailError(true);
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          setEmailError(true);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-left">
          Welcome to Whatsapp Notification! <br />
          Login to continue
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />

          {emailError && (
            <p className="text-red-500">Email or password is incorrect.</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
