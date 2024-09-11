import _ from "lodash";
import Slider from "react-slick";
import RenderAtom from "../Atom/RenderAtom";
import { useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function BlockSlider({
  type = "simple",
  divNumber = "blockSlider1",
  customProps,
  children,
  padding,
  textAlign,
}: {
  type?: "simple" | "mini" | "full" | "modern";
  divNumber?: string;
  customProps?: {
    slickslideRawClass?: any;
    slicklistRawClass?: any;
    arrowClassName?: string;
    arrowLeftIcon?: string;
    arrowLeftClassName?: string;
    arrowRightIcon?: string;
    arrowRightClassName?: string;
    reactSlickSettings?: any;
  };
  children?: any;
  padding?: any;
  textAlign?: any;
}) {
  const arrowDefaultClass = `absolute my-auto inset-y-1/2 z-30 flex items-center justify-center rounded-full text-white text-xl w-10 h-10 ${customProps?.arrowClassName}`;

  const baseSettings = {
    className: `${divNumber} w-full relative`,
    speed: 800,
    variableWidth: true, //чухал!
    dots: true,
    arrows: true,
    infinite: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true, //тухайн хулганын чирснээр гүйнэ
    prevArrow: (
      <ArrowObject
        icon={customProps?.arrowLeftIcon || "fas fa-chevron-left"}
        arrowDefaultClass={`left-0 ${arrowDefaultClass}`}
        customClassName={customProps?.arrowLeftClassName}
      />
    ),
    nextArrow: (
      <ArrowObject
        icon={customProps?.arrowRightIcon || "fas fa-chevron-right"}
        arrowDefaultClass={`fas fa-chevron-right right-0 ${arrowDefaultClass}`}
        customClassName={customProps?.arrowRightClassName}
      />
    ),
    dotsClass: `${divNumber}DotBlock`,
    appendDots: (dots: any) => (
      <div
        style={{
          marginTop: "",
          position: "unset",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: any) => (
      <div
        style={{
          width: "20px",
          height: "20px",
          margin: "0 5px",
          cursor: "pointer",
          background: "#E5E7EB",
          borderRadius: "9999px",
        }}
      >
        {/* {i + 1} */}
      </div>
    ),
  };

  let settings = {};

  switch (type) {
    case "simple":
      settings = {
        ...baseSettings,
        dots: false,
        arrows: false,
        infinite: false,
        variableWidth: false,
      };
      break;
    case "mini":
      settings = {
        ...baseSettings,
        dots: false,
        arrows: false,
        infinite: false,
      };
      break;
    case "full":
      settings = {
        ...baseSettings,
        dots: true,
        arrows: true,
        infinite: true,
      };
      break;
    case "modern":
      settings = {
        ...baseSettings,
        dots: true,
        arrows: false,
        infinite: true,
      };
      break;
  }

  settings = {
    ...settings,
    ...customProps?.reactSlickSettings,
  };

  return (
    <>
      <Slider {...settings}> {children} </Slider>

      <style>
        {`
          .${divNumber} .slick-slide > div {
            ${_.join(
              _.map(
                customProps?.slickslideRawClass,
                (value, property) => `${property}: ${value};`
              ),
              " "
            )}
          }

          .${divNumber} .slick-list {
            ${_.join(
              _.map(
                customProps?.slicklistRawClass,
                (value, property) => `${property}: ${value};`
              ),
              " "
            )}
          }

          .${divNumber} .${divNumber}DotBlock {
            position: absolute;
            bottom: 10px;

            display: block;
            width: 100%;
            padding: 0;
            margin: 0;
            list-style: none;
            text-align: ${textAlign || "start"};
            padding:${padding || "0px 105px 0px 105px"};
          }


          .${divNumber} .${divNumber}DotBlock > ul {
              list-style: none;
              padding: 0;

          }

          .${divNumber} .${divNumber}DotBlock > ul li {

            border-radius:100%;
            position: relative;
            display: inline-block;
            transition: background-color 5.1s;
          }

          .${divNumber} .${divNumber}DotBlock > ul li div {
            width:10px !important;
            height:10px !important;
            border-radius:100%;
            border:1px solid black;
            // background:transparent !important;
            position: relative;
            display: inline-block;
            transition: background-color 2s;
          }

          .${divNumber} .${divNumber}DotBlock > ul li:hover,
          li.slick-active {
            filter: brightness(90%);
          }

          .slick-track .slick-track {
            display: none;
            width:auto !important;
          }
          .fas {
            display:flex !important
          }


          .${divNumber}DotBlock > ul li.slick-active div {
            background:black !important;
          }


        `}
      </style>
    </>
  );
}

const ArrowObject = ({
  onClick,
  icon = "",
  arrowDefaultClass = "",
  customClassName = "",
  className, //цаанаас ирж буй className шүү
}: {
  onClick?: any;
  icon?: string;
  arrowDefaultClass?: string;
  customClassName?: string;
  className?: string;
}) => {
  // console.log("PPPPPPPPPPPP", className);
  const isDisabled = _.includes(className, "slick-disabled");
  // console.log("🚀 ~ isDisabled:", isDisabled);

  return (
    <RenderAtom
      item={{ value: icon }}
      renderType="icon"
      customClassName={`${
        isDisabled
          ? "cursor-not-allowed bg-slate-50"
          : "bg-slate-600 bg-opacity-20 hover:bg-opacity-50 cursor-pointer"
      } ${arrowDefaultClass} ${customClassName}`}
      onClick={onClick}
    />
  );
};
