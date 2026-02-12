import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Helper to wrap AuthProvider
import Login from './pages/Login';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router basename="/app-entrenador-personal">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
