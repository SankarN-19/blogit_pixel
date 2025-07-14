import React, { useState, useEffect } from "react";

import { Container, PageLoader } from "components/commons";
import { useParams, useHistory } from "react-router-dom";

import Form from "./Form";
import Header from "./Header";

import { useFetchCategories } from "../../hooks/reactQuery/categoriesApi";
import { useShowPost, useUpdatePost } from "../../hooks/reactQuery/postsApi";

const Edit = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedTime, setUpdatedTime] = useState("");
  const [status, setStatus] = useState("Draft");
  const [savedStatus, setSavedStatus] = useState("Draft");

  const { data, isFetching } = useShowPost(slug);
  useEffect(() => {
    if (data) {
      const post = data.post;
      setTitle(post.title);
      setDescription(post.description);
      setSelectedCategoryIds(
        post.categories?.map(category => category.id) || []
      );
      setStatus(post.status);
      setSavedStatus(post.status);
      setUpdatedTime(post.updated_at);
    }
  }, [data]);

  const { mutate: updatePost } = useUpdatePost();

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);

    updatePost(
      {
        slug,
        payload: {
          title,
          description,
          category_ids: selectedCategoryIds,
          status,
        },
      },
      {
        onSuccess: () => {
          setLoading(false);
          history.push("/");
        },
        onError: error => {
          setLoading(false);
          logger.error(error);
        },
      }
    );
  };

  const { data: categoryData } = useFetchCategories();
  const categories = categoryData?.categories || [];

  if (isFetching) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex h-full flex-col gap-y-12">
        <Header
          handleSubmit={handleSubmit}
          savedStatus={savedStatus}
          setStatus={setStatus}
          status={status}
          type="edit"
          updatedTime={updatedTime}
        />
        <Form
          categories={categories}
          description={description}
          loading={loading}
          selectedCategoryIds={selectedCategoryIds}
          setDescription={setDescription}
          setSelectedCategoryIds={setSelectedCategoryIds}
          setTitle={setTitle}
          title={title}
        />
      </div>
    </Container>
  );
};

export default Edit;
