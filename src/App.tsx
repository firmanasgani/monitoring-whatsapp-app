import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import WhatsappNumberPage from './pages/whatsapp';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={localStorage.getItem('token') === null ? <Navigate to="/login" /> : <Home />}
      />

  <Route
        path="/dashboard"
        element={localStorage.getItem('token') === null ? <Navigate to="/login" /> : <DashboardPage />}
      />
      <Route
        path="/whatsapp-number"
        element={localStorage.getItem('token') === null ? <Navigate to="/login" /> : <WhatsappNumberPage />}
      />
    </Routes>
    
  );
}

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">Hello, Tailwind!</h1>
    </div>
  )
}

export default App;
