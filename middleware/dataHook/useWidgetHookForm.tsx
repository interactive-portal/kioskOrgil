import toBoolean from "@/lib/booleanFunction";
import { useHookForm } from "hooks/use-form";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useShowInfo from "./useShowInfo";

export default function useWidgetHookForm(nemgooHookForm: any) {
  const hookFormContext = useHookForm();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
    reset,
    clearErrors,
    setError,
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  const tempHookForm = {
    title: nemgooHookForm?.title,
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    errors,
    reset,
    clearErrors,
    setError,
    onFormError: (errors: any, e: any) => {
      console.log("Error! Form Validate useWidgetHookForm", errors);
      console.log("Error! Form Validate useWidgetHookForm", e);
      // console.log("Энийг хар даа hookForm useWidgetHookForm", hookForm);
      useShowInfo({
        type: "warning",
        title: `Анхаар!`,
        description: "Шаардлагатай талбаруудыг бөглөнө үү",
      });
    },
  };

  /* ---------------------- --------- --------------------- */
  useEffect(() => {
    if (toBoolean(nemgooHookForm?.owner)) {
      if (
        !_.isEmpty(tempHookForm) &&
        !_.isEqual(tempHookForm, hookFormContext?.fff?.[nemgooHookForm?.title])
      ) {
        // hookFormContext.setFff(tempHookForm);

        hookFormContext.setFff((prevState: any) => ({
          ...prevState,
          [nemgooHookForm?.title]: tempHookForm,
        }));
      }
    }
  }, []);

  // let hookForm: any;
  const [hookForm, setHookForm] = useState();

  useEffect(() => {
    if (!_.isEmpty(nemgooHookForm)) {
      const myHookForm = hookFormContext.fff?.[nemgooHookForm?.title];

      if (!_.isEmpty(myHookForm)) {
        setHookForm(myHookForm);
      }
    }
  }, [hookFormContext?.fff]);

  useEffect(() => {
    // Энд effect тавьснаар гарчих шиг болохын. Яагаад юм бол??
    // console.log(
    //   "XXCXCDSCSCSCSCSC",
    //   hookFormContext.fff?.[nemgooHookForm?.title]?.errors
    // );
  }, [hookFormContext.fff?.[nemgooHookForm?.title]]);

  return { hookForm };
}
