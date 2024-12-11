import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  email: string;
  name?: string;
}

interface UserInfoProps {
  token: string;
  onLogout: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ token, onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch user info');
        }
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => {
        console.error(err);
        // If token is invalid or error occurs, consider logging out
        onLogout();
      });
  }, [token, onLogout]);

  const handleLogout = () => {
    // Clear token and redirect to login
    onLogout();
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border-gray-700 rounded shadow-xl bg-black bg-opacity-15">
      <h2 className="text-3xl font-bold mb-4">User Information</h2>
      {user ? (
        <div className="space-y-4">
          <div className="py-1 px-2 border-gray-700 rounded shadow-xl bg-black bg-opacity-20">
          <p><strong>Email:</strong> {user.email}</p>
          </div>
          <div className="py-1 px-2 border-gray-700 rounded shadow-xl bg-black bg-opacity-20">
          {user.name && <p><strong>Name:</strong> {user.name}</p>}
          </div>
          <div className="grid place-content-center ...">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
          >
            Logout
          </button>
          </div>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default UserInfo;
