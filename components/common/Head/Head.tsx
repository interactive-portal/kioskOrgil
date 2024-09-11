import { FC } from "react";
import NextHead from "next/head";
// import { DefaultSeo } from "next-seo";
// import config from "@config/seo.json";
import Script from "next/script";

const Head: FC = () => {
  return (
    <>
      {/* <DefaultSeo {...config} /> */}
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <script src="https://accounts.google.com/gsi/client" /> */}
      </NextHead>
      {/* <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      /> */}
    </>
  );
};

export default Head;
