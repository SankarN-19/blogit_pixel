import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { isNil, isEmpty, either } from "ramda";
import { useTranslation } from "react-i18next";

import Table from "./Table";

import postsApi from "../../apis/posts";
import { getFromLocalStorage } from "../../utils/storage";
import { PageLoader } from "../commons";

const MyBlogs = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = getFromLocalStorage("authUserId");

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setBlogs(posts.filter(post => post.user.id === userId));
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(blogs)) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Typography className="text-center text-xl text-gray-600">
          {t("posts.no_posts")}
        </Typography>
      </div>
    );
  }

  return <Table blogs={blogs} fetchPosts={fetchPosts} />;
};

export default MyBlogs;
