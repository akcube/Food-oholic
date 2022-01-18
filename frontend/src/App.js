import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"

import LoginPage from "./components/login.component.js"

function App(){
  return (
    <Router>
      <Route path="/" exact component={LoginPage}/>
      <Route path="/login" component={LoginPage}/>
    </Router>
  );
}

export default App;