import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600); // Wait for entrance animation

  await page.screenshot({ path: path.resolve('screenshots/liquid-glass-hero/08-hero-clean-authentic.png') });
  console.log('✓ Captured 08-hero-clean-authentic.png');

  // Verify text readability
  const headingText = await page.$eval('h1', el => el.innerText);
  console.log('Heading text:', headingText);

  await browser.close();
})();
