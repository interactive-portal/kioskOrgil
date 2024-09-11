import { message, Modal, Upload } from "antd";
import axios from "axios";
import FormMetaContext from "context/Meta/FormMetaContext";
import { useSession } from "next-auth/react";
import { FC, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { fieldHideShow } from "@/util/helper";
import Atom_label from "./Atom_label";
import _ from "lodash";
import https from "https";
type PropsType = {
  config?: any;
  className?: any;
  labelClassName?: any;
  style?: any;
  rowIndex?: any;
  sectionConfig?: any;
  fileList?: any;
  setFileList?: any;
};

const Atom_file: FC<PropsType> = ({
  config,
  className,
  labelClassName,
  style,
  rowIndex,
  sectionConfig,
  fileList,
  setFileList,
}) => {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const { processExpression, formDataInitData, handleChangeContext } =
    useContext(FormMetaContext);
  const { data: session, status }: any = useSession();

  const uploadButton = (
    <i className="fa-light fa-image text-[#67748E] fa-lg cursor-pointer"></i>
    // <div>
    //   <span className="fa-thin fa-arrow-up-from-bracket hover:opacity-80 ">
    //     <span className="px-2 cursor-pointer "> File upload</span>
    //   </span>{" "}
    // </div>
  );

  function beforeUpload(file: any) {
    // console.log("%cAtom_file.tsx line:46 object", "color: #007acc;", file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress, filename } = options;
    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        withCredentials: true,
        // httpsAgent: new https.Agent({
        //   rejectUnauthorized: false, // set to false
        // }),
      },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    fmData.append(options.file.name, file, options.file.name);
    fmData.append("sessionId", session.dbsessionid);
    fmData.append("fileName", options.file.name);

    // console.log("NEXT_FILE_URL :>> ", fmData);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_FILE_URL}`,
        fmData,
        config
      );

      // const res: any = fetch("/api/file-attach", {
      //   method: "POST",
      //   body: fmData,
      // });

      // console.log("res :>> ", res);
      onSuccess("Ok");
      // handleChangeContext({
      //   name: filename,
      //   value: res.data.response.files,
      // });
      const firstValue = res.data.response.files.split("storage")[0];
      const fileValue = res.data.response.files.replace(firstValue, "");
      const fileExtionsion = options.file.name.split(".").pop();

      let fileInfo = {
        fileName: options?.file?.name,
        physicalPath: fileValue,
        fileSize: JSON.stringify(options?.file?.size),
        fileExtension: fileExtionsion,
      };

      if (_.isEmpty(fileList)) {
        setFileList([fileInfo]);
      } else {
        let file = [...fileList, fileInfo];
        setFileList(file);
      }
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  // const handleOnChange = (file: any, fileList: any, event: any) => {
  //   // console.log(file, fileList);
  //   setDefaultFileList(fileList);
  // };

  return (
    <>
      <div
        className={
          "relative"
          //   `
          // ${
          //   sectionConfig?.widgetnemgooReady?.labelPosition == "top"
          //     ? `flex flex-col`
          //     : `grid grid-cols-2 gap-4`
          // } ${
          //   config.isshow == "0"
          //     ? "hidden"
          //     : fieldHideShow(config, processExpression) && "hidden"
          // }`
        }
      >
        {/* <Atom_label
          labelName={config?.labelname}
          isrequired={config?.isrequired}
          className={`${labelClassName}`}
          labelFor={config.paramrealpath}
          styles=""
          sectionConfig={sectionConfig}
        /> */}
        <Upload
          name={"image"}
          id={"image"}
          listType="picture"
          className={twMerge(`avatar-uploader ${className}`)}
          defaultFileList={defaultFileList}
          showUploadList={false}
          customRequest={uploadImage}
          beforeUpload={beforeUpload}
          // showUploadList={false}
          // fileList={}
          // onChange={handleOnChange}
        >
          {uploadButton}
        </Upload>
        <Modal
          title="image"
          footer={null}
          // onCancel={this.handleCancel}
        >
          <span>image title </span>
        </Modal>
        {config.isEmpty && <span>{config?.errorText}</span>}
      </div>
    </>
  );
};

export default Atom_file;
