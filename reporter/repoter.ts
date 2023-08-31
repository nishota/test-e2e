const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'simple',
  jsonDir: '../cypress/reports/json', // 手順1で指定したcucumberJsonの出力先
  output: '../cypress/reports/report.html', // 任意の出力先
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  ignoreBadJsonFile: true,
};

reporter.generate(options);

// TODO: コンパイルしたjsファイルどこ？
// TODO: あとでGeneratorに組み込む