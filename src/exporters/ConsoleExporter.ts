import { TelemetryExporter } from "../interfaces/exporter";

export class ConsoleExporter implements TelemetryExporter {
  record(event: string, duration: number, metadata: Record<string, any> = {}): void {
    console.log(`[Telemetry] Event: ${event}, Duration: ${duration}ms`, metadata);
  }
}
