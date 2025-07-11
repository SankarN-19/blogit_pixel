import React, { useEffect, useState } from "react";

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
      <div className="flex flex-col gap-y-6 pt-6">
        <CategoryList categories={post.categories} />
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {post.user.name}
          </p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        <p className="text-lg">{post.description}</p>
      </div>
    </Container>
  );
};

export default Show;
