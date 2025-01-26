import React, { useState } from "react";
import { apiInterceptors } from "../../utils/apiInterceptors";
import { LOGIN_POST } from "../../utils/variables/endpoint";

function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(loginForm.email)) {
      setEmailError(true);
    } else {
      try {
        const formData = new FormData();
        setIsLoading(true);
        formData.append("email", loginForm.email);
        formData.append("password", loginForm.password);

        const data = await apiInterceptors(LOGIN_POST, loginForm);
        if (data) {
          localStorage.setItem("access_token", data.data.accessToken);
          window.location.href = "/dashboard";
        } else {
          setEmailError(true);
        }
      } catch (error) {
        console.error(error);
        setEmailError(true);
      }finally{
        setIsLoading(false)
      }
   
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-left">
          Welcome to Whatsapp Notification!
        </h2>
        <p className="text-gray-500 mb-4 text-left">
          Please login to your account
        </p>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={loginForm.email}
            placeholder="Enter your email"
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={passwordVisibility ? "text" : "password"}
            value={loginForm.password}
            placeholder="Enter your password"
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
            className="absolute right-0 top-0 px-2 text-gray-700 hover:text-gray-900"
          >
            {passwordVisibility ? "Hide" : "Show"}
          </button>

          {emailError && (
            <p className="text-red-500">Email or password is incorrect.</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
