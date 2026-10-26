import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to reviews section (after compare table)
  await page.evaluate(() => window.scrollTo({ top: 4800, behavior: 'smooth' }));
  await page.waitForTimeout(700);

  await page.screenshot({ path: path.resolve('screenshots/liquid-glass-hero/06-testimonials-exact.png') });
  console.log('✓ Captured 06-testimonials-exact.png');

  await browser.close();
})();
