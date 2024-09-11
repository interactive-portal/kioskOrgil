import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  obj?: any;
};

const Text: FC<PropsType> = ({ obj }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage: any = errors[obj?.pathname]?.message;

  const [values, setValues] = useState(obj?.defaultValue);
  // console.log(
  //   `Text Component: Received data for pathname '${obj?.pathname}''${obj?.labelname}'`
  // );

  return (
    <div className="flex flex-col ">
      <label className="text-[16px] mt-[8px] font-medium  text-[#2A2A2A]">
        {obj?.labelname} <span className="text-red-500">*</span>
      </label>
      <input
        // disabled={obj?.defaultValue ? true : false}
        type="text"
        placeholder={obj?.labelname}
        autoComplete="off"
        {...register(
          obj?.pathname,
          obj.isRequired === 1 ? { required: "Заавал бөглөх талбар!" } : {}
        )}
        defaultValue={obj?.defaultValue ? obj.defaultValue : ""}
        className={`mt-[8px] px-[14px] border border-black py-[17px] text-[16px] rounded-lg focus-visible:outline-none ${
          errorMessage ? "ring-1 ring-red-500" : ""
        }`}
      />
      {errorMessage && (
        <p className="text-red-500 text-[14px]">{errorMessage || ""}</p>
      )}
    </div>
  );
};

export default Text;
