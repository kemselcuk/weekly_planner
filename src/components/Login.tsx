import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error('Login failed');
      }
      const data = await res.json();
      onLoginSuccess(data.token);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-8 border-gray-700 rounded shadow-xl bg-black bg-opacity-15">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded bg-black bg-opacity-30 shadow-xl hover:bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="pb-3">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded bg-black bg-opacity-30 shadow-xl hover:bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className=" w-full bg-purple-600 text-white py-2 rounded shadow-xl hover:bg-purple-500">
          Log In
        </button>
        <button type="submit" className=" w-full bg-purple-600 text-white py-2 rounded shadow-xl hover:bg-purple-500">
        <Link
              to="/sign-in"
              className={`text-sm font-medium px-3 py-1 rounded hover:underline`}
            >
              Sign In (If you don't have an account)
            </Link>
          </button>    
      </form>
    </div>
  );
};

export default Login;
