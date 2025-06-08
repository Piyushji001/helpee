import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_USER = {
  email: "test123@gmail.com",
  password: "123456",
  department: "IT"
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!password || !department) {
      setError("All fields are required.");
      return;
    }

    if (
      email === MOCK_USER.email &&
      password === MOCK_USER.password &&
      department === MOCK_USER.department
    ) {
      localStorage.setItem("isLoggedIn", "true");
      console.log("Logged in successfully. Navigating...");
      window.location.href = "/users";
    } else {
      setError("Incorrect credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={e => setDepartment(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
