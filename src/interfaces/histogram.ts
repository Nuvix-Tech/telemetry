
export interface Histogram {
    record(amount: number, attributes?: Record<string, any>): void;
}
