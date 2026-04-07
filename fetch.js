import puppeteer from "puppeteer";
import fs from "fs";

const url = "https://jp.finalfantasyxiv.com/lodestone/worldstatus/";

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();

await page.goto(url, {
  waitUntil: "networkidle2",
});

// ★ ここ超重要
await page.waitForSelector("table", { timeout: 15000 });

// 念のため少し待つ
await new Promise(r => setTimeout(r, 3000));

const content = await page.content();

fs.writeFileSync("debug.html", content);

await browser.close();

console.log("DONE");
