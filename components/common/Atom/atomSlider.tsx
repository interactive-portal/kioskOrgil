import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function AtomSlider({
  type = "1",
  color = "sso",
  customStyle = {},
  customClassName = "",
  arrowClass: customArrowClass,
  arrowStyle: customArrowStyle,
  children,
}: {
  type?: "1" | "2" | "3" | "4";
  color?: string;
  customStyle?: any;
  customClassName?: string;
  arrowClass?: string;
  arrowStyle?: any;
  children?: any;
}) {
  const settings = {
    dots: true,
    // fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    // arrows: true,
    slidesToScroll: 1,
    // className: "slides",
    // initialSlide: 0, //2-р слайдаас эхэлнэ.
    appendDots: (dots: any) => (
      <div
        style={{
          position: "absolute",
          bottom: "15px",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
  };

  return (
    <Slider {...settings} className={`relative h-screen ${customClassName}`}>
      {children}
    </Slider>
  );
}
