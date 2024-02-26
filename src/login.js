import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const AliexpressLogin = async (page) => {
  await page.goto("https://www.aliexpress.com/account/index.html");

  await page.waitForSelector('input[id="fm-login-id"]');

  await page.type('input[id="fm-login-id"]', process.env.ALI_EMAIL);

  await page.waitForSelector('input[id="fm-login-password"]');

  await page.type('input[id="fm-login-password"]', process.env.ALI_PASS);

  await page.waitForSelector('button[type="submit"]');

  await page.click('button[type="submit"]');

  await sleep(5000);

  const cookies = await page.cookies();
  fs.writeFileSync(
    __dirname + "/cookies.json",
    JSON.stringify(cookies, null, 2)
  );
};

const login = async (page) => {
  if (fs.existsSync(__dirname + "/cookies.json")) {
    const cookiesString = await fs.readFileSync(__dirname + "/cookies.json");
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);

    await page.goto("https://www.aliexpress.com/account/index.html");

    await page.waitForSelector(".account-info-name");

    const value = await page.$eval(
      ".account-info-name",
      (el) => el.textContent
    );

    if (value.length < 1 && process.env.LOGIN_TO_ALI)
      await AliexpressLogin(page);
  } else {
    if (process.env.LOGIN_TO_ALI) await AliexpressLogin(page);
  }
};

export default login;
