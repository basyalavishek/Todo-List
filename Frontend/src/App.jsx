import React from "react";
import   { Toaster } from 'react-hot-toast';


import Home from "./pages/home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PageNotFound from "./pages/PageNotFound.jsx"

import { Navigate, Route, Routes } from "react-router-dom";


const App = () => {
  const token = localStorage.getItem("jwt");
  return <div >
    <Routes>
      <Route path="/" element={token?<Home/>:<Navigate to={"/login"} />}/> 
      {/* if token is in local storage then show home page otherwise navigate to login page */}

      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    <Toaster />

  </div>;
};

export default App;
