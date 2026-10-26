import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.resolve('screenshots/liquid-glass-hero');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600); // Wait for entrance

  // 1. Capture new Hero Banner
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-hero-liquid-glass.png') });
  console.log('✓ Captured 01-hero-liquid-glass.png');

  // 2. Capture Features with Liquid Glass Cards
  await page.evaluate(() => window.scrollTo({ top: 950, behavior: 'smooth' }));
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-features-liquid-glass.png') });
  console.log('✓ Captured 02-features-liquid-glass.png');

  // 3. Capture Comparison Table with Liquid Glass Panel & Buttons
  await page.evaluate(() => window.scrollTo({ top: 4100, behavior: 'smooth' }));
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-comparison-liquid-glass.png') });
  console.log('✓ Captured 03-comparison-liquid-glass.png');

  console.log('Console errors:', consoleErrors.length ? consoleErrors : 'None');
  await browser.close();
})();
