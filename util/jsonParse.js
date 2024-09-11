import JSON5 from "json5";

export const jsonParse = (json) => {
  try {
    return JSON.parse(json);
  } catch (ex) {
    // console.log("JSON дээр алдаа гарлаа, ex", ex);
    return {};
  }
};

export const jsonParseV2 = (json) => {
  try {
    return JSON5.parse(json);
  } catch (error) {
    // console.log("JSON2 дээр алдаа гарлаа, ex", error);
    return {};
  }
};
