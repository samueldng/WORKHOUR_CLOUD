import './style.css';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
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