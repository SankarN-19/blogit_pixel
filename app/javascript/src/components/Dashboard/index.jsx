import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { PageLoader, PageTitle, Container } from "components/commons";
import Card from "components/Posts/Card";
import { isNil, isEmpty, either } from "ramda";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
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
      <div className="flex h-screen w-screen items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <PageTitle title="Blog posts" />
      {either(isNil, isEmpty)(posts) ? (
        <div className="flex h-[80vh] items-center justify-center">
          <h1 className="text-center text-xl text-gray-600">
            You have not created or been assigned any posts 📝
          </h1>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {posts.map(post => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
