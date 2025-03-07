import { TelemetryAdapter } from "../interfaces/adapter";

export class NoOpTelemetry implements TelemetryAdapter {
  record(): void {}
  async flush(): Promise<void> {}
}