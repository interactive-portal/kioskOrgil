import "@/styles/globals.css";
import { roboto } from "@/styles/fonts";
// import "public/icon/css/all.css";
// import { roboto } from "@/fonts";
// import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SWRConfig } from "swr";
import { withTranslation } from "react-i18next";
import Layout from "@/components/layout";
import { CloudStore } from "@/components/common/engineBox/Context/CloudContext";
import RouteLoader from "@/components/routeLoader";
import "public/icon/css/all.css";
import "styles/globals.css";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { appWithTranslation } from "next-i18next";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import Loading from "./kiosk/loading";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#0346F2"
        startPosition={0.1}
        stopDelayMs={60}
        height={2}
        // showOnShallow={true}
      />
      {/* <RouteLoader /> */}

      <ErrorBoundary>
        <SessionProvider
          session={pageProps.session}
          // clientMaxAge={ 2 * 60 * 60}
          // refetchInterval={60 * 60 * 60} //15 минут тутамд user login шалгана.
          refetchOnWindowFocus={false} //цонх focus-лах үед refetch хийх эсэх
        >
          <SWRConfig
            value={{
              refreshInterval: 0,
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
            }}
          >
            <CloudStore>
              <main className={`${roboto?.className}`}>
                <Layout {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              </main>
            </CloudStore>
          </SWRConfig>
        </SessionProvider>
      </ErrorBoundary>
    </>
  );
}

export default appWithTranslation(App);

// export default appWithTranslation()(App);
