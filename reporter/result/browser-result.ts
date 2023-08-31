import TestResult from "./test-result-enum";

export class BrowserResult {
    browser: string;
    result: TestResult;
    date: Date;
    tester: string
    constructor(browser: string, result: TestResult, date: Date, tester: string) {
        this.browser = browser;
        this.result = result;
        this.date = date;
        this.tester = tester;
    }
}
