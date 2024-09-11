import { useState, useEffect } from "react";
import { toBoolean } from "@/util/helper";

const useScrollTop = (init: any = true) => {
  const [isTop, setIsTop] = useState(toBoolean(init));

  const setToggle = (value: any) => {
    setIsTop(toBoolean(value) && !isTop);
  };

  const handleScroll = () => {
    const yesTop = window.scrollY < 150;
    setIsTop(yesTop);
  };

  // const debounceFunction = _.debounce(handleScroll, 100);

  useEffect(() => {
    handleScroll;

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isTop, setIsTop };
};

export default useScrollTop;
