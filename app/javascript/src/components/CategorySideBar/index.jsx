import React, { useState } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Modal, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import {
  useCreateCategory,
  useFetchCategories,
} from "../../hooks/reactQuery/categoriesApi";
import useDebounce from "../../hooks/useDebounce";
import useCategoryStore from "../../stores/useCategoryStore";
import { Button, Input } from "../commons";

const CategorySidebar = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const { selectedCategories, toggleCategory } = useCategoryStore();

  const debouncedSearchTerm = useDebounce(searchTerm);

  const { mutate: createCategory } = useCreateCategory();
  const { data } = useFetchCategories();
  const categories = data?.categories || [];

  const createCategoryHandler = () => {
    createCategory({ category: { name: categoryTitle } });
    setShowCreateCategoryModal(false);
    setCategoryTitle("");
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="fixed left-16 top-0 flex h-screen w-64 flex-col border-r bg-slate-200 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <Typography className="text-lg font-semibold">
          {t("categories.title")}
        </Typography>
        <div className="flex space-x-2">
          <Search
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setShowSearch(true)}
          />
          <Plus
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setShowCreateCategoryModal(prev => !prev)}
          />
        </div>
      </div>
      {showSearch && (
        <Input
          className="mb-4 w-full rounded-sm border border-gray-300 p-2 text-sm"
          placeholder="Search categories..."
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      )}
      <div className="list flex-1 overflow-y-auto">
        {filteredCategories.map(category => (
          <div
            key={category.id}
            className={`my-3 cursor-pointer rounded-sm border border-gray-600 p-2 hover:bg-gray-50 ${
              selectedCategories.includes(category.id) ? "bg-white" : ""
            }`}
            onClick={() => toggleCategory(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <Modal
        closeButton
        closeOnOutsideClick
        className="card flex flex-col justify-evenly gap-4 rounded-md bg-white px-4 py-5 shadow-lg"
        isOpen={showCreateCategoryModal}
        size="small"
        onClose={() => setShowCreateCategoryModal(false)}
      >
        <Typography style="h1">{t("categories.new")}</Typography>
        <Input
          label="Category title"
          placeholder="Enter title"
          value={categoryTitle}
          onChange={event => setCategoryTitle(event.target.value)}
        />
        <div className="flex gap-4 ">
          <Button buttonText="Add" onClick={createCategoryHandler} />
          <Button
            buttonText="Cancel"
            style="secondary"
            onClick={() => setShowCreateCategoryModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CategorySidebar;
