import React, { useState, useEffect } from "react";
import { decrypt } from "util/helper";
import { useRouter } from "next/router";
import _ from "lodash";
import { signIn, useSession } from "next-auth/react";
import fetchJson from "@/lib/fetchJson";
import useSWR from "swr";
import moment from "moment";
import { notification } from "antd";

export default function authorization() {
  const router = useRouter();
  const { query } = router;
  const [dataSrc, setDataSrc] = useState<any>();
  const [user, setUser] = useState<any>([]);
  const { data: session } = useSession();

  // console.log("ro :>> ", ro);
  let strData: any = query?.user;

  useEffect(() => {
    if (!router.isReady) return;

    // const userStr = query.user;
    const decryptobject = strData.replaceAll("tttnmhttt", "+");
    const decryptobjects = decryptobject.replaceAll("ttttntsuttt", "=");
    const parameter = decrypt(decryptobjects, "newValue");

    let d = new Date();
    let ank = d.toLocaleString("en-US", { timeZone: "Asia/ulaanbaatar" });
    const ankdd = moment(ank).format("YYYY-MM-DD HH:mm:ss");

    setUser((user: any) => [...user, parameter]);
  }, [router]);

  if (session) {
    window.location.href = "/";
  }

  if (_.isEmpty(user)) return <div>Хэрэглэгчийн мэдээлэлээ шалгана уу</div>;

  const param = _.values(user);

  const JsonObject = JSON.parse(param[0]);

  const loginProcess = async () => {
    const result = await fetchJson(
      `/api/post-process?command=SSO_check_create_crm_user&parameters=${JSON.stringify(
        JsonObject
      )}`
    );
    if (result?.status == "success") {
      let parameters = {
        isHash: 1,
        iscustomer: true,
        redirect: false,
        // callbackUrl: "/",
        username: result?.result?.username,
        password: result?.result?.passwordhash,
      };

      let res: any = await signIn("credentials", parameters);

      if (res.ok == true) {
        window.location.href = "/";
      }
    } else {
      notification.open({
        type: result?.status || "error",
        message: result?.text,
        duration: 25,
      });
    }
  };

  if (user) {
    loginProcess();
    // console.log("param :>> ", user);
    // signIn("credentials", parameters);
    // delete data.aggregatecolumns;
    // delete data.paging;
    // console.log("data res", res);
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex items-center justify-center bg-black/50 flex-col">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      <h1> Түр хүлээнэ үү ... </h1>
    </div>
  );
}
