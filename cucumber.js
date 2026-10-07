const os = require('os');
const JsonUtility = require('./utils/json_utility.js');
const { ensureRunFolders } = require('./utils/report_paths.js');

const isParallelEnabled = JsonUtility.getConfigValue('parallel') === true;
const config = JsonUtility.loadJson('config.json');
const { resultsDir } = ensureRunFolders();

module.exports = {
  default: {
    require: [
      'allure-cucumberjs',
      './step_definitions/**/*.js',
      './common/**/*.js'
    ],
    paths: ['features/**/*.feature'],

    ...(isParallelEnabled && { parallel: 5 }),

    strict: true,

    format: [
      'progress',
      './allure_cucumber_reporter.js'
    ],
    formatOptions: {
      resultsDir,
      environmentInfo: {
        Browser: config.browser || 'Chrome',
        Platform: `${os.platform()} ${os.release()}`,
        Environment: config.url || '',
        Node: process.version,
        Project: config.projectname || ''
      }
    },

    publishQuiet: true
  }
};
