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
import NotFoundPage from "./pages/NotFound";
import TemplateDetailPage from "./pages/Template/detail"
import MessageTemplateUpdate from "./pages/MessageApproval/MessageUpdate";
import MessagePage from "./pages/Message";

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
        path="/message-template/view/:id"
        element={
          localStorage.getItem("token") === null ? (
            <Navigate to="/login" />
          ) : (
            <TemplateDetailPage />
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
        path="/message" 
        element={
          localStorage.getItem('token') === null ? (
            <Navigate to="/login" />
          ) : (
            <MessagePage />
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
        path="/message-approval/update/:id"
        element={
          localStorage.getItem("token") !== null &&
          localStorage.getItem("administrator") === "true" ? (
            <MessageTemplateUpdate />
          ) : localStorage.getItem("token") !== null ? (
            <Navigate to="/not-found" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}



export default App;

