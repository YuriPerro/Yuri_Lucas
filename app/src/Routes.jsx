import React from "react";
import { Switch, Route, Router, Redirect } from "wouter";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/quiz/:id">{(params) => <Quiz quizId={params.id} />}</Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default Routes;
