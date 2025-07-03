import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { PageLoader, Container } from "components/commons";
import { useParams, useHistory } from "react-router-dom";

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
      history.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <Container>
      <div className="flex flex-col gap-y-6 pt-6">
        <h1 className="text-4xl font-semibold">{post.title}</h1>
        <p className="text-lg">{post.description}</p>
      </div>
    </Container>
  );
};

export default Show;
