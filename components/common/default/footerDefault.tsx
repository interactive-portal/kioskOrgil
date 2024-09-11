import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { Modal, Popover } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useToggle } from "react-use";

export default function FooterDefault() {
  const { data: session, status }: any = useSession();
  const URL = process.env.url;
  const logo = "/icon/helpLogo.png";

  return (
    <>
      {/* <div className=" w-full bg-slate-950 h-[250px]"> Default Footer</div> */}
    </>
  );
}
