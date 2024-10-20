import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import WhatsappNumberPage from "./pages/whatsapp";
import WhatsappPhoneForm from "./pages/whatsapp/form";
import TemplateMessage from "./pages/Template";
import ApiToken from "./pages/ApiToken";
import MessageTemplateForm from "./pages/Template/form";
import ApiTokenForm from "./pages/ApiToken/form";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          localStorage.getItem("token") === null ? (
            <Navigate to="/login" />
          ) : (
            <Home />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          localStorage.getItem("token") === null ? (
            <Navigate to="/login" />
          ) : (
            <DashboardPage />
          )
        }
      />
      <Route
        path="/whatsapp-number"
        element={
          localStorage.getItem("token") === null ? (
            <Navigate to="/login" />
          ) : (
            <WhatsappNumberPage />
          )
        }
      />
      <Route
        path="/whatsapp-number/add"
        element={
          localStorage.getItem("token") === null ? (
            <Navigate to="/login" />
          ) : (
            <WhatsappPhoneForm />
          )
        }
      />

      <Route
        path="/message-template"
        element={
          localStorage.getItem("token") === null ? (
            <Navigate to="/login" />
          ) : (
            <TemplateMessage />
          )
        }
      />

<Route
        path="/message-template/add"
        element={
          localStorage.getItem("token") === null ? (
            <Navigate to="/login" />
          ) : (
            <MessageTemplateForm />
          )
        }
      />

      <Route
        path="/api-token"
        element={
          localStorage.getItem("token") === null ? (
            <Navigate to="/login" />
          ) : (
            <ApiToken />
          )
        }
      />


      
<Route
        path="/api-token/add"
        element={
          localStorage.getItem("token") === null ? (
            <Navigate to="/login" />
          ) : (
            <ApiTokenForm />
          )
        }
      />
    </Routes>
  );
}

function Home() {
  return (
    <div className="flex items-center flex-col justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">Hello, Guest!</h1>
      <br />
      <p className="text-blue-500">
        Click{" "}
        <a href="/login" className="text-red-500">
          here
        </a>{" "}
        to login and click  {" "}
        <a href="/dashboard" className="text-red-500">
          here
        </a>{" "}
        to go to dashboard
      </p>
    </div>
  );
}

export default App;
