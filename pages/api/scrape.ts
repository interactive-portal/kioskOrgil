import puppeteer from "puppeteer";

const getWeather = async (req: any, res: any) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://weather.gov.mn");

    const data = await page.evaluate(() => {
      const elements = document.querySelectorAll(".container .w-60 .ml-2");
      const extractedData: any = [];

      elements.forEach((element) => {
        extractedData.push(element.textContent);
      });
      return extractedData;
    });

    await browser.close();

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Датаг татаж чадсангүй" });
  }
};

export default getWeather;
