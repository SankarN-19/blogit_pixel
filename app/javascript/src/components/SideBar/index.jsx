import React from "react";

const Sidebar = () => (
  <div className="fixed left-0 top-0 flex h-screen w-16 flex-col items-center justify-between border-r bg-white py-6 shadow-sm">
    <div className="space-y-6">
      <div className="h-6 w-6 cursor-pointer">
        <img src="https://img.icons8.com/?size=100&id=tz1GQBtNqT2P&format=png&color=000000" />
      </div>
      <div className="h-6 w-6 cursor-pointer">
        <img src="https://img.icons8.com/?size=100&id=OTxpMqWbm71F&format=png&color=000000" />
      </div>
    </div>
    <div className="h-8 w-8 cursor-pointer">
      <img src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000" />
    </div>
  </div>
);

export default Sidebar;
