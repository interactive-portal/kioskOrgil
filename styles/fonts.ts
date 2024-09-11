import { Roboto } from "next/font/google";
import { Rubik } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
// const greatVibes = localFont({ src: "./GreatVibes-Regular.ttf" });

export { roboto, rubik };
