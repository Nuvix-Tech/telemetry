import { Counter } from "./interfaces/counter";
import { Gauge } from "./interfaces/gauge";
import { Histogram } from "./interfaces/histogram";
import { UpDownCounter } from "./interfaces/up-down-counter";


export interface Adapter {
  createCounter(
    name: string,
    unit?: string | null,
    description?: string | null,
    advisory?: any[]
  ): Counter;

  createHistogram(
    name: string,
    unit?: string | null,
    description?: string | null,
    advisory?: any[]
  ): Histogram;

  createGauge(
    name: string,
    unit?: string | null,
    description?: string | null,
    advisory?: any[]
  ): Gauge;

  createUpDownCounter(
    name: string,
    unit?: string | null,
    description?: string | null,
    advisory?: any[]
  ): UpDownCounter;

  collect(): boolean;
}