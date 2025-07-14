import React, { useRef } from "react";

import {
  Edit,
  LeftArrow,
  Folder,
  List,
  ListDetails,
} from "@bigbinary/neeto-icons";
import { Popover, Typography } from "@bigbinary/neetoui";
import { Link, useLocation } from "react-router-dom";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";

const Sidebar = ({ toggleCategorySidebar }) => {
  const location = useLocation();
  const profileRef = useRef(null);
  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail");

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/login";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-16 flex-col items-center justify-between border-r bg-white py-6 shadow-sm">
      <div className="flex flex-col items-center gap-6">
        <Link to="/">
          <div className="h-6 w-6 cursor-pointer">
            <img src="https://img.icons8.com/?size=100&id=tz1GQBtNqT2P&format=png&color=000000" />
          </div>
        </Link>
        <Link to="/">
          <div
            className={`h-6 w-6 cursor-pointer ${
              location.pathname === "/" ? "text-blue-600" : "text-black"
            }`}
          >
            <List />
          </div>
        </Link>
        <Link to="/posts/create">
          <div
            className={`h-6 w-6 cursor-pointer rounded p-1 ${
              location.pathname === "/posts/create"
                ? "text-blue-600"
                : "text-black"
            }`}
          >
            <Edit />
          </div>
        </Link>
        {location.pathname === "/" && (
          <div
            className="h-6 w-6 cursor-pointer"
            onClick={toggleCategorySidebar}
          >
            <ListDetails />
          </div>
        )}
        <Link to="/my-blogs">
          <div
            className={`h-6 w-6 cursor-pointer ${
              location.pathname === "/my-blogs" ? "text-blue-600" : "text-black"
            }`}
          >
            <Folder />
          </div>
        </Link>
      </div>
      <div className="relative">
        <img
          alt="profile"
          className="h-8 w-8 rounded-full border"
          ref={profileRef}
          src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
        />
        <Popover className="w-56 py-1" position="right" reference={profileRef}>
          <div className="p-2">
            <div className="border-b pb-2">
              <div className="flex items-center gap-3">
                <img
                  alt="Not found"
                  className="h-10 w-10 rounded-full"
                  src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                />
                <div className="flex flex-col">
                  <Typography className="font-semibold">{userName}</Typography>
                  <Typography className="text-sm text-gray-600">
                    {userEmail}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <LeftArrow className="h-6 w-6 cursor-pointer" />
              <div
                className="cursor-pointer text-[15px] font-semibold"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
