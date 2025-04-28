import React from "react";


import Home from "./pages/home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PageNotFound from "./pages/PageNotFound.jsx"

import { Route, Routes } from "react-router-dom";


const App = () => {
  return <div >
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  </div>;
};

export default App;
