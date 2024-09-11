import { useState } from "react";
import AtomSlider from "@/components/common/Atom/atomSlider";

export default function Banner(fade: any) {
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);

  const onClickOpenRegister = () => {
    setVisibleModal(true);
  };
  const onClose = () => {
    setVisibleModal(false);
  };
  return (
    <AtomSlider>
      {data.map((item: any, index) => (
        <div key={item?.id || index} className="bg-yellow-700 h-screen">
          <div className="relative w-full h-full">
            <img
              className={`object-center object-cover w-full h-full`}
              src={item.image}
              alt="background-image"
              role="img"
            />
            {fade && (
              <div className="w-full h-full absolute inset-0 bg-black bg-opacity-30"></div>
            )}

            <div
              className={`px-4 md:px-10 lg:px-24 absolute w-full flex flex-col justify-center h-full inset-0`}
            >
              {item.title && (
                <h1
                  className={`text-xl md:text-3xl lg:text-4xl leading-5 md:leading-7 lg:leading-9 font-semibold text-white `}
                >
                  {item.title}
                </h1>
              )}

              {item.description && (
                <p className="w-11/12 text-base md:text-xl lg:text-2xl leading-6 md:leading-5 font-normal lg:leading-6 text-white mt-2">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </AtomSlider>
  );
}

const data = [
  {
    image: "/images/wall.jpg",
    title: "Welcome to",
    description: "Veritech Erp Customer Experience Portal",
  },
  {
    image: "/images/wall2.jpg",
    title: "Welcome to ",
    description: "Veritech Customer Experience Portal",
  },
];
