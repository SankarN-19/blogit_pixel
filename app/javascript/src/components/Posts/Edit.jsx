import React, { useState, useEffect } from "react";

import categoriesApi from "apis/categories";
import postsApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import { useParams, useHistory } from "react-router-dom";

import Form from "./Form";
import Header from "./Header";

const Edit = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [updatedTime, setUpdatedTime] = useState("");
  const [status, setStatus] = useState("Draft");
  const [savedStatus, setSavedStatus] = useState("Draft");

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setTitle(post.title);
      setDescription(post.description);
      setSelectedCategoryIds(
        post.categories?.map(category => category.id) || []
      );
      setStatus(post.status);
      setSavedStatus(post.status);
      setUpdatedTime(post.updated_at);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchPostDetails(), fetchCategories()]);
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.update({
        slug,
        payload: {
          title,
          description,
          category_ids: selectedCategoryIds,
          status,
        },
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
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
