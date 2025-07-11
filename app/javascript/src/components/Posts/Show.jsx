import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { PageLoader, Container } from "components/commons";
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
      logger.error(error);
      history.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) return <PageLoader />;

  const date = new Date(post.created_at);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Container>
      <div className="flex flex-col gap-y-2 pt-2">
        <CategoryList categories={post.categories} />
        <Typography className="text-2xl font-semibold">{post.title}</Typography>
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
    </Container>
  );
};

export default Show;
