import "./App.css";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import RegistrationForm from "./components/RegistrationForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <>
      <div>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginForm />} />
            <Route path="register" element={<RegistrationForm />} />
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Route>
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
