import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import 'antd/dist/antd.min.css'
import axios from "axios"
import history from "./services/history"

import LoginPage from "./components/login.component"
import SignUpPage from "./components/signup.component"

axios.defaults.baseURL = 'http://localhost:27017'

function App(){
  return (
    <Router history={history}>
      <Routes>
          <Route exact path="/" element={<LoginPage/>}/>
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;