import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);

  const rows = await page.$$eval('.table-row', els => els.map(el => ({
    className: el.className,
    display: window.getComputedStyle(el).display,
    gridTemplateColumns: window.getComputedStyle(el).gridTemplateColumns,
    opacity: window.getComputedStyle(el).opacity,
    height: el.offsetHeight,
    childCount: el.children.length,
    childrenText: Array.from(el.children).map(c => c.textContent.trim()),
    childrenWidths: Array.from(el.children).map(c => c.offsetWidth),
  })));
  console.log('Total table rows found:', rows.length);
  console.log('Rows details:', JSON.stringify(rows, null, 2));

  // Also check check-badge
  const badges = await page.$$eval('.check-badge', els => els.map(el => ({
    opacity: window.getComputedStyle(el).opacity,
    transform: window.getComputedStyle(el).transform,
    display: window.getComputedStyle(el).display,
    width: el.offsetWidth,
    height: el.offsetHeight,
  })));
  console.log('Total check badges found:', badges.length);
  console.log('First 4 badges:', badges.slice(0, 4));

  await browser.close();
})();
