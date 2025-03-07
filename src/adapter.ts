import { TelemetryAdapter } from "./interfaces/adapter";
import { TelemetryExporter } from "./interfaces/exporter";

export class BaseTelemetry implements TelemetryAdapter {
  protected exporters: TelemetryExporter[];

  constructor(exporters: TelemetryAdapter[] = []) {
    this.exporters = exporters;
  }

  record(event: string, duration: number, metadata: Record<string, any> = {}): void {
    for (const exporter of this.exporters) {
      exporter.record(event, duration, metadata);
    }
  }

  async flush(): Promise<void> {
    for (const exporter of this.exporters) {
      if (exporter.flush) {
        await exporter.flush();
      }
    }
  }
}
