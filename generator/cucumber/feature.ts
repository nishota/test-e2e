import { Given, When, Then } from "../operator/operator";
import { Background } from './background';
import { Scenario } from './scenario';

export class Feature {
    name: string;
    description: string;
    background: Background | undefined;
    scenarios: Array<Scenario>;
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.scenarios = [];
    }
    private getName(): string {
        return `Feature: ${this.name}\n`
    }
    private getDescription(): string {
        return `${this.description}\n`;
    }
    public getPart(): string {
        return `${this.getName()}${this.getDescription()}`;
    }

    public setBackground(description: string, operations: Array<When | Then | Given>): void {
        if (!this.background) {
            this.background = new Background(description);
        }
        this.background.AddOperations(operations);
    }

    public setScenarios(description: string, operations: Array<When | Then | Given>): void {
        const foundScenario = this.scenarios.find(x => x.description === description);
        if (foundScenario) {
            foundScenario.AddOperations(operations);
        }
        else {
            const scenario = new Scenario(description);
            scenario.AddOperations(operations);
            this.scenarios.push(scenario);
        }
    }
}
