import { Given, When, Then } from "../operator/operator";

export class Background {
    description: string;
    operations: Array<When | Then | Given>;
    constructor(description: string) {
        this.description = description;
        this.operations = [];
    }

    private getDescription(): string{
        return `\tBackground: ${this.description}\n`;
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