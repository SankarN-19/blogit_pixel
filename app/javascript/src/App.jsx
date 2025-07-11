import React from "react";

import Dashboard from "components/Dashboard";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "utils/storage";

import { Login, Signup } from "./components/Authentication";
import PrivateRoute from "./components/commons/PrivateRoute";
import { CreatePost, ShowPost } from "./components/Posts";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact component={Dashboard} path="/dashboard" />
        <Route exact component={CreatePost} path="/posts/create" />
        <Route exact component={ShowPost} path="/posts/:slug" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path="/dashboard"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;
