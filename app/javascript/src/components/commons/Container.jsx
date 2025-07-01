import React from "react";

import classnames from "classnames";
// import NavBar from "components/NavBar";
import PropTypes from "prop-types";

import Sidebar from "../SideBar";

const Container = ({ children, className = "" }) => (
  <div className="flex min-h-screen w-screen">
    <Sidebar />
    <div className={classnames("ml-16 flex-1 px-6 py-6", [className])}>
      {children}
    </div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
