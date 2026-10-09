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

### 1. Run all tests and generate Allure HTML report

```bash
npm test
```

This command runs `node generate-report.js`, which:
1. Creates a unique timestamped folder under `reports/<YYYYMMDD_HHMMSS>/`.
2. Executes all Cucumber feature files using Playwright.
3. Writes raw test results to `allure-results/`.
4. Automatically generates the interactive HTML report at `allure-report/index.html`.
5. Outputs the exact path to open the report.

### 2. Run specific feature or tags (Cucumber runner)

- **Run a single feature file:**
  ```bash
  npx cucumber-js features/Login.feature
  ```

- **Filter by tag:**
  ```bash
  npx cucumber-js --tags "@smoke"
  npx cucumber-js --tags "@negative"
  npx cucumber-js --tags "@smoke or @regression"
  ```

- **Run a single scenario by tag:**
  ```bash
  npx cucumber-js --tags "@test001"
  ```

- **Dry-run (validate step definitions without launching browser):**
  ```bash
  npx cucumber-js features/Login.feature --dry-run
  ```

---

## Allure Reporting

### Report Locations

Allure test results and reports are saved per execution under timestamped folders:

```text
reports/
  └── <YYYYMMDD_HHMMSS>/
        ├── allure-results/    # Raw JSON/XML result files
        └── allure-report/     # Generated static HTML report
```

### Viewing Reports

1. **Directly in browser:**
   Open the generated file in any browser:
   ```text
   reports/<YYYYMMDD_HHMMSS>/allure-report/index.html
   ```

2. **Serve report via Allure CLI:**
   ```bash
   npx allure open "reports/<YYYYMMDD_HHMMSS>/allure-report"
   ```

3. **Serve directly from raw results:**
   ```bash
   npx allure serve "reports/<YYYYMMDD_HHMMSS>/allure-results"
   ```

4. **Manually generate HTML from existing results:**
   ```bash
   npx allure generate "reports/<YYYYMMDD_HHMMSS>/allure-results" -o "reports/<YYYYMMDD_HHMMSS>/allure-report" --clean
   ```

### Allure Features Included

- Comprehensive scenario and step status (`Passed`, `Failed`, `Skipped`).
- Undefined or missing step definitions automatically reported as **Failed**.
- Detailed action logs for Playwright interactions via `BrowserActions`.
- Automatic screenshots attached on failed steps.
- Automatic screenshots attached for steps containing `verify` in their description.
- Environment metadata (Browser, OS platform, target URL, Node.js version).
