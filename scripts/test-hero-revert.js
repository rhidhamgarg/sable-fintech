import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);

  await page.screenshot({ path: path.resolve('screenshots/liquid-glass-hero/09-hero-reverted.png') });
  console.log('✓ Captured 09-hero-reverted.png');

  await browser.close();
})();
