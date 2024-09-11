// Mongolian [mn]
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const locale = {
  name: "mn",
  weekdays: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"),
  weekdaysShort: "Ням_Дав_Мяг_Лха_Пүр_Баа_Бям".split("_"),
  weekdaysMin: "Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"),
  months:
    "1-р сар_2-р сар_3-р сар_4-р сар_5-р сар_6-р сар_7-р сар_8-р сар_9-р сар_10-р сар_11-р сар_12-р сар".split(
      "_"
    ),
  monthsShort:
    "1-р сар_2-р сар_3-р сар_4-р сар_5-р сар_6-р сар_7-р сар_8-р сар_9-р сар_10-р сар_11-р сар_12-р сар".split(
      "_"
    ),
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: "%s дотор",
    past: "%s өмнө",
    s: "хэдэн секундийн",
    m: "1 минутын",
    mm: "%d минутын",
    h: "1 цагийн",
    hh: "%d цагийн",
    d: "1 өдрийн",
    dd: "%d өдрийн",
    M: "1 сарын",
    MM: "%d сарын",
    y: "1 жилийн",
    yy: "%d жилийн",
  },
  formats: {
    // LT: "HH:mm",
    // LTS: "HH:mm:ss",
    // L: "YYYY-MM-DD",
    // LL: "YYYY ONA MMMMYN D",
    // LLL: "YYYY оны MMMMын D HH:mm",
    // LLLL: "dddd, YYYY оны MMMMын D HH:mm",

    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY-MM-DD",
    LL: "D MMMM YYYY",
    LLL: "YYYY оны MMMM-ын D  HH:mm",
    LLLL: "YYYY оны MMMM-ын D, dddd HH:mm",
  },
  //   ordinal: (n) => n,
  ordinal: (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return `[${n}${s[(v - 20) % 10] || s[v] || s[0]}]`;
  },
};

dayjs.locale(locale, null, true);

dayjs.locale("mn");

export default dayjs;

export const yearMonth = (myDate) => {
  return dayjs(myDate).format("YYYY.MM");
};
