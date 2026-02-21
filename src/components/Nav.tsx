import Link from "next/link";
import Image from "next/image";
import { FaHome } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className={`grid grid-cols-2 p-5 justify-between`}>
      <div className={`flex gap-10`}>
        <Link className="border-line" href="/">
          <FaHome className="text-2xl" />
        </Link>
        <Link className="border-line" href="/magic-the-gathering">
          <div className="flex gap-2">
            <Image src="/mtg.png" alt="Logo" width={24} height={24} />
            <span className="text-sm"> Magic the Gathering</span>
          </div>
        </Link>
        <Link className="border-line" href="/riftbound">
          <div className="flex gap-2">
            <Image src="/riftlogo.png" alt="Logo" width={64} height={64} />
            <span className="text-sm"> Riftbound</span>
          </div>
        </Link>
      </div>
      <div className={`flex justify-end`}>
        <Link href="/" className="border-line">
          Menu
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
