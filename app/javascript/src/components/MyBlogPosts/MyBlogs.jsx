import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { isNil, isEmpty, either } from "ramda";
import { useTranslation } from "react-i18next";

import Table from "./Table";

import { useFetchPosts } from "../../hooks/reactQuery/postsApi";
import { getFromLocalStorage } from "../../utils/storage";
import { PageLoader } from "../commons";

const MyBlogs = () => {
  const { t } = useTranslation();
  const userId = getFromLocalStorage("authUserId");

  const { data, isFetching } = useFetchPosts();
  const blogs = data?.posts?.filter(post => post.user.id === userId) || [];

  if (isFetching) {
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

  return <Table blogs={blogs} />;
};

export default MyBlogs;
