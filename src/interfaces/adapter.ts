export interface TelemetryAdapter {
  record(event: string, duration: number, metadata?: Record<string, any>): void;
  flush(): Promise<void>;
}