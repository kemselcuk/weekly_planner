import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      if (!res.ok) {
        throw new Error('Sign in failed');
      }
      // After successful registration, you can:
      // 1. Redirect to login page:
      navigate('/login');
      // Or 2. Automatically log the user in by calling login endpoint and setting token.
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-8 border-gray-700 rounded shadow-xl bg-black bg-opacity-15">
      <h2 className="text-2xl font-bold mb-4">Sign In (Register)</h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium ">Name (optional)</label>
          <input
            type="text"
            className="w-full border p-2 rounded  bg-black bg-opacity-30 shadow-xl hover:bg-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded  bg-black bg-opacity-30 shadow-xl hover:bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded  bg-black bg-opacity-30 shadow-xl hover:bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
          />
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-500">
          Sign In
        </button>
      </form>
      <p className="text-sm mt-4">Already have an account? <a className="underline text-purple-600" href="/login">Login</a></p>
    </div>
  );
};

export default SignIn;
