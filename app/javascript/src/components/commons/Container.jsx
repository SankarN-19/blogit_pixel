import React, { useState } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import CategorySidebar from "../CategorySideBar";
import Sidebar from "../SideBar";

const Container = ({ children, className = "" }) => {
  const [showCategorySidebar, setShowCategorySidebar] = useState(false);

  const toggleCategorySidebar = () => {
    setShowCategorySidebar(!showCategorySidebar);
  };

  return (
    <div className="flex min-h-screen w-screen">
      <Sidebar toggleCategorySidebar={toggleCategorySidebar} />
      {showCategorySidebar && (
        <CategorySidebar
          onSelectCategory={() => {
            setShowCategorySidebar(false);
          }}
        />
      )}
      <div
        className={classnames("ml-16 flex-1 px-6 py-6", [className], {
          "ml-80": showCategorySidebar,
        })}
      >
        {children}
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
