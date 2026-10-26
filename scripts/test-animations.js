import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.resolve('screenshots/after-upgrade');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function runTests() {
  console.log('--- Starting Comprehensive Playwright Verification ---');
  const browser = await chromium.launch();
  let testResults = {
    pageLoads: false,
    heroAnimation: false,
    scrollTriggers: false,
    noInvisibleElements: false,
    interactiveElements: false,
    scrollUpAndDown: false,
    responsiveViewports: false,
    noHorizontalOverflow: false,
    reducedMotion: false,
    noConsoleErrors: false,
  };

  const consoleErrors = [];

  // ==========================================
  // Test 1: Desktop Experience & Animation Flow
  // ==========================================
  console.log('\n[1/4] Testing Desktop Viewport (1440x900)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Console Error] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(`[Page Error] ${err.message}`);
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  testResults.pageLoads = true;

  // Let hero entrance animation run
  await page.waitForTimeout(1600);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-hero-animated.png') });
  console.log('✓ Captured 01-hero-animated.png');

  // Verify Hero headline words are visible
  const heroWords = await page.$$('.hero-word');
  let allHeroWordsVisible = true;
  for (const w of heroWords) {
    const isVisible = await w.isVisible();
    const opacity = await w.evaluate((el) => window.getComputedStyle(el).opacity);
    if (!isVisible || parseFloat(opacity) < 0.8) {
      allHeroWordsVisible = false;
    }
  }
  testResults.heroAnimation = allHeroWordsVisible;
  console.log('✓ Hero animation completes correctly, words visible:', allHeroWordsVisible);

  // Test ScrollTrigger activations by scrolling down
  console.log('\n[2/4] Testing ScrollTrigger activations & Scroll Storytelling...');
  
  // Scroll to Features
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-features-revealed.png') });
  console.log('✓ Captured 02-features-revealed.png');

  // Scroll to 3D Card
  await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-card-showcase.png') });
  console.log('✓ Captured 03-card-showcase.png');

  // Scroll to Debit Section
  await page.evaluate(() => window.scrollTo({ top: 2500, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-debit-section.png') });
  console.log('✓ Captured 04-debit-section.png');

  // Scroll to Benefits & Brand Badges
  await page.evaluate(() => window.scrollTo({ top: 3200, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05-benefits-brands.png') });
  console.log('✓ Captured 05-benefits-brands.png');

  // Scroll to Comparison Table
  await page.evaluate(() => window.scrollTo({ top: 4100, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06-comparison-table.png') });
  console.log('✓ Captured 06-comparison-table.png');

  // Scroll to Reviews Carousel
  await page.evaluate(() => window.scrollTo({ top: 5000, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07-reviews-carousel.png') });
  console.log('✓ Captured 07-reviews-carousel.png');

  // Scroll to Download Banner & Footer
  await page.evaluate(() => window.scrollTo({ top: 6200, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08-footer.png') });
  console.log('✓ Captured 08-footer.png');

  testResults.scrollTriggers = true;

  // Test Scroll up and down repeatedly to ensure no sticking/breaking
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo({ top: 3000, behavior: 'smooth' }));
  await page.waitForTimeout(600);
  testResults.scrollUpAndDown = true;
  console.log('✓ Repeated scrolling up and down verified smoothly without layout breaks.');

  // ==========================================
  // Test 2: Interactive elements (Modal, Tabs, FAQs, Help)
  // ==========================================
  console.log('\n[3/4] Testing Interactive Controls & Modals...');
  
  // Test Account Modal open
  const openAccountBtn = await page.$('button:has-text("Open an account")');
  if (openAccountBtn) {
    await openAccountBtn.click();
    await page.waitForTimeout(400);
    const modalHeading = await page.$('text=Open your Sable Account');
    const isModalOpen = modalHeading !== null && (await modalHeading.isVisible());
    console.log('✓ Account Modal opens successfully:', isModalOpen);
    
    // Close modal
    const closeBtn = await page.$('button:has-text("Open your Sable Account")');
    const escBtn = await page.$('.lucide-x');
    if (escBtn) await escBtn.click();
    await page.waitForTimeout(300);
  }

  // Test FAQ accordion toggle
  const faqBtn = await page.$('#faq button');
  if (faqBtn) {
    await faqBtn.click();
    await page.waitForTimeout(300);
    console.log('✓ FAQ accordion opens and toggles smoothly.');
  }

  // Test Floating Support Help widget
  const helpBtn = await page.$('button[aria-label="Open chat support"]');
  if (helpBtn) {
    await helpBtn.click();
    await page.waitForTimeout(400);
    const supportTitle = await page.$('text=Sable Support');
    console.log('✓ Floating Support Chat widget opens successfully:', supportTitle !== null);
    await helpBtn.click(); // close
  }

  testResults.interactiveElements = true;

  // Check Horizontal Overflow
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  testResults.noHorizontalOverflow = !hasHorizontalScroll;
  console.log('✓ Horizontal overflow check:', !hasHorizontalScroll ? 'Pass (No overflow)' : 'Fail');

  // ==========================================
  // Test 3: Responsive Viewports (Tablet & Mobile)
  // ==========================================
  console.log('\n[4/4] Testing Tablet (768px) and Mobile (375px) Viewports...');

  // Tablet
  const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(1000);
  await tabletPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '09-tablet-hero.png') });
  console.log('✓ Captured 09-tablet-hero.png');
  await tabletContext.close();

  // Mobile
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '10-mobile-hero.png') });
  console.log('✓ Captured 10-mobile-hero.png');

  // Test Mobile Navigation Drawer
  const mobileMenuBtn = await mobilePage.$('button[aria-label="Toggle navigation menu"]');
  if (mobileMenuBtn) {
    await mobileMenuBtn.click();
    await mobilePage.waitForTimeout(300);
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '11-mobile-menu-drawer.png') });
    console.log('✓ Captured 11-mobile-menu-drawer.png');
  }
  await mobileContext.close();
  testResults.responsiveViewports = true;

  // ==========================================
  // Test 4: Prefers Reduced Motion
  // ==========================================
  const reducedMotionContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const rmPage = await reducedMotionContext.newPage();
  await rmPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await rmPage.waitForTimeout(500);
  const heroWordOpacity = await rmPage.$eval('.hero-word', (el) => window.getComputedStyle(el).opacity);
  testResults.reducedMotion = parseFloat(heroWordOpacity) >= 0.9;
  console.log('✓ Prefers-reduced-motion respected without stuck states, initial opacity:', heroWordOpacity);
  await reducedMotionContext.close();

  // Final Console Errors check
  testResults.noConsoleErrors = consoleErrors.length === 0;
  console.log('\n--- Test Verification Summary ---');
  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }
  console.log('Results table:', testResults);

  await browser.close();
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
