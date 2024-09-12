import { FC, useContext } from "react";
import Link from "next/link";
import { useCloud } from "@/hooks/use-cloud";
import { useSession } from "next-auth/react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

type PropsType = {
  Menu?: any;
};

const HelpTopMenu: FC<PropsType> = ({ Menu }) => {
  const { readyDatasrc, themeConfigs } = useContext(WidgetWrapperContext);
  const { data: session } = useSession();

  const cloudContext = useCloud();
  let data = Menu || [];
  return (
    <div className="hidden h-full items-center md:flex sm:flex">
      <ul className="md:grid md:grid-flow-col md:auto-cols-max">
        {data?.map((item: any, index: number) => {
          return (
            <li key={index || item?.id} className="xl:py-0 md:py-0 py-4">
              <Link
                href={"/" + item?.url}
                className="hover:text-[#699BF7] text-base font-medium cursor:pointer text-[#585858]"
              >
                <span className="px-2 "> {item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HelpTopMenu;
