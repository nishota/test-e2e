import { Given, When, Then } from "../operator/operator";

export class Scenario {
    description: string;
    operations: Array<Then | When | Given>;
    constructor(description: string) {
        this.description = description;
        this.operations = [];
    }
    private getDescription(): string {
        return `\tScenario: ${this.description}\n`
    }

    public AddOperations(operations: Array<When | Then | Given>): void {
        this.operations.push(...operations)
    }

    public getPart(): string {
        let result: string = this.getDescription();
        for (const iter of this.operations) {
            result += iter.value();
        }
        return result;
    }
}
