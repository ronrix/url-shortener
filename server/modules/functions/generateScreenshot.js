const puppeteer = require('puppeteer');
const path = require("path");
const fs = require("fs");

module.exports = async function generateScreenshot(url, pathname, domain_name, username) {
    // check images/user folder if existing. mkdir if not
    if(!fs.existsSync(pathname + "/" + username)) {
        fs.mkdirSync(path.join(pathname, username));
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
        path: pathname + username + "/" + domain_name + ".png",
        fullPage: true,
    });
    await browser.close();
}