import { IOperator } from "./interface/ioperator";

export class Given implements IOperator {
    operation: string;
    constructor(operation: string) {
        this.operation = operation;
    }
    public value(): string {
        return `\t\tGiven ${this.operation}\n`;
    }
}