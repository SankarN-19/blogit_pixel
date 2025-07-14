import React from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Tooltip, Typography } from "@bigbinary/neetoui";
import { PageLoader, Container } from "components/commons";
import { useParams, useHistory } from "react-router-dom";

import { useShowPost } from "../../hooks/reactQuery/postsApi";
import { getFromLocalStorage } from "../../utils/storage";
import CategoryList from "../commons/CategoryList";

const Show = () => {
  const authUserId = getFromLocalStorage("authUserId");
  const { slug } = useParams();
  const history = useHistory();

  const { data, isFetching } = useShowPost(slug);
  const post = data?.post || {};

  const updatePost = () => {
    history.push(`/posts/${post.slug}/edit`);
  };

  if (isFetching) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  const date = new Date(post.updated_at);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Container className="max-h-screen w-full">
      <div className="flex flex-col gap-y-4 pt-4">
        <div className="flex flex-col gap-y-2">
          <CategoryList categories={post.categories} />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Typography className="text-2xl font-semibold">
                {post.title}
              </Typography>
              <div>
                {post.status === "Draft" && (
                  <div className="rounded-xl border-2 border-red-600 px-2 text-xs font-semibold text-red-600">
                    Draft
                  </div>
                )}
              </div>
            </div>
            {post.user.id === authUserId && (
              <Tooltip content="Edit" position="top">
                <div>
                  <Edit onClick={updatePost} />
                </div>
              </Tooltip>
            )}
          </div>
          <div className="flex items-center gap-3">
            <img
              alt="Not found"
              className="h-9 w-9 rounded-full"
              src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
            />
            <div className="flex flex-col">
              <Typography className="text-sm font-semibold text-gray-800">
                {post.user.name}
              </Typography>
              <Typography className="text-xs text-gray-500">
                {formattedDate}
              </Typography>
            </div>
          </div>
          <pre className="whitespace-break-spaces font-sans">
            {post.description}
          </pre>
        </div>
      </div>
    </Container>
  );
};

export default Show;
