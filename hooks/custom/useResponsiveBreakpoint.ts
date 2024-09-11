import _ from "lodash";
import { useEffect } from "react";
import { createBreakpoint, useToggle } from "react-use";

const useBreakpoint = createBreakpoint({
  mobile: 480, //mobile phone
  sm: 640, //very big mobile phone
  md: 768, //Pad
  lg: 1024, //large Pad
  xl: 1280, //Laptop screen
  "2xl": 1536, //Wide screen
});

const useResponsiveBreakpoint = () => {
  const breakpoint = useBreakpoint();

  const [isMobile, setIsMobile] = useToggle(false);
  const [isDesktop, setIsDesktop] = useToggle(false);

  useEffect(() => {
    if (_.includes(["mobile", "sm"], breakpoint)) {
      setIsMobile(true);
      setIsDesktop(false);
    } else {
      setIsMobile(false);
      setIsDesktop(true);
    }
  }, [breakpoint]);

  return { breakpoint, isMobile, isDesktop };
};

export default useResponsiveBreakpoint;
