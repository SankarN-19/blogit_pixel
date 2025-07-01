import React from "react";

import classnames from "classnames";
// import NavBar from "components/NavBar";
import PropTypes from "prop-types";

import Sidebar from "../SideBar";

const Container = ({ children, className = "" }) => (
  <>
    <Sidebar />
    <div className={classnames("mx-auto max-w-6xl px-6", [className])}>
      {children}
    </div>
  </>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
