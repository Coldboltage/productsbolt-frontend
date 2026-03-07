import Link from "next/link";
import Image from "next/image";
import { FaHome } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className={`grid grid-cols-3 p-5 md:px-8 justify-between`}>
      <div className={`flex gap-2 md:gap-5 items-center col-span-3`}>
        <Link className="pr-3 border-line" href="/">
          <FaHome className="h-5 w-auto md:h-5" size={28} />{" "}
        </Link>
        <Link className="border-line pl-2 pr-2" href="/magic-the-gathering">
          <div className="flex flex-col gap-2 items-center ">
            <Image
              className="h-5 w-auto md:h-5"
              src="/mtg.png"
              alt="Magic the Gathering clickable logo"
              width={32}
              height={32}
            />
            {/* <span className="hidden md:block md:text-xs">
              Magic the Gathering
            </span> */}
          </div>
        </Link>
        <Link className="border-line pl-2 pr-2" href="/riftbound">
          <div className="flex flex-col gap-2 items-center">
            <Image
              className="h-5 w-auto md:h-5"
              src="/riftlogo.png"
              alt="Riftbound clickable logo"
              width={64}
              height={64}
            />
            {/* <span className="hidden md:block md:text-xs">Riftbound</span> */}
          </div>
        </Link>
        <Link className="border-line pl-2 pr-2" href="/pokemon">
          <div className="flex flex-col gap-2 items-center">
            <Image
              className="h-5 w-auto md:h-5"
              src="/pokemon.png"
              alt="Pokemon clickable logo"
              width={64}
              height={64}
            />
            {/* <span className="hidden md:block md:text-xs">Pokemon</span> */}
          </div>
        </Link>

        <Link className="border-line pl-2 pr-2" href="/one-piece">
          <div className="flex flex-col gap-2 items-center">
            <Image
              className="h-5 w-auto md:h-5"
              src="/one-piece.png"
              alt="Pokemon clickable logo"
              width={64}
              height={64}
            />
            {/* <span className="hidden md:block md:text-xs">Pokemon</span> */}
          </div>
        </Link>
      </div>
      {/* <div className={`flex justify-end items-center`}>
        <Link href="/" className="border-line">
          Menu
        </Link>
      </div> */}
    </nav>
  );
};

export default Nav;
