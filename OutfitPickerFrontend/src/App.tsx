import "./App.css";
import LoginForm from "./components/authentication/LoginForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./components/HomePage";
import RegistrationForm from "./components/authentication/RegistrationForm";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import { AuthProvider } from "./components/authentication/AuthProvider";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <Navbar></Navbar>
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
