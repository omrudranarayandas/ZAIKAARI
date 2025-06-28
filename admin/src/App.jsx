import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Update from "./pages/Update/Update";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const passcode = localStorage.getItem("passcode");
    if (passcode === "TAYLORSWIFT13") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      alert("Unauthorized access. Please enter the correct passcode.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Slide
      />{" "}
      {isAuthorized ? (
        <>
          <Navbar />
          <hr />
          <div className="app-content">
            <Sidebar />
            <div className="inner-body">
              <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/users" element={<User />} />
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/update/:id" element={<Update />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
