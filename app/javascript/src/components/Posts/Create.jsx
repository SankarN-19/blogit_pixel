import React, { useState } from "react";

import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";
import { useHistory } from "react-router-dom";

import Form from "./Form";

const Create = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({ title, description });
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
          description={description}
          handleSubmit={handleSubmit}
          loading={loading}
          setDescription={setDescription}
          setTitle={setTitle}
          title={title}
        />
      </div>
    </Container>
  );
};

export default Create;
