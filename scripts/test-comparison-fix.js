import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to comparison section
  const section = await page.$('#compare-sable');
  if (section) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }

  await page.screenshot({ path: path.resolve('screenshots/liquid-glass-hero/04-comparison-fixed.png') });
  console.log('✓ Captured 04-comparison-fixed.png');

  // Verify all rows are visible
  const rows = await page.$$eval('#compare-sable .divide-y > div', els => els.map(e => ({
    text: e.textContent.replace(/\s+/g, ' ').trim(),
    opacity: window.getComputedStyle(e).opacity,
    height: e.offsetHeight,
  })));
  console.log('Total verified rows:', rows.length);
  rows.forEach((r, i) => console.log(`Row ${i + 1}: ${r.text.substring(0, 45)}... [height=${r.height}px, opacity=${r.opacity}]`));

  await browser.close();
})();
