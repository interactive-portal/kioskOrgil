import { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  obj?: any;
};

const Number: FC<PropsType> = ({ obj }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage: any = errors[obj?.pathname]?.message;

  return (
    <div className="flex flex-col ">
      <label className="text-[16px] font-medium  text-[#2A2A2A]">
        {obj?.labelname}
        <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        placeholder={obj?.labelname}
        {...register(
          obj?.pathname,
          obj.isRequired == 1
            ? {
                required: "Заавал бөглөх талбар !",
                maxLength: { value: 13, message: "Утасны дугаараа оруулна уу" },
              }
            : {}
        )}
        className={`mt-[8px] px-[14px] border border-black py-[17px] text-[16px] rounded-lg focus-visible:outline-none ${
          errorMessage && "ring-1 ring-red-500"
        }`}
      />
      {errorMessage && (
        <p className="text-red-500 text-[14px]">{errorMessage || ""}</p>
      )}
    </div>
  );
};

export default Number;
