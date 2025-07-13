import React from "react";

import Dashboard from "components/Dashboard";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "utils/storage";

import { Login, Signup } from "./components/Authentication";
import PrivateRoute from "./components/commons/PrivateRoute";
import MyBlogPosts from "./components/MyBlogPosts";
import { CreatePost, EditPost, ShowPost } from "./components/Posts";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={MyBlogPosts} path="/my-blogs" />
        <Route exact component={EditPost} path="/posts/:slug/edit" />
        <Route exact component={CreatePost} path="/posts/create" />
        <Route exact component={ShowPost} path="/posts/:slug" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;
