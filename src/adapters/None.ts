import { Counter } from "../interfaces/counter";
import { Gauge } from "../interfaces/gauge";
import { Histogram } from "../interfaces/histogram";
import { UpDownCounter } from "../interfaces/up-down-counter";
import { Adapter } from "../adapter";

export class None implements Adapter {
  public createCounter(_name: string, _unit?: string, _description?: string, _advisory: any[] = []): Counter {
    return new class implements Counter {
      public add(_amount: number, _attributes: any = {}): void {
      }
    };
  }

  public createHistogram(_name: string, _unit?: string, _description?: string, _advisory: any[] = []): Histogram {
    return new class implements Histogram {
      public record(_amount: number, _attributes: any = {}): void {
      }
    };
  }

  public createGauge(_name: string, _unit?: string, _description?: string, _advisory: any[] = []): Gauge {
    return new class implements Gauge {
      public record(_amount: number, _attributes: any = {}): void {
      }
    };
  }

  public createUpDownCounter(_name: string, _unit?: string, _description?: string, _advisory: any[] = []): UpDownCounter {
    return new class implements UpDownCounter {
      public add(_amount: number, _attributes: any = {}): void {
      }
    };
  }

  public collect(): boolean {
    return true;
  }
}