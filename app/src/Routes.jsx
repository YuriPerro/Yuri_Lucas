import React from "react";
import { Switch, Route, Router, Redirect } from "wouter";
import { useStore } from "./store";

import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import LoadingView from "./components/LoadingView";
import Profile from "./pages/Profile";

function Routes() {
  const { isLoading } = useStore();

  return (
    <Router>
      <LoadingView isLoading={isLoading} />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/create-quiz" component={CreateQuiz} />
        <Route path="/quiz/:id">{(params) => <Quiz quizId={params.id} />}</Route>
        <Route path="/" component={Intro} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

// Adicionar rotas privadas
/*
{
  !!user ? (
    <>
      <Route path="/home" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create-quiz" component={CreateQuiz} />
      <Route path="/quiz/:index">{(params) => <Quiz quizIndex={params.index} />}</Route>
    </>
  ) : (
    <>
      <Route path="/" component={Intro} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </>
  );
}
*/

export default Routes;
