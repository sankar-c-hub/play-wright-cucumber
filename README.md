# Playwright + Cucumber BDD Automation Framework

## Overview

This repository is an end-to-end test automation framework using:

- Playwright
- Cucumber (BDD)
- Node.js / JavaScript
- Allure reporting

It follows the Page Object Model (POM) and supports:

- Behavior-Driven Development (BDD)
- Modular architecture
- Centralized browser management
- Screenshots on failure and GWT steps that contain `verify`
- Step-level logging
- Timestamped Allure HTML reports (generated automatically after `npm test`; open manually)

A missing GWT step definition fails the scenario. Cucumber and Allure both mark that test as **Failed**.

---

## Project structure

```text
project-root
├── common/                      # Hooks, browser manager, shared actions
│   ├── browser_manager.js
│   ├── browser_actions.js
│   ├── hooks.js
│   └── allure_helper.js
├── features/                    # Gherkin feature files
├── step_definitions/            # Cucumber step implementations
├── pages/                       # Page Object Model classes
├── utils/                       # Screenshot, JSON, report path helpers
├── resources/                   # config.json, locators.json, allure.properties
├── reports/                     # Timestamped Allure output (created at runtime)
│   └── <YYYYMMDD_HHMMSS>/
│       ├── allure-results/
│       └── allure-report/
├── cucumber.js                  # Cucumber runner + Allure reporter
├── allure_cucumber_reporter.js  # Allure reporter (undefined steps = Failed)
├── playwright.config.js
├── generate-report.js           # Runs tests, then generates the Allure HTML report
├── package.json
└── README.md
```

---

# JavaScript Playwright

This is the stack used by **this repository**.

## Environment setup

Install:

| Tool | Version | Notes |
| --- | --- | --- |
| Node.js | v18 or newer (v16+ minimum) | Includes npm |
| Java (JRE/JDK) | 8 or newer (17+ recommended) | Required by Allure CLI to **generate** the HTML report |
| Git | any recent | Clone the repo |

Confirm:

```bash
node -v
npm -v
java -version
```

## Dependencies

Installed via npm (`package.json`):

- `@cucumber/cucumber`
- `@playwright/test` / Playwright browsers
- `allure-cucumberjs`
- `allure-js-commons`
- `allure-commandline`

Application URL, browser, and headless mode are set in `resources/config.json`.

Screenshot type:

```json
"screenshot": "fullPage"
```

- `fullPage` — capture the complete webpage
- `normal` — capture only the visible viewport

The browser window is maximized to the current machine’s screen size (no hardcoded width/height). This applies to local Windows, Linux VMs, cloud/grid sessions, and headless runs (`SCREEN_WIDTH` / `SCREEN_HEIGHT` can also be set).

## Install

```bash
git clone <repository-url>
cd <project-folder>
npm install
npx playwright install
```

Or:

```bash
npm run setup
```

## Run tests

Run all features (also generates Allure HTML):

```bash
npm test
```

Run one feature file (Cucumber only; use `npm test` when you also want the HTML report):

```bash
npx cucumber-js features/Login.feature
```

Filter by tag:

```bash
npx cucumber-js --tags "@smoke"
```

`npm test` does the following:

1. Creates a new timestamp folder under `reports/` (previous runs are kept)
2. Runs Cucumber + Playwright
3. Writes Allure results to `reports/<YYYYMMDD_HHMMSS>/allure-results/`
4. Generates HTML at `reports/<YYYYMMDD_HHMMSS>/allure-report/index.html`
5. Prints the report path (the browser is **not** opened automatically)

Undefined or ambiguous GWT steps fail the scenario and appear as **Failed** in Allure.

## Allure report (JavaScript)

### Generate (already part of `npm test`)

```bash
npm test
```

Generate HTML from an existing results folder:

```bash
npx allure generate "reports/<YYYYMMDD_HHMMSS>/allure-results" -o "reports/<YYYYMMDD_HHMMSS>/allure-report" --clean
```

Optional single-file HTML (easier to open as a file):

```bash
npx allure generate "reports/<YYYYMMDD_HHMMSS>/allure-results" -o "reports/<YYYYMMDD_HHMMSS>/allure-report" --clean --single-file
```

### Open (manual)

Open this file in a browser:

```text
reports/<YYYYMMDD_HHMMSS>/allure-report/index.html
```

Or serve it with Allure:

```bash
npx allure open "reports/<YYYYMMDD_HHMMSS>/allure-report"
```

```bash
npx allure serve "reports/<YYYYMMDD_HHMMSS>/allure-results"
```

`allure serve` builds a temporary report and opens it.

---

# Java Playwright

Use this section when you run **Java** Playwright + Cucumber + Allure in a Maven (or Gradle) project. It is separate from this Node.js repo.

## Environment setup

Install:

| Tool | Version | Notes |
| --- | --- | --- |
| JDK | 17 or newer recommended | `JAVA_HOME` must point at the JDK |
| Maven | 3.8+ | Or Gradle 8+ |
| Java (same JDK) | 17+ | Also used by Allure CLI |

Confirm:

```bash
java -version
mvn -version
```

On Windows, set `JAVA_HOME` to the JDK folder and add `%JAVA_HOME%\bin` to `PATH`.

## Dependencies (Maven)

Typical `pom.xml` libraries:

- `com.microsoft.playwright:playwright`
- `io.cucumber:cucumber-java`
- `io.cucumber:cucumber-junit` (or `cucumber-testng`)
- `io.qameta.allure:allure-cucumber7-jvm` (match your Cucumber version)
- `io.qameta.allure:allure-maven` (plugin) and/or Allure Commandline

Install Playwright browser binaries once:

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

Or from a small Java main that calls `Playwright.create()`.

## Project layout (typical Java)

```text
src/test/java/          # step definitions, hooks, page objects
src/test/resources/     # .feature files, cucumber.properties, allure.properties
```

`cucumber.properties` / plugin example:

```text
cucumber.plugin=io.qameta.allure.cucumber7jvm.AllureCucumber7Jvm
```

`allure.properties`:

```text
allure.results.directory=target/allure-results
```

Fail on undefined steps (JUnit):

```text
cucumber.publish.quiet=true
cucumber.execution.strict=true
```

Or pass `--strict` / equivalent in the Cucumber runner so missing step definitions fail the build.

## Run tests (Java)

```bash
mvn clean test
```

One feature or tag (example):

```bash
mvn test -Dcucumber.features="src/test/resources/features/Login.feature"
mvn test -Dcucumber.filter.tags="@smoke"
```

Gradle:

```bash
./gradlew test
```

## Allure report (Java)

After tests, results are usually in `target/allure-results` (Maven) or `build/allure-results` (Gradle).

Generate HTML:

```bash
mvn allure:report
```

Output is typically `target/site/allure-maven-plugin/` (or the directory configured in `allure-maven`).

Open with the Allure Maven plugin:

```bash
mvn allure:serve
```

Or with Allure Commandline (Java required):

```bash
allure generate target/allure-results -o target/allure-report --clean
allure open target/allure-report
```

```bash
allure serve target/allure-results
```

---

## Allure contents (this JavaScript framework)

- Scenario and step status (passed / failed / skipped)
- Missing step definitions reported as **Failed**
- Nested Playwright actions as Allure steps (`BrowserActions`)
- Screenshots on GWT steps whose text contains `verify` (case-insensitive)
- Screenshots on failed and undefined steps
- Step logs and failure details as attachments
- Environment info (browser, OS, URL, Node)

### Report locations (JavaScript)

```text
reports/
  20261007_142500/
    allure-report/
    allure-results/
```
