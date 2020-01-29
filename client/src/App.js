import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/css/nucleo-icons.css";
// import "./assets/scss/blk-design-system-react.scss?v=1.0.0";
import "./assets/css/blk-design-system-react.css";

import LandingPage from "./views/LandingPage.jsx";
import About from "./views/About";
import Activate from "./views/Activate";

function App() {
  return (  
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/activate">
          <Activate />
        </Route>
        <Route path="/withdraw">
          <Activate />
        </Route>
        <Route path="/deposit">
          <Activate />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export { App }