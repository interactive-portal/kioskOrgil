import FormMetaContext from "@/context/Meta/FormMetaContext";
import { FC, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { fieldHideShow } from "@/util/helper";
import Atom_label from "./Atom_label";
type PropsType = {
  config: any;
  className: any;
  rowIndex?: any;
  style: any;
  labelClassName: any;
  sectionConfig?: any;
};

const Atom_button: FC<PropsType> = ({
  config,
  rowIndex,
  labelClassName,
  className,
  style,
  sectionConfig,
}) => {
  const {
    processExpression,
    formDataInitData,
    handleChangeContext,
    handleClickContext,
    validData,
  } = useContext(FormMetaContext);

  const clickCamera = () => {
    // setOpenModal(true);

    var ws = new WebSocket(`${process.env.NEXT_PUBLIC_FACECAMERA_URL}`);
    // console.log('w :>> ', w);

    ws.onopen = function () {
      ws.send('{"action":"GetImage"}');
    };

    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);
      // console.log("resresssssss", res);

      if (res?.status == "success") {
        handleChangeContext({
          name: config.paramrealpath,
          value: res?.result?.value,
        });

        // setLoading(true);
        // setCustomer(res?.result);
        // Cookies.set("customer", res?.result);
        // setContentType("success");
        // // setImageToken(res?.result.image);
        // // setValue(res?.result?.value);
        // router.push({
        //   pathname: "/page/extend/userinfo",
        //   query: {
        //     c: res?.result?.customerId,
        //   },
        // });
        ws.send('{"action":"close"}');
      } else {
        // setContentType("error");
        console.log("erss :>> ");
      }
    };

    ws.onerror = function (event) {
      // setOpenModal(false);
      // alert(event.data);
      // setContentType("error");
    };

    ws.onclose = function () {
      // setOpenModal(false);
      // setContentType("error");
      // console.log("Connection is closed");
      // }
    };
  };

  const handlerClick = (e: any) => {
    handleClickContext({
      name: config.paramrealpath,
      rowIndex,
    });
  };

  if (config?.columnwidth)
    style = { ...style, width: parseInt(config?.columnwidth, 10) };

  // console.log("config :>> ", config);

  // if(config.paramrealpath)
  return (
    <>
      <div
        className={`${
          sectionConfig?.widgetnemgooReady?.labelPosition == "top"
            ? `flex flex-col`
            : `grid grid-cols-2 gap-4`
        } ${
          config.isshow == "0"
            ? "hidden"
            : fieldHideShow(config, processExpression) && "hidden"
        }`}
      >
        <Atom_label
          labelName={
            processExpression[config.paramname + "_labelname"] !== undefined
              ? processExpression[config.paramname]
              : config.labelname
          }
          className={`${labelClassName} block`}
          isrequired={config.isrequired}
          styles=""
          sectionConfig={sectionConfig}
        />

        <span
          // type="button"
          // name={config.paramrealpath}
          style={{ ...style }}
          className={twMerge(
            "transition duration-150 ease-in-out hover:bg-gray-600 rounded text-white px-6 py-4 text-sm mx-auto",
            className
          )}
          onClick={() => clickCamera()}
          // onClick={handlerClick}
        >
          <img
            src="/images/Face_id_white.png"
            className="md:max-w-[82px] md:max-h-[82px] xs:max-w-[40px] mx-auto"
          />
          {/* {config.labelname} */}
        </span>
        {/* {config.isEmpty && <span>{config.errorText}</span>} */}
      </div>
    </>
  );
};

export default Atom_button;
