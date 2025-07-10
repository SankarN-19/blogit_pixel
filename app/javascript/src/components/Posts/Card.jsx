import React from "react";

import CategoryList from "../commons/CategoryList";

const Card = ({ post }) => {
  const { title, user, categories, created_at } = post;

  const date = new Date(created_at);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-lg border-b-2 bg-slate-50 p-4 shadow-sm">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <CategoryList categories={categories} />
      <div className="text-sm text-gray-700">
        <p className="mb-1 font-bold">{user.name}</p>
        <p className="text-xs text-gray-500">{formatted}</p>
      </div>
    </div>
  );
};

export default Card;
