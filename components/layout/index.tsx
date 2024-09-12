import { Suspense } from "react";
import Head from "next/head";
import Image from "next/image";
import useSWR, { SWRConfig } from "swr";
import { FC } from "react";
import _ from "lodash";
import type { GetServerSideProps } from "next";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import useWidgetData from "../common/engineBox/util/useWidgetData";

type LayoutProps = {
  children?: any;
};

export default function Layout({ children }: LayoutProps) {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  const { props } = children;

  const isHeader = _.isEmpty(children.props) ? true : false;
  // console.log("children.props :>> ", children.props);
  // return <>dddd</>;
  if (props.notFound == true) {
    return <>{/* <Custom404 /> */}</>;
  }

  const { meta_bp_layout_section } = props || {};

  let headerWidget = _.find(meta_bp_layout_section, { code: "header" }) || "";

  let optionsWidget = _.omit(headerWidget, [
    "layoutnemgoo",
    "otherattr",
    "layouthdr",
    "rdebugconfig",
    "borderstyle",
    "rdebugdata",
    "rdebugshowposition",
  ]);
  const [dataSrc, error] = useWidgetData(optionsWidget);

  return (
    <>
      <Head>
        <title>Kiosk</title>
        <meta name="description" content="Veritech  Erp" />
        <meta property="og:image" content="../../cover.png" />
        <meta property="og:image:alt" content="help.veritech.mn" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="810" />
        <meta property="og:image:height" content="390" />
        <meta
          name="keywords"
          content="интерактив, интерактив компани, програм хангамж, систем интеграцчилал, software, system, system integration, interactive, interactive company, interactive mongolia, interactive mongol, интерактив монголия, интерактив компания монголия, интерактив компания"
        />
        <link rel="icon" href="river_logo.svg" />
      </Head>
      <Navbar options={props} />
      {children}
      <Footer options={props} />
    </>
  );
}
