import puppeteer from "puppeteer";
import fs from "fs";

const url = "https://jp.finalfantasyxiv.com/lodestone/worldstatus/";

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle2" });

// JS描画後のHTML取得
const content = await page.content();

await browser.close();

// とりあえず保存して中身確認
fs.writeFileSync("debug.html", content);

console.log("HTML saved.");
