import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin/Signin";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Signin />} /> */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
