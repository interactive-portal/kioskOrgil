import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { CloudStore } from "@/components/common/engineBox/Context/CloudContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
            <Component {...pageProps} />
          </CloudStore>
        </SWRConfig>
      </SessionProvider>
      {/* <Component {...pageProps} /> */}
    </>
  );
}

// export default appWithTranslation(App);
export default App;
