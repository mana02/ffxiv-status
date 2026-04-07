import puppeteer from "puppeteer";
import fs from "fs";

const browser = await puppeteer.launch({
  headless: false,   // ← これ超重要
  args: ["--no-sandbox"]
});

const page = await browser.newPage();

await page.setUserAgent(
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
);

await page.goto(
  "https://jp.finalfantasyxiv.com/lodestone/worldstatus/",
  { waitUntil: "networkidle2", timeout: 60000 }
);

await page.waitForSelector(".world-list", { timeout: 60000 });

const worlds = await page.evaluate(() => {
  const data = [];
  document.querySelectorAll(".world-list tr").forEach(tr => {
    const name = tr.querySelector(".world-name")?.innerText;
    const status = tr.querySelector(".world-status")?.innerText;
    if (name && status) {
      data.push({ name, status });
    }
  });
  return data;
});

fs.writeFileSync("status.json", JSON.stringify({
  updated: new Date().toISOString(),
  count: worlds.length,
  worlds
}, null, 2));

await browser.close();
