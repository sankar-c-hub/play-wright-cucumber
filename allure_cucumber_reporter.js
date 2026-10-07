const AllureCucumberReporter = require('allure-cucumberjs/reporter');
const { Status } = require('allure-js-commons');
const { TestStepResultStatus } = require('@cucumber/messages');

/**
 * Allure maps Cucumber UNDEFINED/AMBIGUOUS to an empty status, then treats
 * the scenario as passed. Map those steps to FAILED so the report matches
 * a missing step definition.
 */
class AllureCucumberReporterFailOnUndefined extends AllureCucumberReporter {
  parseStatus(stepResult) {
    if (
      stepResult.status === TestStepResultStatus.UNDEFINED ||
      stepResult.status === TestStepResultStatus.AMBIGUOUS
    ) {
      if (!stepResult.message) {
        stepResult.message =
          stepResult.status === TestStepResultStatus.AMBIGUOUS
            ? 'Ambiguous step: more than one matching step definition.'
            : 'Undefined step: no matching step definition.';
      }
      return Status.FAILED;
    }

    return super.parseStatus(stepResult);
  }
}

module.exports = AllureCucumberReporterFailOnUndefined;
