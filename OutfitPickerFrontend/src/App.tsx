import "./App.css";
import LoginForm from "./components/authentication/LoginForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RegistrationForm from "./components/authentication/RegistrationForm";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import { AuthProvider } from "./components/authentication/AuthProvider";
import Navbar from "./components/layout/Navbar";
import ClothingList from "./components/clothing/ClothingList";
import OutfitList from "./components/outfits/OutfitList"
import OutfitPickerUI from "./components/clothing/HomePage";
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
                    <OutfitPickerUI />
                  </ProtectedRoute>
                }
              />
               <Route
                path="myClothes"
                element={
                  <ProtectedRoute>
                    <ClothingList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="myOutfits"
                element={
                  <ProtectedRoute>
                    <OutfitList />
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
