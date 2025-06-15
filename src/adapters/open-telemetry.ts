import { Counter } from "../interfaces/counter";
import { Gauge } from "../interfaces/gauge";
import { Histogram } from "../interfaces/histogram";
import { UpDownCounter } from "../interfaces/up-down-counter";
import { Adapter } from "../adapter";
import { metrics } from "@opentelemetry/api";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { OTLPMetricExporter } from "@opentelemetry/exporter-otlp-http";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";

export class OpenTelemetry implements Adapter {
  private meter: any;
  private meterStorage: Map<string, Map<string, any>> = new Map();

  constructor(
    endpoint: string,
    serviceNamespace: string,
    serviceName: string,
    serviceInstanceId: string,
  ) {
    this.initMeter(endpoint, serviceNamespace, serviceName, serviceInstanceId);
  }

  private initMeter(
    endpoint: string,
    serviceNamespace: string,
    serviceName: string,
    serviceInstanceId: string,
  ): void {
    const exporter = new OTLPMetricExporter({
      url: endpoint,
    });

    const meterProvider = new MeterProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAMESPACE]: serviceNamespace,
        [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: serviceInstanceId,
      }),
      readers: [
        new PeriodicExportingMetricReader({
          exporter: exporter as any, // Type assertion to match expected type
          exportIntervalMillis: 1000,
        }),
      ],
    });

    metrics.setGlobalMeterProvider(meterProvider);
    this.meter = meterProvider.getMeter("cloud");
  }

  private createMeter<T>(type: string, name: string, creator: () => T): T {
    if (!this.meterStorage.has(type)) {
      this.meterStorage.set(type, new Map());
    }

    const typeStorage = this.meterStorage.get(type)!;
    if (!typeStorage.has(name)) {
      typeStorage.set(name, creator());
    }

    return typeStorage.get(name);
  }

  createCounter(
    name: string,
    unit?: string,
    description?: string,
    _advisory: any[] = [],
  ): Counter {
    const counter = this.createMeter("Counter", name, () =>
      this.meter.createCounter(name, { unit, description }),
    );

    return {
      add: (amount: number, attributes: Record<string, any> = {}) => {
        counter.add(amount, attributes);
      },
    } as Counter;
  }

  createHistogram(
    name: string,
    unit?: string,
    description?: string,
    _advisory: any[] = [],
  ): Histogram {
    const histogram = this.createMeter("Histogram", name, () =>
      this.meter.createHistogram(name, { unit, description }),
    );

    return {
      record: (amount: number, attributes: Record<string, any> = {}) => {
        histogram.record(amount, attributes);
      },
    } as Histogram;
  }

  createGauge(
    name: string,
    unit?: string,
    description?: string,
    _advisory: any[] = [],
  ): Gauge {
    const gauge = this.createMeter("Gauge", name, () =>
      this.meter.createGauge(name, { unit, description }),
    );

    return {
      record: (amount: number, attributes: Record<string, any> = {}) => {
        gauge.record(amount, attributes);
      },
    } as Gauge;
  }

  createUpDownCounter(
    name: string,
    unit?: string,
    description?: string,
    _advisory: any[] = [],
  ): UpDownCounter {
    const upDownCounter = this.createMeter("UpDownCounter", name, () =>
      this.meter.createUpDownCounter(name, { unit, description }),
    );

    return {
      add: (amount: number, attributes: Record<string, any> = {}) => {
        upDownCounter.add(amount, attributes);
      },
    } as UpDownCounter;
  }

  async collect(): Promise<boolean> {
    try {
      await this.meter.collect();
      return true;
    } catch {
      return false;
    }
  }
}
