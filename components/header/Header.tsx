import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header
      className="fixed top-[10px]  h-[50px] flex justify-between items-center mx-auto container
                 bg-cyan-600 text-white rounded-sm"
    >
      <Link href="/" className="px-3 h-full flex items-center border-r border-white">CrowdCoin</Link>
      <div className="h-full flex">
        <Link href="/" className="h-full flex items-center px-3 border-l border-white">Campaigns</Link>
        <Link href="/campaigns/new" className="ml-4 px-6 border-l border-white flex items-center">+</Link>
      </div>

    </header>
  );
};

export default Header;