import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className={`grid grid-cols-2 p-5 justify-between`}>
      <div className={`flex gap-10`}>
        <Link className="border-line" href="/">
          Home
        </Link>
        <Link className="border-line" href="/magic-the-gathering">
          Magic the Gathering
        </Link>
        <Link href="/riftbound">Riftbound</Link>
      </div>
      <Link href="/" className={`flex justify-end`}>
        Menu
      </Link>
    </nav>
  );
};

export default Nav;
