import * as cheerio from "cheerio";
import fs from "fs";

const url = "https://jp.finalfantasyxiv.com/lodestone/worldstatus/";

const res = await fetch(url);
const html = await res.text();
const $ = cheerio.load(html);

const worlds = [];

$(".world-list__item").each((i, el) => {
  const name = $(el).find(".world-list__world_name").text().trim();
  const status = $(el).find(".world-list__status").text().trim();

  if (name && status) {
    worlds.push({ name, status });
  }
});

fs.writeFileSync(
  "status.json",
  JSON.stringify(
    {
      updated: new Date().toISOString(),
      count: worlds.length,
      worlds: worlds
    },
    null,
    2
  )
);

console.log("Generated:", worlds.length);
