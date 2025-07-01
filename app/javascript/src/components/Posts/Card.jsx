import React from "react";

const Card = ({ post }) => {
  const { title, description, created_at } = post;
  const isoDate = created_at;
  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-lg border-b-2 bg-slate-50 p-4 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-2 line-clamp-2 text-sm text-gray-700">{description}</p>
      <p className="text-xs text-gray-500">{formatted}</p>
    </div>
  );
};

export default Card;
