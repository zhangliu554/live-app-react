import React from 'react'
import { BrowserRouter as Router ,Route  } from "react-router-dom";
import Step from "./pages/Step";
import Login from "./pages/Login";
import Privacy from "./components/UserAgreement/Privacy";
import Agreement from "./components/UserAgreement/Agreement";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
export default function App() {
  return  (
      <Router>
        <Route exact={true} path={'/'} component={Step}/>
        <Route path={'/welcome'} component={Welcome}/>
        <Route path={'/login'} component={Login}/>
        <Route path={'/register'} component={Register}/>
        <Route path={'/privacy'} component={Privacy}/>
        <Route path={'/agreement'} component={Agreement}/>
      </Router>
  )
}
