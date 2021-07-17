import React from "react";
import { Switch, Route, Router, Redirect } from "wouter";

import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Intro} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/quiz/:index">{(params) => <Quiz quizIndex={params.index} />}</Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default Routes;
