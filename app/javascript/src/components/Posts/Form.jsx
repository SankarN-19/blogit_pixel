import React from "react";

import { Button, Input } from "components/commons";

const Form = ({
  title,
  setTitle,
  description,
  setDescription,
  handleSubmit,
  loading,
}) => (
  <form className="h-full w-full" onSubmit={handleSubmit}>
    <div className="flex h-full flex-col justify-between rounded-md border p-6 shadow">
      <div className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800">
            Description
          </label>
          <textarea
            required
            className="mt-1 rounded-md border border-gray-300 p-2 text-sm"
            placeholder="Enter description"
            rows="5"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 self-end">
        <Button buttonText="Submit" loading={loading} type="submit" />
        <Button
          buttonText="Cancel"
          style="secondary"
          onClick={() => history.back()}
        />
      </div>
    </div>
  </form>
);

export default Form;
