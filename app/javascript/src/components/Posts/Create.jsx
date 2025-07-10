import React, { useState, useEffect } from "react";

import categoriesApi from "apis/categories";
import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";
import { useHistory } from "react-router-dom";

import Form from "./Form";

const Create = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({
        title,
        description,
        category_ids: selectedCategoryIds,
      });
      history.push("/dashboard");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex h-full flex-col gap-y-12">
        <PageTitle title="New blog post" />
        <Form
          categories={categories}
          description={description}
          handleSubmit={handleSubmit}
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
