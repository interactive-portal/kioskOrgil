import prepareUrlInternal from "@/components/common/engineBox/util/urlHelper";
import { useCloud } from "hooks/use-cloud";
import _ from "lodash";
import { useRouter } from "next/router";

const useGoLink = () => {
  const router = useRouter();
  const cloudContext = useCloud();

  const goLink = async ({ urlObject }: { urlObject: any }) => {
    const oldUrlQuery =
      urlObject?.keepQuery || false
        ? _.omit(
            router?.query,
            "detect" // энэ нөхөр router.query дотор явдгийг устгах хэрэгтэй.
          )
        : {};
    const silentQuery = urlObject?.props?.shallow ? { silent: true } : {};
    const newQuery = urlObject?.query || {};

    const queryReady = {
      ...oldUrlQuery,
      ...silentQuery,
      ...newQuery,
    };

    //Хэрвээ query-ээс Element устгуулах бол value-д нь removeIt гэж бичээрэй.
    _.keys(queryReady).forEach((key) => {
      if (queryReady[key] === "removeIt") {
        delete queryReady[key];
      }
    });

    const urlObjectReady = prepareUrlInternal(
      router,
      urlObject,
      cloudContext.hostObject,
      urlObject?.keepQuery
    );

    // router.push(urlObjectReady, as , options);
    router.push(urlObjectReady, undefined, {
      shallow: false,
      scroll: true,
      ...urlObject?.props,
    });
    return null;
  };

  return { goLink };
};

export default useGoLink;
