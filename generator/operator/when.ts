import { IOperator } from "./interface/ioperator";

export class When implements IOperator {
    operation: string;
    constructor(operation: string) {
        this.operation = operation;
    }
    public value(): string {
        return `\t\tWhen ${this.operation}\n`;
    }
}