import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { PageLoader, Container, Button } from "components/commons";
import Card from "components/Posts/Card";
import { isNil, isEmpty, either } from "ramda";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useFetchPosts } from "../../hooks/reactQuery/postsApi";
import useCategoryStore from "../../stores/useCategoryStore";

const Dashboard = () => {
  const { t } = useTranslation();
  const { selectedCategories } = useCategoryStore();

  const { data, isFetching } = useFetchPosts();
  const posts = data?.posts || [];

  const filteredPosts = !isEmpty(selectedCategories)
    ? posts.filter(post =>
        post.categories?.some(category =>
          selectedCategories.includes(category.id)
        )
      )
    : posts;

  if (isFetching) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Typography className="text-3xl font-semibold">
          {t("posts.blog_posts")}
        </Typography>
        <Link to="/posts/create">
          <Button buttonText="Add new blog post" />
        </Link>
      </div>
      {either(isNil, isEmpty)(posts) ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Typography className="text-center text-xl text-gray-600">
            {t("posts.no_posts")}
          </Typography>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {filteredPosts
            ?.filter(post => post.status === "Published")
            .map(post => (
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
