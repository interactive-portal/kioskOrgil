import { useState, FC } from "react";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";

type PropsType = {
  data?: any;
  showType?: any;
  onClick?: any;
  submenu?: any;
  redirect?: boolean;
  customClass?: any;
  menuChild?: any;
  activeIndex?: any;
  setActiveIndex?: any;
  index?: any;
  setOpen?: any;
};

const MegaHelpPopover: FC<PropsType> = ({
  data,
  showType,
  onClick,
  submenu,
  redirect,
  customClass,
  menuChild,
  activeIndex,
  setActiveIndex,
  index,
  setOpen,
}) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  // let submenu() => submenu();

  const iconContent = _.startsWith(data?.icon, "storage") ? (
    <img
      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.icon}`}
      className="w-auto h-6 object-cover max-w-6"
    />
  ) : (
    <i
      className={`fa-light ${data.icon} w-6 text-center ${
        activeIndex == index ? "text-[#699BF7]" : "text-[#585858]"
      }`}
    />
  );

  return (
    <li
      className={`cursor-pointer  text-black  py-2 hover:bg-white lg:text-[14px] xs:text-[12px]  flex items-center gap-2
        ${customClass} ${activeIndex == index ? "bg-white" : "bg-transparent"}`}
      onMouseEnter={() => {
        if (submenu) {
          submenu(data);
        }
        if (setActiveIndex) {
          setActiveIndex(index);
        }
      }}
      onClick={() => {
        router.push({
          pathname: "/category",
          query: {
            fparentid: data?.id,
          },
        });
        setOpen;
      }}
    >
      {data.icon && iconContent}
      <span>
        {!redirect && (
          <span
            className={`${
              activeIndex == index ? "text-[#699BF7]" : "text-[#585858]"
            } w-[200px]`}
          >
            {data?.itemname || data?.name}
          </span>
        )}
        {redirect && (
          <Link
            href={`/category?fparentid=${data.id}`}
            className="text-[#585858] hover:text-[#699BF7]"
          >
            {data?.itemname || data?.name}
          </Link>
        )}
      </span>
    </li>
  );
};

export default MegaHelpPopover;

const EmptyStore = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center px-10 py-7 border rounded-lg border-dashed border-gray-300">
        <div className="mb-2">
          <i className="far fa-person-dolly-empty text-2xl text-gray-500" />
        </div>
        <div className="text-gray-700">Хоосон байна</div>
      </div>
    </div>
  );
};
