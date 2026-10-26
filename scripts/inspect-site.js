import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const screenshotDir = path.resolve('screenshots/baseline');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('Launching browser to inspect current website...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    console.log('Page loaded successfully. Title:', await page.title());

    // Take baseline screenshots
    await page.screenshot({ path: path.join(screenshotDir, '01-hero-baseline.png') });
    console.log('Saved 01-hero-baseline.png');

    // Scroll to features
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotDir, '02-features-baseline.png') });
    console.log('Saved 02-features-baseline.png');

    // Scroll to comparison
    const compareElem = await page.$('#compare-sable');
    if (compareElem) {
      await compareElem.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(screenshotDir, '03-compare-baseline.png') });
      console.log('Saved 03-compare-baseline.png');
    }

    // Full page screenshot
    await page.screenshot({ path: path.join(screenshotDir, '04-fullpage-baseline.png'), fullPage: true });
    console.log('Saved 04-fullpage-baseline.png');

    console.log('Baseline console errors:', consoleErrors.length ? consoleErrors : 'None');
  } catch (error) {
    console.error('Error during baseline inspection:', error);
  } finally {
    await browser.close();
  }
})();
