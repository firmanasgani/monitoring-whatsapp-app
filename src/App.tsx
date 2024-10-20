import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={localStorage.getItem('token') === null ? <Navigate to="/login" /> : <Home />}
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
