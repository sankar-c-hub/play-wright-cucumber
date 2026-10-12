# Playwright + Cucumber BDD Automation Framework

## Overview

This repository is an end-to-end test automation framework using:

- **Playwright** (browser automation)
- **Cucumber.js** (Behavior-Driven Development / Gherkin)
- **Node.js / JavaScript**
- **Allure Reporting** (visual test execution reports)

It follows the Page Object Model (POM) and features:

- Behavior-Driven Development (BDD) with Cucumber feature files
- Modular architecture with centralized locator management (`resources/locators.json`)
- Centralized browser management (`Chrome`, `Chromium`, `Firefox`, `WebKit`)
- Automatic screenshots on failure and on verification steps containing `verify`
- Step-level logging wrapped with Allure step metadata
- Timestamped Allure HTML reports generated automatically after test execution
- Strict step validation (undefined or ambiguous steps fail scenarios automatically)

---

## Project Structure

```text
project-root
├── common/                      # Hooks, browser manager, shared actions
│   ├── browser_manager.js
│   ├── browser_actions.js
│   ├── hooks.js
│   └── allure_helper.js
├── features/                    # Gherkin feature files (.feature)
│   └── Login.feature
├── step_definitions/            # Cucumber step definition implementations
│   └── login_step_definition.js
├── pages/                       # Page Object Model classes
│   ├── base_page.js
│   └── login_page.js
├── utils/                       # Screenshot, JSON, and report path utilities
│   ├── json_utility.js
│   ├── screenshot_util.js
│   ├── display_util.js
│   └── report_paths.js
├── resources/                   # Configurations, locators, and properties
│   ├── config.json
│   ├── locators.json
│   └── allure.properties
├── reports/                     # Timestamped Allure execution runs (runtime)
│   └── <YYYYMMDD_HHMMSS>/
│       ├── allure-results/
│       └── allure-report/
├── cucumber.js                  # Cucumber runner configuration
├── allure_cucumber_reporter.js  # Allure reporter hook
├── playwright.config.js         # Playwright configuration
├── generate-report.js           # Executes tests & generates Allure HTML report
├── package.json                 # Node.js dependencies and scripts
└── README.md
```

---

## Prerequisites & Environment Setup

| Tool | Recommended Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | v18+ (v16+ minimum) | JavaScript runtime & npm package manager |
| **Java (JRE/JDK)** | 8 or newer (17+ recommended) | **Required solely by Allure CLI** to generate & serve HTML reports |
| **Git** | Recent version | Version control |

Verify your environment:

```bash
node -v
npm -v
java -version
```

> **Note:** Java is **not** used for test execution or browser automation. It is required exclusively by the `allure-commandline` binary to generate the Allure HTML report from raw results.

---

## Installation

1. Clone the repository and navigate to the root directory:
   ```bash
   git clone <repository-url>
   cd play-wright-cucumber
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browser binaries:
   ```bash
   npx playwright install
   ```
   *(Or run the combined setup command: `npm run setup`)*

---

## Configuration (`resources/config.json`)

Framework runtime settings are controlled in `resources/config.json`:

```json
{
    "url": "https://demowebshop.tricentis.com/",
    "browser": "Chrome",
    "headless": false,
    "projectname": "web automation using playwright javascript",
    "parallel": false,
    "runOn": "local",
    "screenshot": "normal"
}
```

- **`url`**: Target application entry URL.
- **`browser`**: `Chrome`, `chromium`, `firefox`, or `webkit`.
- **`headless`**: `false` to view browser execution, `true` for headless mode.
- **`screenshot`**: `normal` (viewport) or `fullPage`.

---

## Test Execution

### 1. Run Tests with Allure Report Generation

- **Run all tests:**
  ```bash
  npm test
  ```

- **Run specific scenario or tags:**
  ```bash
  npm test -- --tags "@sort001"
  npm test -- --tags "@smoke"
  npm test -- --tags "@negative"
  ```

### 2. Run with Cucumber Runner Directly

- **Run by tag:**
  ```bash
  npx cucumber-js --tags "@sort001"
  npx cucumber-js --tags "@smoke"
  ```

- **Run a single feature file:**
  ```bash
  npx cucumber-js features/Login.feature
  ```

- **Dry-run (validate step definitions without launching browser):**
  ```bash
  npx cucumber-js --dry-run
  ```

---

## Allure Reporting

Allure HTML reports are generated automatically after execution under:

```text
reports/<YYYYMMDD_HHMMSS>/allure-report/index.html
```

Open `index.html` in any browser to view the interactive test execution report with screenshots, steps, and logs.

