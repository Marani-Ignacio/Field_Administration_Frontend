import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Fields from "./pages/Fields";
import MyFields from "./pages/MyFields";
import Add_Edit_Fields from "./pages/Add-Edit-Field";
import AdminSeeds from "./pages/AdminSeeds";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config/firebase";
import Layout from "./components/Layout";
import FieldCard from "./components/FieldCard";
import SeedCard from "./components/SeedCard";
import Add_Edit_Seeds from "./pages/Add-Edit-Seed";
import Seeds from "./pages/Seeds";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        auth.currentUser
          ?.getIdToken()
          .then((token) => localStorage.setItem("token", token));
        setUser(user);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/fields" element={<Fields />} />
          <Route path="/seeds" element={<Seeds />} />
          <Route
            path="/myfields"
            element={
              <ProtectedRoute user={user}>
                <MyFields />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addField"
            element={
              <ProtectedRoute user={user}>
                <Add_Edit_Fields />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editField/:id"
            element={
              <ProtectedRoute user={user}>
                <Add_Edit_Fields />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Field/:id"
            element={
              <ProtectedRoute user={user}>
                <FieldCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminSeeds"
            element={
              <ProtectedRoute user={user}>
                <AdminSeeds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addSeed"
            element={
              <ProtectedRoute user={user}>
                <Add_Edit_Seeds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editSeed/:id"
            element={
              <ProtectedRoute user={user}>
                <Add_Edit_Seeds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Seed/:id"
            element={
              <ProtectedRoute user={user}>
                <SeedCard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
