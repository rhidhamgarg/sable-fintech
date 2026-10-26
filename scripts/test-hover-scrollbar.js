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

  // Find Get Debit button and hover over it
  const getDebitBtn = await page.$('button:has-text("Get Debit")');
  if (getDebitBtn) {
    const box = await getDebitBtn.boundingBox();
    console.log('Button box:', box);

    // Hover over button center and edges
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(300);

    // Check if any scrollbar appeared
    const scrollInfo = await page.evaluate(() => {
      const scrollableDiv = document.querySelector('#compare-sable .overflow-x-auto');
      if (!scrollableDiv) return { found: false };
      return {
        found: true,
        scrollHeight: scrollableDiv.scrollHeight,
        clientHeight: scrollableDiv.clientHeight,
        scrollWidth: scrollableDiv.scrollWidth,
        clientWidth: scrollableDiv.clientWidth,
        hasVerticalScrollbar: scrollableDiv.scrollHeight > scrollableDiv.clientHeight,
        hasHorizontalScrollbar: scrollableDiv.scrollWidth > scrollableDiv.clientWidth,
      };
    });

    console.log('Scroll info during hover:', scrollInfo);
    await page.screenshot({ path: path.resolve('screenshots/liquid-glass-hero/07-hover-get-debit.png') });
    console.log('✓ Captured 07-hover-get-debit.png');
  }

  await browser.close();
})();
