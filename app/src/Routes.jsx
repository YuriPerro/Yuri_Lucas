import React from "react";
import { Switch, Route, Router, Redirect } from "wouter";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Intro from "./pages/Intro";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Intro} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/quiz/:index">{(params) => <Quiz quizIndex={params.index} />}</Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default Routes;
