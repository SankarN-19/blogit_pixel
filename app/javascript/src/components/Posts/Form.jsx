import React from "react";

import { Input } from "components/commons";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const Form = ({
  title,
  setTitle,
  description,
  setDescription,
  selectedCategoryIds,
  setSelectedCategoryIds,
  categories,
}) => {
  const { t } = useTranslation();
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  const selectedOptions = categoryOptions.filter(option =>
    selectedCategoryIds.includes(option.value)
  );

  const handleCategoryChange = selectedOptions => {
    const ids = selectedOptions.map(option => option.value);
    setSelectedCategoryIds(ids);
  };

  return (
    <form className="h-full w-full">
      <div className="flex h-full flex-col justify-between rounded-md border p-6 shadow">
        <div className="flex flex-col gap-4">
          <Input
            label="Title*"
            placeholder="Enter title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-800">
              {t("categories.category_label")}
            </label>
            <Select
              isMulti
              className="text-sm"
              classNamePrefix="react-select"
              options={categoryOptions}
              placeholder="Search category"
              value={selectedOptions}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">
              {t("posts.description_label")}
            </label>
            <textarea
              required
              className="mt-1 rounded-md border border-gray-300 p-2 text-sm"
              placeholder="Enter description"
              rows="5"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
