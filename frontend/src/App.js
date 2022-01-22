import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import 'antd/dist/antd.min.css'

import LoginPage from "./components/login.component"
import SignUpPage from "./components/signup.component"

function App(){
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage/>}/>
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;