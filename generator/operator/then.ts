import { IOperator } from "./interface/ioperator";

export class Then implements IOperator {
    operation: string;
    constructor(operation: string) {
        this.operation = operation;
    }
    public value(): string {
        return `\t\tThen ${this.operation}\n`;
    }
}