import React from "react";

import Dashboard from "components/Dashboard";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CreatePost, ShowPost } from "./components/Posts";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact path="/" render={() => <div>Home</div>} />
      <Route exact component={Dashboard} path="/dashboard" />
      <Route exact component={CreatePost} path="/posts/create" />
      <Route exact component={ShowPost} path="/posts/:slug" />
    </Switch>
  </Router>
);

export default App;
