const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { formatRunTimestamp, ensureRunFolders } = require('./utils/report_paths.js');

function run(command, extraEnv = {}) {
  return spawnSync(command, {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd(),
    env: {
      ...process.env,
      ...extraEnv
    }
  });
}

function main() {
  const timestamp = formatRunTimestamp();
  const { resultsDir, reportDir, runDir } = ensureRunFolders(timestamp);

  console.log(`Allure run folder: ${runDir}`);

  const cucumber = run('npx cucumber-js', {
    ALLURE_RUN_TIMESTAMP: timestamp,
    ALLURE_RESULTS_DIR: resultsDir
  });
  const cucumberStatus = cucumber.status ?? 1;

  const hasResults =
    fs.existsSync(resultsDir) && fs.readdirSync(resultsDir).length > 0;

  if (!hasResults) {
    console.error('No Allure results were produced. Skipping report generation.');
    process.exit(cucumberStatus);
  }

  let generate = run(
    `npx allure generate "${resultsDir}" -o "${reportDir}" --clean --single-file`
  );

  if (generate.status !== 0) {
    generate = run(
      `npx allure generate "${resultsDir}" -o "${reportDir}" --clean`
    );
  }

  if (generate.status !== 0) {
    console.error(
      'Failed to generate the Allure report. Allure CLI requires Java (JRE 8+).'
    );
    process.exit(cucumberStatus !== 0 ? cucumberStatus : generate.status);
  }

  const reportPath = path.join(reportDir, 'index.html');
  console.log(`Allure report generated at: ${reportPath}`);
  console.log('Open the report manually in a browser when you want to view it.');
  process.exit(cucumberStatus);
}

main();
