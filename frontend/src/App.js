import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import 'antd/dist/antd.min.css'
import axios from "axios"
import history from "./services/history"

import ProtectedRoute from "./SpecialRoutes/ProtectedRoute"
import UnauthenticatedRoute from "./SpecialRoutes/UnauthenticatedRoute"

import LoginPage from "./components/login.component"
import SignUpPage from "./components/signup.component"
import { Navigate } from "react-router"
import Home from "./components/home.component"

axios.defaults.baseURL = 'http://localhost:27017'

function App(){
  return (
    <Router history={history}>
      <Routes>
          <Route exact path="/" element={<Navigate replace to="/home"/>}/>
          <Route exact path="/login" element={<UnauthenticatedRoute><LoginPage/></UnauthenticatedRoute>}/>
          <Route exact path="/signup" element={<UnauthenticatedRoute><SignUpPage/></UnauthenticatedRoute>}/>
          <Route exact path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;