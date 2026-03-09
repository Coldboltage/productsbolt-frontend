import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoMdList } from "react-icons/io";

const BreadCrumbs = (props: {
  breadcrumbElements: { link: string; text: string }[];
}) => {
  const breadcrumbGap = 2;
  const mdBreadcumbGap = 2;

  return (
    <div
      className={`mb-4 flex items-center gap-${breadcrumbGap} md:gap-${mdBreadcumbGap} text-[10px] md:text-[12px] text-slate-300`}
    >
      <Link href={`/brand`} className="hover:text-white">
        <IoMdList size={16} />
      </Link>
      {props.breadcrumbElements.map(
        (element: { link: string; text: string }, index: number) => {
          const last = index === props.breadcrumbElements.length - 1;

          return (
            <div
              key={`${element}-${index}`}
              className={`flex items-center gap-${breadcrumbGap} md:gap-${mdBreadcumbGap}`}
            >
              {!last ? (
                <>
                  <FaChevronRight size={16} />
                  <Link
                    href={`/${element.link}`}
                    className={`hover:text-white leading-none`}
                  >
                    {element.text}
                  </Link>
                </>
              ) : (
                <>
                  <FaChevronRight size={16} />
                  <p className={`text-gray-300/80 leading-none`}>
                    {element.text}
                  </p>
                </>
              )}
            </div>
          );
        },
      )}
      {/* <FaChevronRight />
      <Link
        href={`/${props.products.productUrlSafeName}`}
        className="hover:text-white"
      >
        {props.products.productBrand}
      </Link>{" "}
      <FaChevronRight />
      <p className="text-gray-300/80 disable">
        {props.products.productName}
      </p>{" "} */}
    </div>
  );
};

export default BreadCrumbs;
