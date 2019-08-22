const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/');
    await page.focus('input[type="text"]');
    await page.keyboard.type('i am typing using puppeteer !');
    await page.focus('input[type="email"]');
    await page.keyboard.type('loldonFreedom@gmail.com');
    // await page.click('button[type="submit"]');
    await page.waitFor(2000);

    const result = await page.evaluate(() => {
        let title = document.querySelector('.App-intro').innerText;
        let footer = document.querySelector('footer').innerText;

        return {
            title,
            footer
        }

    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Получилось!
});