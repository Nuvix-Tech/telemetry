export interface Counter {
    add(amount: number, attributes?: Record<string, any>): void;
}
