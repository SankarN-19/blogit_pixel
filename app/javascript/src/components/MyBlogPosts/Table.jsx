import React from "react";

import Row from "./Row";

const Table = ({ blogs, fetchPosts }) => (
  <table className="border border-gray-200">
    <thead>
      <tr className="bg-gray-100 text-left">
        <th className="px-2 py-2 text-slate-800">TITLE</th>
        <th className="px-2 py-2 text-slate-800">CATEGORY</th>
        <th className="px-2 py-2 text-slate-800">LAST PUBLISHED AT</th>
        <th className="px-2 py-2 text-slate-800">STATUS</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {blogs.map(blog => (
        <Row blog={blog} fetchPosts={fetchPosts} key={blog.id} />
      ))}
    </tbody>
  </table>
);

export default Table;
