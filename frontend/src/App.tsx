import React, { useState, useEffect } from 'react';
import './style.css';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import api from './services/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a stored token
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      api.setToken(storedToken);
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token: string) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem('token');
    api.setToken('');
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <header>
            <button onClick={handleLogout} style={{ float: 'right', margin: '10px' }}>
              Logout
            </button>
          </header>
          <Dashboard />
        </div>
      )}
    </div>
  );
}

export default App;