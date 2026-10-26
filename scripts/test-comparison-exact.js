import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const section = await page.$('#compare-sable');
  if (section) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }

  await page.screenshot({ path: path.resolve('screenshots/liquid-glass-hero/05-comparison-exact.png') });
  console.log('✓ Captured 05-comparison-exact.png');

  await browser.close();
})();
