import React from "react";

import { useTranslation } from "react-i18next";

import Row from "./Row";

const Table = ({ blogs }) => {
  const { t } = useTranslation();

  return (
    <table className="border border-gray-200">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-2 py-2 text-slate-800">{t("posts.title")}</th>
          <th className="px-2 py-2 text-slate-800">{t("posts.category")}</th>
          <th className="px-2 py-2 text-slate-800">
            {t("posts.last_published_at")}
          </th>
          <th className="px-2 py-2 text-slate-800">{t("posts.status")}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {blogs.map(blog => (
          <Row blog={blog} key={blog.id} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
