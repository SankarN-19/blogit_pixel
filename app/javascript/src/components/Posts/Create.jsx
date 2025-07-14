import React, { useState } from "react";

import { Container } from "components/commons";
import { useHistory } from "react-router-dom";

import Form from "./Form";
import Header from "./Header";

import { useFetchCategories } from "../../hooks/reactQuery/categoriesApi";
import { useCreatePost } from "../../hooks/reactQuery/postsApi";

const Create = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Draft");

  const { data } = useFetchCategories();
  const categories = data?.categories || [];

  const { mutate: createPost } = useCreatePost();

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    createPost(
      {
        title,
        description,
        category_ids: selectedCategoryIds,
        status,
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

  return (
    <Container>
      <div className="flex h-full flex-col gap-y-12">
        <Header
          handleSubmit={handleSubmit}
          setStatus={setStatus}
          status={status}
          type="create"
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

export default Create;
