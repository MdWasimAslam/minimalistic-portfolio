/* One-off: capture real screenshots of the live projects. Run: node scripts/shoot.js */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "..", "public", "projects");
fs.mkdirSync(OUT, { recursive: true });

const targets = [
  { name: "googleclone", url: "https://wasim-googleclone-mui.netlify.app/" },
  { name: "popstore", url: "https://get.pop.store/" },
  { name: "commentsold", url: "https://try.commentsold.com/" },
  { name: "flywheel", url: "https://crm.flywheelcars.com/" },
  { name: "clearedtalent", url: "https://www.clearedtalent.com/" },
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  });

  for (const t of targets) {
    const page = await ctx.newPage();
    try {
      await page.goto(t.url, { waitUntil: "networkidle", timeout: 35000 });
    } catch (e) {
      try {
        await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 35000 });
      } catch (e2) {
        console.log(`SKIP ${t.name}: ${e2.message.split("\n")[0]}`);
        await page.close();
        continue;
      }
    }
    // dismiss common cookie/consent buttons if present
    for (const label of ["Accept all", "Accept All", "Accept", "I agree", "Got it"]) {
      try {
        const b = page.getByRole("button", { name: label });
        if (await b.count()) {
          await b.first().click({ timeout: 1500 });
          break;
        }
      } catch (_) {}
    }
    await page.waitForTimeout(3000);
    const file = path.join(OUT, `${t.name}.png`);
    try {
      await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1440, height: 900 } });
      console.log(`OK   ${t.name} -> ${file}`);
    } catch (e) {
      console.log(`FAIL ${t.name}: ${e.message.split("\n")[0]}`);
    }
    await page.close();
  }

  await browser.close();
})();
