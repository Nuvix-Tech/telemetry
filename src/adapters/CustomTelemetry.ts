import { BaseTelemetry } from "../adapter";

export class Telemetry extends BaseTelemetry {

  record(event: string, duration: number, metadata: Record<string, any> = {}): void {
    for (const exporter of this.exporters) {
      exporter.record(event, duration, metadata);
    }
  }
}
