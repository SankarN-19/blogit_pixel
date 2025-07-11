import React from "react";

import { Edit, List, ListDetails } from "@bigbinary/neeto-icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ toggleCategorySidebar }) => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 flex h-screen w-16 flex-col items-center justify-between border-r bg-white py-6 shadow-sm">
      <div className="space-y-6">
        <Link to="/dashboard">
          <div className="h-6 w-6 cursor-pointer">
            <img src="https://img.icons8.com/?size=100&id=tz1GQBtNqT2P&format=png&color=000000" />
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="h-6 w-6 cursor-pointer py-6">
            <List />
          </div>
        </Link>
        <Link to="/posts/create">
          <div className="h-6 w-6 cursor-pointer pt-6">
            <Edit />
          </div>
        </Link>
        {location.pathname === "/dashboard" && (
          <div
            className="h-6 w-6 cursor-pointer py-6"
            onClick={toggleCategorySidebar}
          >
            <ListDetails />
          </div>
        )}
      </div>
      <div className="h-8 w-8 cursor-pointer">
        <img src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000" />
      </div>
    </div>
  );
};

export default Sidebar;
