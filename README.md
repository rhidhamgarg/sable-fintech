# Sable — Next-Generation Fintech Platform

<div align="center">
  <img src="public/assets/sable-logo.svg" alt="Sable Logo" width="220" />
  <p><strong>Awwwards-caliber digital banking experience engineered with liquid-glass aesthetics, momentum inertia scrolling, interactive 3D physics, and a streamlined multi-step onboarding journey.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-19.3.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=flat-square" alt="Lenis" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="MIT License" />
  </p>
</div>

---

## 🌟 Overview

**Sable** is a production-grade, human-crafted fintech web application inspired by high-end design systems like *Apple Card, Stripe, Linear,* and *Revolut*. Custom-engineered specifically for international professionals, students, and US residents, Sable delivers effortless access to US banking, credit building, and high-yield checking accounts without requiring an SSN or US credit history.

This codebase demonstrates modern frontend architecture, featuring zero-lag kinetic scrolling, bespoke WebGL/CSS 3D card tilt physics with dynamic specular glare, client-side routing, and a multi-step regulatory onboarding terminal designed to eliminate generic template patterns.

---

## 🚀 Key Features

### 1. 🏛️ High-Precision Onboarding Studio (`/open-account`)
A dedicated, dual-panel application terminal engineered with authentic financial compliance workflows:
- **Interactive Product Stage (Left Panel)**:
  - Real-time 3D perspective tilt that tracks cursor movement with realistic specular light glare.
  - Adaptive rendering supporting both horizontal dual-cards (*Sable ONE Secured*) and vertical contactless cards (*World Elite Black Metal* & *Borderless Debit*).
  - **Apple-Style Financial Spec Sheet**: Live metric tiles for Annual Fee, Credit Limit, Cashback Rate, and Credit Bureau Reporting.
  - Bank partnership assurance: *Coastal Community Bank (Member FDIC)* and *Mastercard® World Elite*.
- **4-Step Onboarding Journey (Right Panel)**:
  - **Step 01 — Choose Plan**: Compact comparison cards with custom micro-radios, inline feature chips, and keyboard shortcut support (`Enter ↵`).
  - **Step 02 — Eligibility & Compliance**: Dynamic branching for **International Applicants** (160+ country selector, US visa status, passport upload — *No SSN required*) and **US Citizens** (soft credit pull).
  - **Step 03 — Personal & Residential Details**: Legal identity verification, date of birth, and physical US card dispatch address.
  - **Step 04 — Instant Virtual Card Issuance**: Celebration terminal with interactive **Reveal / Hide** card numbers, one-click copyable Coastal Community Bank Routing & Checking account numbers, and mobile wallet integrations.

### 2. 💎 Liquid-Glass Design System
- Architectural depth with refined hairline borders (`border-white/[0.08]`) and multi-layer backdrop blurs.
- Ambient fluid drift orbs (`animate-fluid-1`, `animate-fluid-2`) providing gentle, natural atmosphere without distracting neon glows.
- Custom desktop-only cursor tracking with smooth magnetic hover dampening on interactive CTAs.

### 3. 🌊 Kinetic Smooth Inertia Scrolling
- Powered by **Lenis** combined with **GSAP ScrollTrigger** for 60fps momentum scrolling.
- Parallax depth on hero assets, layered credit card floats, and synchronized entrance animations.
- Intelligent scroll management: Lenis automatically runs on the home page and cleanly unbinds during onboarding routing.

### 4. 🧭 Context-Aware Sticky Navbar
- Real-time contrast detection using `IntersectionObserver` that dynamically switches navigation theme between dark-mode and high-contrast light sections.
- Animated multi-column mega-menu dropdowns showcasing Sable ONE Credit, Debit, Rewards, and Help Center.
- Mobile drawer with backdrop blur, accordion links, and tactile touch buttons.

### 5. 📊 Interactive Comparison Matrix & Debit Showcase
- Detailed side-by-side comparison between Secured Credit & Debit vs. Debit Only with horizontal swipe protection on mobile.
- High-yield checking feature breakdowns with interactive card previews.
- Press marquee featuring *Forbes, Bloomberg, Business Insider, Yahoo Finance,* and *TechCrunch*.
- Dynamic customer testimonials carousel with responsive touch velocity.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI framework utilizing the latest Concurrent rendering features |
| **TypeScript** | Strict compile-time type safety across data schemas and component props |
| **Vite 8** | Ultra-fast lightning-quick HMR and optimized production bundling |
| **Tailwind CSS v4** | Modern utility-first CSS engine with native CSS variable color theming |
| **GSAP (GreenSock)** | High-performance animation timelines, 3D card tilt physics, and ScrollTrigger |
| **Lenis Scroll** | Butter-smooth kinetic momentum inertia scrolling |
| **React Router v7** | Client-side routing with query parameter synchronization (`?plan=...`) |
| **Lucide React** | Lightweight, accessible, and pixel-perfect SVG iconography |
| **Playwright** | End-to-end visual regression testing and mobile viewport validation |

