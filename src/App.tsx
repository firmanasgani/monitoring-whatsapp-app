import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import WhatsappNumberPage from "./pages/whatsapp";
import WhatsappPhoneForm from "./pages/whatsapp/form";
import TemplateMessage from "./pages/Template";
import ApiToken from "./pages/ApiToken";
import MessageTemplateForm from "./pages/Template/form";
import ApiTokenForm from "./pages/ApiToken/form";
import MessageApprovalPage from "./pages/MessageApproval";

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
            <DashboardPage />
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

      <Route
        path="/message-approval"
        element={
          localStorage.getItem("token") !== null &&
          localStorage.getItem("administrator") === "true" ? (
            <MessageApprovalPage />
          ) : localStorage.getItem("token") !== null ? (
            <Navigate to="/not-found" />
          ) : (
            <Navigate to="/login" />
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



export default App;
