# E2E Testing — SauceDemo 🧪

# E2E Testing — SauceDemo 🧪

![Playwright Tests](https://github.com/VladimirRamirez07/e2e-saucedemo-playwright/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)

E2E test automation for [SauceDemo](https://www.saucedemo.com) using Playwright, TypeScript and Page Object Model. Covers the complete business flow: login, product filtering, cart and checkout with automatic screenshots on failure and CI/CD via GitHub Actions.

## 🛠️ Tech Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [GitHub Actions](https://github.com/features/actions)
- Page Object Model (POM)

## 📁 Project Structure

```
e2e-saucedemo-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── test-data/
│   └── users.ts
├── tests/
│   ├── login/
│   │   └── login.spec.ts
│   ├── products/
│   │   └── products.spec.ts
│   ├── cart/
│   │   └── cart.spec.ts
│   ├── checkout/
│   │   └── checkout.spec.ts
│   └── users/
│       └── users.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🧪 Test Coverage

| Module | Tests | Browsers |
|--------|-------|----------|
| Login | 4 | Chromium, Firefox, WebKit |
| Products | 6 | Chromium, Firefox, WebKit |
| Cart | 4 | Chromium, Firefox, WebKit |
| Checkout | 5 | Chromium, Firefox, WebKit |
| Special Users | 5 | Chromium, Firefox, WebKit |
| **Total** | **72** | **3 browsers** |

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm

### Installation

```bash
git clone https://github.com/VladimirRamirez07/e2e-saucedemo-playwright.git
cd e2e-saucedemo-playwright
npm install
npx playwright install
```

### Run Tests

```bash
# Run all tests
npx playwright test

# Run specific browser
npx playwright test --project=chromium

# Run specific suite
npx playwright test tests/login

# Open HTML report
npx playwright show-report
```

## ✅ CI/CD

Tests run automatically on every push and pull request via GitHub Actions across all 3 browsers.