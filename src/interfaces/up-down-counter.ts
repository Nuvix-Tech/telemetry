export interface UpDownCounter {
  add(amount: number, attributes?: Record<string, any>): void;
}
