const fs = require('fs');
const path = require('path');

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatRunTimestamp(date = new Date()) {
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `_${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
  );
}

function resolveRunPaths(timestamp) {
  const runDir = path.join(process.cwd(), 'reports', timestamp);
  return {
    timestamp,
    runDir,
    resultsDir: path.join(runDir, 'allure-results'),
    reportDir: path.join(runDir, 'allure-report')
  };
}

function ensureRunFolders(timestamp = process.env.ALLURE_RUN_TIMESTAMP || formatRunTimestamp()) {
  const paths = resolveRunPaths(timestamp);
  fs.mkdirSync(paths.resultsDir, { recursive: true });
  fs.mkdirSync(paths.reportDir, { recursive: true });
  return paths;
}

module.exports = {
  formatRunTimestamp,
  resolveRunPaths,
  ensureRunFolders
};
