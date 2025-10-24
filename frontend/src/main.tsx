import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)