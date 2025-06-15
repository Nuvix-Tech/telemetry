
export interface Gauge {
    record(amount: number, attributes?: Record<string, any>): void;
}
