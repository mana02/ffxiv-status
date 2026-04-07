import * as cheerio from "cheerio";
import fs from "fs";

const url = "https://jp.finalfantasyxiv.com/lodestone/worldstatus/";

const res = await fetch(url); // ← Node18標準fetch
const html = await res.text();

const $ = cheerio.load(html);

const worlds = [];

$("tr").each((i, el) => {
  const name = $(el).find("td").eq(0).text().trim();
  const status = $(el).find("td").eq(1).text().trim();

  if (name && status) {
    worlds.push({ name, status });
  }
});

fs.writeFileSync(
  "status.json",
  JSON.stringify({
    updated: new Date().toISOString(),
    count: worlds.length,
    worlds: worlds
  }, null, 2)
);

console.log("Generated:", worlds.length);
