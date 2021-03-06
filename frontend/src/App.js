import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import 'antd/dist/antd.min.css'
import axios from "axios"
import history from "./services/history"

import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
import DashboardLayout from './layouts/dashboard';
import Page404 from "./pages/Page404"

import ProtectedRoute from "./SpecialRoutes/ProtectedRoute"
import UnauthenticatedRoute from "./SpecialRoutes/UnauthenticatedRoute"
import TypeProtectedRoute from "./SpecialRoutes/TypeProtectedRoute"


import LoginPage from "./pages/login.component"
import SignUpPage from "./pages/signup.component"
import VendorDashboard from "./pages/Vendor/Dashboard"
import CustomerDashboard from "./pages/Customer/Dashboard"
import { Navigate } from "react-router"
import VendorProducts from "./pages/Vendor/Products"
import CustomerProducts from "./pages/Customer/Products"
import VendorProfile from "./pages/Vendor/Profile"
import CustomerProfile from "./pages/Customer/Profile"

axios.defaults.baseURL = '/api'

function App(){
  return (
    <ThemeConfig>
      <GlobalStyles/>
      <Router history={history}>
        <Routes>
            <Route exact path="/" element={<Navigate replace to="/dashboard/app"/>}/>
            <Route exact path="/home" element={<Navigate replace to="/dashboard/app"/>}/>
            <Route exact path="/login" element={<UnauthenticatedRoute><LoginPage/></UnauthenticatedRoute>}/>
            <Route exact path="/signup" element={<UnauthenticatedRoute><SignUpPage/></UnauthenticatedRoute>}/>
            <Route exact path='/dashboard/app' element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TypeProtectedRoute VendorComponent={<VendorDashboard/>} CustomerComponent={<CustomerDashboard/>}/>
                </DashboardLayout>
              </ProtectedRoute>
            }/>
            <Route exact path='/dashboard/products' element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TypeProtectedRoute VendorComponent={<VendorProducts/>} CustomerComponent={<CustomerProducts/>}/>
                </DashboardLayout>
              </ProtectedRoute>
            }/>
            <Route exact path='/dashboard/user' element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TypeProtectedRoute VendorComponent={<VendorProfile/>} CustomerComponent={<CustomerProfile/>}/>
                </DashboardLayout>
              </ProtectedRoute>
            }/>
            <Route path='*' element = {<Page404/>}/>
        </Routes>
      </Router>
    </ThemeConfig>
  );
}

export default App;