import React from "react";

import { Typography } from "@bigbinary/neetoui";

import CategoryList from "../commons/CategoryList";

const Card = ({ post }) => {
  const { title, user, categories, updated_at } = post;

  const date = new Date(updated_at);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-lg border-b-2 bg-slate-50 p-4 shadow-sm">
      <Typography className="mb-2 text-xl font-bold">{title}</Typography>
      <CategoryList categories={categories} />
      <div className="text-sm text-gray-700">
        <Typography className="mb-1 text-xs font-semibold">
          {user.name}
        </Typography>
        <Typography className="text-xs text-gray-500">{formatted}</Typography>
      </div>
    </div>
  );
};

export default Card;
