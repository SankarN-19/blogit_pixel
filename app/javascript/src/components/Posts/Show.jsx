import React, { useEffect, useState } from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Tooltip, Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { PageLoader, Container } from "components/commons";
import Logger from "js-logger";
import { useParams, useHistory } from "react-router-dom";

import CategoryList from "../commons/CategoryList";

const Show = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
    } catch (error) {
      Logger.error(error);
      history.push("/");
    } finally {
      setLoading(false);
    }
  };

  const updatePost = () => {
    history.push(`/posts/${post.slug}/edit`);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) return <PageLoader />;

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
            <Tooltip content="Edit" position="top">
              <div>
                <Edit onClick={updatePost} />
              </div>
            </Tooltip>
          </div>
          <div>
            <Typography className="text-sm font-semibold text-gray-800">
              {post.user.name}
            </Typography>
            <Typography className="text-xs text-gray-500">
              {formattedDate}
            </Typography>
          </div>
          <Typography className="text-sm">{post.description}</Typography>
        </div>
      </div>
    </Container>
  );
};

export default Show;