---

## 📂 Project Architecture

```
figma-try/
├── public/
│   └── assets/                     # High-res card renders, logos & brand marks
│       ├── card-black-gold.png     # 17g World Elite Black Metal card (vertical)
│       ├── card-debit.png          # Sable Borderless Debit card (vertical)
│       ├── compare-credit-debit.png# Sable ONE Secured dual-card composite
│       ├── sable-logo.svg          # Official Sable vector wordmark
│       └── ...
├── src/
│   ├── components/                 # Reusable, modular UI components
│   │   ├── AccountModal.tsx        # Quick account preview modal
│   │   ├── BenefitsShowcase.tsx    # Sable rewards & financial benefits
│   │   ├── CardShowcase.tsx        # 3D interactive Black Metal card visualizer
│   │   ├── ComparisonTable.tsx     # Tier matrix with mobile swipe support
│   │   ├── CustomCursor.tsx        # Smooth magnetic cursor physics (Desktop)
│   │   ├── DebitSection.tsx        # High-yield checking & debit showcase
│   │   ├── DownloadBanner.tsx      # App Store & Google Play download CTA
│   │   ├── FaqSection.tsx          # Accessible accordion FAQ
│   │   ├── FeaturesGrid.tsx        # Bento-box layout of core banking perks
│   │   ├── FloatingHelp.tsx        # Live concierge customer support widget
│   │   ├── Footer.tsx              # Regulatory footer & legal disclosures
│   │   ├── Hero.tsx                # Cinematic fluid hero with 3D mockups
│   │   ├── MagneticButton.tsx      # GSAP magnetic attraction button wrapper
│   │   ├── Navbar.tsx              # Contrast-aware sticky navbar & mega menus
│   │   ├── PressMarquee.tsx        # Continuous press logo ticker
│   │   └── ReviewsCarousel.tsx     # Customer testimonials carousel
│   ├── hooks/
│   │   └── useSmoothScroll.ts      # Lenis & GSAP ScrollTrigger bridge
│   ├── pages/
│   │   ├── HomePage.tsx            # Main landing page assembling all sections
│   │   └── OpenAccountPage.tsx     # 4-Step banking onboarding studio
│   ├── App.tsx                     # Top-level client routing & cursor provider
│   ├── index.css                   # Liquid-glass utility classes & animations
│   └── main.tsx                    # Application entry point
├── package.json                    # Project metadata, dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite build tooling & Tailwind integration
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn` / `bun`)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/sable-fintech.git
cd sable-fintech
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`**.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory with full TypeScript verification.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🎨 Design System & Color Tokens

| Token | Hex Value | Application |
| :--- | :--- | :--- |
| **Sable Mint** | `#6FDBD4` | Primary brand accent, interactive buttons & focus rings |
| **Emerald Teal** | `#10ACA2` | Active badges, verification checks & highlights |
| **World Elite Gold** | `#D4AF37` | Luxury metal card tier accents & concierge badges |
| **Void Black** | `#070709` | Deep architectural studio background |
| **Studio Dark** | `#0B0C10` | Elevated container & form panel background |
| **Glass Border** | `rgba(255, 255, 255, 0.08)` | Specular hairline dividers & structural borders |

### Liquid-Glass Utilities
```css
/* Specular liquid glass card */
.liquid-glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.22);
}

/* Primary tactile CTA button */
.liquid-glass-btn-primary {
  background: linear-gradient(135deg, rgba(111, 219, 212, 0.92) 0%, rgba(31, 198, 187, 0.9) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.7), 0 8px 25px -4px rgba(0, 0, 0, 0.35);
  color: #000000;
}
```

---

## 📱 Viewport & Performance Verification

- **Responsive Breakdown**:
  - `Mobile` (360px – 640px): Single-column stacked layouts, adaptive card heights, touch-friendly tap targets, and streamlined mobile navigation.
  - `Tablet` (768px – 1024px): Scaled 2-column grids with horizontal overflow protection.
  - `Desktop` (1280px – 1920px+): Two-panel split studio with sticky product visualizer and above-the-fold application flow.
- **Performance**:
  - Zero layout shifts (CLS < 0.01).
  - GPU-accelerated transforms (`transform-gpu`, `will-change-transform`).
  - Production bundle gzip size: CSS ~12 KB, JS ~155 KB.

---

## 🏛️ Legal & Banking Disclosures

*Banking services provided by Coastal Community Bank, Member FDIC, pursuant to a license by Mastercard® International Inc. Sable account deposits are FDIC insured up to $250,000 through Coastal Community Bank, Member FDIC.*

---

## 👨‍💻 Author & Engineering Credits

Crafted with passion and precision by **Rhidham Garg**  
- **Role**: UI/UX Architecture, Liquid-Glass Design System, 3D Physics & Full-Stack Frontend Engineering.
- **Repository**: [Sable Fintech Platform](https://github.com/your-username/sable-fintech)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
