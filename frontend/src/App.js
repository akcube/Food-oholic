import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


import LoginPage from "./components/login.component"

function App(){
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage/>}/>
        <Route exact path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;