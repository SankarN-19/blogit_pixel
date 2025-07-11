import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { PageLoader, Container, Button } from "components/commons";
import Card from "components/Posts/Card";
import { isNil, isEmpty, either } from "ramda";
import { Link } from "react-router-dom";

import useCategoryStore from "../../stores/useCategoryStore";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedCategories } = useCategoryStore();

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = !isEmpty(selectedCategories)
    ? posts.filter(post =>
        post.categories?.some(category =>
          selectedCategories.includes(category.id)
        )
      )
    : posts;

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Blog posts</h2>
        <Link to="/posts/create">
          <Button buttonText="Add new blog post" />
        </Link>
      </div>
      {either(isNil, isEmpty)(posts) ? (
        <div className="flex h-[80vh] items-center justify-center">
          <h1 className="text-center text-xl text-gray-600">
            You have not created or been assigned any posts 📝
          </h1>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {filteredPosts.map(post => (
            <Link key={post.id} to={`/posts/${post.slug}`}>
              <Card post={post} />
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
