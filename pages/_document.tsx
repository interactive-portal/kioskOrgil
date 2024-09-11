import { roboto } from "@/styles/fonts";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth md:scroll-auto">
      <Head />
      <body className={`${roboto.className}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
