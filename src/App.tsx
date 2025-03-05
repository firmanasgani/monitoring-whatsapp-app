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
import { MessageDB } from "./pages/MessageDB";
import { DEFAULT_PAGE, DASHBOARD_PAGE, LOGIN_PAGE, MESSAGE_LOGS, PROFILE_PAGE, USERS_PAGE } from "./utils/variables/urlPath";
import { ProfilePage } from "./pages/Profile";
import UsersPage from "./pages/Users";

function App() {
  const token = localStorage.getItem("access_token");
  return (
    <Routes>
      <Route path={LOGIN_PAGE} element={ token === null ? <LoginPage /> : <DashboardPage />} />
      <Route
        path={DEFAULT_PAGE}
        element={
          token === null ? (
            <Navigate to={LOGIN_PAGE} />
          ) : (
            <DashboardPage />
          )
        }
      />

      <Route
        path={PROFILE_PAGE}
        element={
          token === null ? (
            <Navigate to={LOGIN_PAGE} />
            ) : (
              <ProfilePage />
            )
        }
        />

      <Route
        path={DASHBOARD_PAGE}
        element={
          token=== null ? (
            <Navigate to="/login" />
          ) : (
            <DashboardPage />
          )
        }
      />
      <Route
        path="/whatsapp-number"
        element={
          token === null ? (
            <Navigate to="/login" />
          ) : (
            <WhatsappNumberPage />
          )
        }
      />
      <Route
        path="/whatsapp-number/add"
        element={
          token === null ? (
            <Navigate to="/login" />
          ) : (
            <WhatsappPhoneForm />
          )
        }
      />

      <Route
        path="/message-template"
        element={
          token === null ? (
            <Navigate to="/login" />
          ) : (
            <TemplateMessage />
          )
        }
      />

<Route
        path="/message-template/view/:id"
        element={
          token === null ? (
            <Navigate to="/login" />
          ) : (
            <TemplateDetailPage />
          )
        }
      />

      <Route
        path="/message-template/add"
        element={
          token === null ? (
            <Navigate to="/login" />
          ) : (
            <MessageTemplateForm />
          )
        }
      />

      <Route
        path="/message" 
        element={
          token === null ? (
            <Navigate to="/login" />
          ) : (
            <MessagePage />
          )
        }
        />

<Route
        path={MESSAGE_LOGS}
        element={
          token === null ? (
            <Navigate to="/login" />
          ) : (
            <MessageDB />
          )
        }
        />

      <Route
        path="/api-token"
        element={
          token === null ? (
            <Navigate to="/login" />
          ) : (
            <ApiToken />
          )
        }
      />

      <Route
        path="/api-token/add"
        element={
          token === null ? (
            <Navigate to="/login" />
          ) : (
            <ApiTokenForm />
          )
        }
      />

      <Route
        path="/message-approval"
        element={
          token !== null &&
          localStorage.getItem("administrator") === "true" ? (
            <MessageApprovalPage />
          ) : token !== null ? (
            <Navigate to="/not-found" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path={USERS_PAGE}
        element={
          token === null ? (
            <Navigate to="/login" />
          ) : (
            <UsersPage />
          )
        }
      />

      
<Route
        path="/message-approval/update/:id"
        element={
          token !== null &&
          localStorage.getItem("administrator") === "true" ? (
            <MessageTemplateUpdate />
          ) : token !== null ? (
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

