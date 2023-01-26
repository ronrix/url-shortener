const puppeteer = require('puppeteer');
const path = require("path");
const fs = require("fs");

module.exports = async function generateScreenshot(url, pathname, filename) {
    // check images/user folder if existing. mkdir if not
    if(!fs.existsSync(pathname)) {
        fs.mkdirSync(path.join(pathname));
    }

    const browser = await puppeteer.launch({
        headless: true,
        // pipe: true, <-- delete this property
        args: [
            '--no-sandbox',
            '--disable-dev-shm-usage', // <-- add this one
        ],
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({
        path: pathname + filename + ".png",
    });
    await browser.close();
}