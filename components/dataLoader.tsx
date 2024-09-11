import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
const loadingContainer = {
  width: "4rem",
  height: "4rem",
  display: "flex",
  justifyContent: "space-around",
};
const loadingCircle = {
  display: "block",
  width: "1rem",
  height: "1rem",
  backgroundColor: "#699BF7",
  borderRadius: "0.5rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "60%",
  },
};
const loadingCircleTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: "easeInOut",
};

const Loader = () => (
  <div className="absolute  top-0 left-0 bottom-0 right-0 flex items-start justify-center bg-gray-400/5 pt-20 min-h-[350px]">
    {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> */}
    {/* <div className="fixed  w-full min-h-screen z-50 bg-black opacity-30" /> */}
    <div className="flex fixed w-full justify-center items-center">
      <div className="spinner mx-auto ">
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
      </div>
      {/* <motion.div
        style={loadingContainer}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
      </motion.div> */}
    </div>
  </div>
);

export default function DataLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return loading ? <Loader /> : null;
}
