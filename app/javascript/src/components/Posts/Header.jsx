import React, { useEffect, useRef, useState } from "react";

import { Check, ExternalLink, MenuHorizontal } from "@bigbinary/neeto-icons";
import { Button, ActionDropdown, Tooltip } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { Link, useParams, useHistory } from "react-router-dom";

import postsApi from "../../apis/posts";
import { PageTitle } from "../commons";

const Header = ({
  type,
  status,
  setStatus,
  handleSubmit,
  savedStatus,
  updatedTime = "",
}) => {
  const { t } = useTranslation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef();
  const { slug } = useParams();
  const history = useHistory();
  const {
    Menu,
    MenuItem: { Button: MenuButton },
  } = ActionDropdown;

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const destroyPost = async () => {
    try {
      await postsApi.destroy(slug);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex items-end justify-between">
      <PageTitle
        title={type === "create" ? "New blog post" : "Edit blog post"}
      />
      <div className="flex items-center gap-3 text-xs">
        {type === "edit" && (
          <span>
            {savedStatus === "Draft" ? "Draft saved at " : "Published on "}
            {updatedTime &&
              new Date(updatedTime).toLocaleString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
          </span>
        )}
        {type === "edit" && (
          <Link to={`/posts/${slug}`}>
            <Tooltip content="Preview" position="top">
              <div>
                <ExternalLink className="h-7 w-7 cursor-pointer text-gray-600 hover:text-blue-600" />
              </div>
            </Tooltip>
          </Link>
        )}
        <Link to="/">
          <Button className="bg-gray-200" label="Cancel" style="Secondary" />
        </Link>
        <ActionDropdown
          className="neetix-actiondropdown"
          label={status === "Draft" ? "Save as draft" : "Publish"}
          buttonProps={{
            className: "neetix-button--primary",
          }}
          dropdownProps={{
            buttonProps: {
              className: "neetix-button--primary",
            },
          }}
          onClick={handleSubmit}
        >
          <Menu>
            <MenuButton onClick={() => setStatus("Draft")}>
              <span className="inline-block w-4 text-left">
                {status === "Draft" && <Check />}
              </span>
              {t("posts.save_draft")}
            </MenuButton>
            <MenuButton onClick={() => setStatus("Published")}>
              <span className="inline-block w-4 text-left">
                {status === "Published" && <Check />}
              </span>
              {t("posts.publish")}
            </MenuButton>
          </Menu>
        </ActionDropdown>
        {type === "edit" && (
          <div
            className="relative cursor-pointer text-lg"
            ref={menuRef}
            onClick={() => setIsMenuVisible(prev => !prev)}
          >
            <MenuHorizontal />
            {isMenuVisible && (
              <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-gray-300 bg-white py-1 shadow-xl">
                <Link
                  className="block cursor-pointer px-3 py-1.5 text-sm text-red-500 hover:bg-gray-100"
                  onClick={destroyPost}
                >
                  {t("posts.delete")}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
