import preparePageListData from "./preparePageListData";

export async function preparePageObject(hostObject: any) {
  // console.log(" hostObject?.pageSlug", hostObject);

  const mySlugList = hostObject?.pageSlug.split("/");
  const pageid = mySlugList.at(-2) === "pageid" ? mySlugList.at(-1) : "";

  // console.log(
  //   "pageidaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  //   hostObject
  // );

  // console.log("preparePageObject pageid :>> ", pageid);

  /* ------------------------------------------------------ */
  /*                   PREPARE PAGEOBJECT                   */
  /* ------------------------------------------------------ */
  let pageObject: any = {};
  try {
    pageObject = await preparePageListData({
      pageid: pageid,
      // pageid: "",
      hostObject: hostObject,
    });
  } catch (error: any) {
    // console.log(
    //   "Page-ийн Дата, Мэдээллийг дуудах үед алдаа гарлаа.",
    //   error.message
    // );
    pageObject = {
      notFound: true,
      ouchError: {
        title: "Page-ийн Дата, Мэдээллийг дуудах үед алдаа гарлаа.",
        description: error.message,
      },
    };
  }

  return pageObject;
}
