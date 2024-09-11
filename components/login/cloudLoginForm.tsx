import { useState } from "react";
import { parseBoolInt, encrypt } from "util/helper";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import moment from "moment";
import fetchJson from "lib/fetchJson";
import { AtomInput, AtomButton } from "@/components/common/Atom";
// import router from "next/router";
import { notification } from "antd";
import { useRouter } from "next/router";

export default function CloudLoginForm() {
  const [ldap, setldap] = useState(0);
  const [ischeck, setIscheck] = useState(false);
  // console.log("Router :>> ", Router);
  const router = useRouter();
  const redirect_uri = router?.query?.redirect_uri;
  const loginType = router?.query?.iscustomer || 1;

  // console.log("Router :>> ", router);

  const [data, setData] = useState({
    command: "login",
    rows: [
      {
        path: "username",
        title: "Хэрэглэгчийн нэр",
        placeholder: "Хэрэглэгчийн нэр",
        icon: "far fa-user",
        type: "text",
        value: "",
      },
      {
        path: "password",
        title: "Нууц үг",
        placeholder: "Нууц үг",
        icon: "far fa-lock",
        type: "password",
        value: "",
      },
    ],
  });

  const { data: session } = useSession();
  // console.log("session :>> ", session);/
  // if (session) {
  //   // window.location.href = "/nation";
  //   signOut();
  // }
  const changeHandler = (e: any) => {
    const isChecked: any = parseBoolInt(e.target.checked);
    setldap(isChecked);
  };

  const onChange = (e: any, index: any) => {
    e.preventDefault();
    const tempData = [...data.rows];
    tempData[index] = {
      ...tempData[index],
      value: e.target.value,
    };
    setData({ ...data, rows: tempData });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    let parameters: any = { iscustomer: true };
    data.rows.map((item, index) => {
      parameters = { ...parameters, [item.path]: item.value };
    });
    // let loginParam = {
    //   iscustomer: true,
    //   username: username, //credentials?.username,
    //   password: password, //credentials?.password,
    // };
    // const res = await signIn("credentials", loginParam);
    // console.log("parameters :>> ", parameters);

    try {
      const { data: userSrc } = await axios.post(`/api/sso-auth`, {
        processcode: "login",
        parameters: parameters,
      });
      console.log("user :>> ", userSrc);
      if (userSrc.status == "success") {
        let nowDate = moment();

        let user = {
          username: parameters?.username,
          iscustomer: true,
          isHash: 1,
          password: userSrc?.passwordhash,
          expiredate: nowDate.format("YYYY-MM-DD HH:mm:ss"),
        };

        console.log("usesssssr :>> ", user);

        // const aString = JSON.stringify(user);
        // const messageA = encrypt(aString);

        // const decryptobject = messageA.replaceAll("+", "tttnmhttt");
        // const decryptobjects = decryptobject.replaceAll("=", "ttttntsuttt");

        // console.log(
        //   "edirect_uri + decryptobjects :>> ",
        //   redirect_uri + "/login/authorization?user=" + decryptobjects
        // );

        let params = {
          iscustomer: true,
          redirect: false,
          callbackUrl: "/",
          isHash: 1,
          username: parameters?.username,
          password: userSrc?.passwordhash,
        };

        // signIn("credentials", params);
        let res: any = await signIn("credentials", params);
        console.log("res :>> ", res);

        if (res.ok == true) {
          window.location.href = "/";
        }
        // if (res.ok == true) {
        //   if (!redirect_uri) {
        //     window.location.href = "/nation";
        //   } else {
        //     window.location.href =
        //       redirect_uri + "/login/authorization?user=" + decryptobjects;
        //   }
        // } else {
        //   notification.open({
        //     type: "error",
        //     message: res.error,
        //   });
        // }

        // window.location.href =
        //   redirect_uri + "/login/authorization?user=" + decryptobjects;
        // if (response_type == "crm") {
        //   const redirect =
        //     redirect_uri + "/login/authorization?" + decryptobjects;
        //   window.location.href = redirect;
        // } else {
        //   window.location.href = redirect_uri + "?hash=" + decryptobjects;
        // }
      } else {
        console.log("notification :>> ", userSrc);
        notification.open({
          type: userSrc.status,
          message: userSrc.text,
        });
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      {data.rows.map((item: any, index) => {
        return (
          <AtomInput
            key={item?.id || index}
            item={item.title}
            icon={item.icon}
            value={item.value}
            placeholder={item.placeholder}
            type={item.type}
            customClassName={`mt-4 w-full ${ischeck ? ` border-red-500` : ``} `}
            inputContainer={{
              customClassName:
                "text-sm bg-gray-100 rounded-full text-gray-600 border-0 pl-12 focus:outline-none focus:ring-2 focus:ring-gray-200  focus:bg-white font-normal",
            }}
            iconContainer={{
              customClassName: "absolute text-gray-500 flex items-center pl-6",
            }}
            onChange={(e: any) => onChange(e, index)}
          />
        );
      })}
      <div className="mt-4 w-full flex justify-between text-xs items-center px-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="pl-2"
            onChange={changeHandler}
            value={ldap}
          />
          <span className="ml-2"> Нэвтрэх нэр санах </span>
        </div>
        <div>Нууц үг мартсан</div>
      </div>
      <button
        color="sso"
        name="Нэвтрэх"
        className="rounded-full mt-6 w-full h-10 bg-blue-400 cursor-pointer text-base text-white font-semibold hover:bg-citizen-dark"
        onClick={(e: any) => onSubmit(e)}
      >
        Нэвтрэх
      </button>
      {ischeck && (
        <div className="bg-orange-400  mt-6 text-center  flex text-white space-x-2 py-2 px-4 rounded-full">
          <i className="fa-solid fa-rotate-exclamation"></i>
          <span> Нэвтрэх нэр эсвэл нууц үгийг шалгана уу</span>
        </div>
      )}
    </>
  );
}
