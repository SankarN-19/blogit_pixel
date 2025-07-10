import React, { useState, useEffect } from "react";

import categoriesApi from "apis/categories";

const CategorySidebar = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed left-16 top-0 flex h-screen w-64 flex-col border-r bg-slate-200 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">CATEGORIES</h2>
        <div className="flex space-x-2">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setShowSearch(true)}
          >
            🔍
          </button>
          <button className="text-gray-600 hover:text-gray-800">➕</button>
        </div>
      </div>
      {showSearch && (
        <input
          autoFocus
          className="mb-4 w-full rounded-sm border border-gray-300 p-2 text-sm"
          placeholder="Search categories..."
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      )}
      <div className="flex-1 overflow-y-auto">
        {filteredCategories.map(category => (
          <div
            className="my-3 cursor-pointer rounded-sm border border-gray-600 p-2 hover:bg-gray-50"
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
