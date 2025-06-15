# Nuvix Telemetry 📊

A lightweight and extensible telemetry system with adapter-based architecture for collecting performance metrics, supporting OpenTelemetry integration and multiple telemetry backends.

## 🚀 Features

- **Adapter System** – Easily switch between telemetry providers with a unified interface.
- **OpenTelemetry Ready** – Full OpenTelemetry integration with OTLP HTTP exporter.
- **Multiple Metric Types** – Counters, Gauges, Histograms, and UpDownCounters.
- **Async Support** – Collect and export telemetry data asynchronously.
- **TypeScript First** – Full TypeScript support with comprehensive type definitions.

## 📦 Installation

```sh
npm install @nuvix/telemetry
```

The package supports both CommonJS and ES modules, with automatic format detection based on your project setup.

## 🛠 Usage

### 1️⃣ Using OpenTelemetry Adapter

```typescript
import { OpenTelemetry } from "@nuvix/telemetry";

const telemetry = new OpenTelemetry(
  "http://localhost:4318/v1/metrics", // OTLP endpoint
  "my-service-namespace",
  "my-service",
  "instance-1",
);

// Create different metric types
const requestCounter = telemetry.createCounter(
  "http_requests_total",
  "requests",
  "Total number of HTTP requests",
);

const responseTimeHistogram = telemetry.createHistogram(
  "http_request_duration_ms",
  "ms",
  "HTTP request duration in milliseconds",
);

const activeConnectionsGauge = telemetry.createGauge(
  "active_connections",
  "connections",
  "Number of active connections",
);

const queueSizeUpDownCounter = telemetry.createUpDownCounter(
  "queue_size",
  "items",
  "Number of items in queue",
);

// Record metrics
requestCounter.add(1, { method: "GET", route: "/api/users" });
responseTimeHistogram.record(150, { method: "GET", status: "200" });
activeConnectionsGauge.record(42);
queueSizeUpDownCounter.add(5); // Add items to queue
queueSizeUpDownCounter.add(-2); // Remove items from queue

// Collect metrics
await telemetry.collect();
```

### 2️⃣ Using None Adapter (No-op)

```typescript
import { None } from "@nuvix/telemetry";

// Useful for testing or when telemetry is disabled
const telemetry = new None();

const counter = telemetry.createCounter("test_counter");
counter.add(1); // No-op, does nothing

await telemetry.collect(); // Always returns true
```

## � Available Adapters

| Adapter         | Description                                            | Use Case                   |
| --------------- | ------------------------------------------------------ | -------------------------- |
| `OpenTelemetry` | Full OpenTelemetry integration with OTLP HTTP exporter | Production monitoring      |
| `None`          | No-op adapter that discards all metrics                | Testing/disabled telemetry |

## 📊 Metric Types

The library supports all standard OpenTelemetry metric types:

### Counter

Monotonically increasing values (e.g., request count, error count).

```typescript
const counter = adapter.createCounter(
  "requests_total",
  "requests",
  "Total requests",
);
counter.add(1, { endpoint: "/api/data" });
```

### Histogram

Statistical distribution of values (e.g., request duration, response size).

```typescript
const histogram = adapter.createHistogram(
  "request_duration",
  "ms",
  "Request duration",
);
histogram.record(123.45, { method: "POST" });
```

### Gauge

Point-in-time values that can go up or down (e.g., memory usage, temperature).

```typescript
const gauge = adapter.createGauge(
  "memory_usage",
  "bytes",
  "Current memory usage",
);
gauge.record(1024 * 1024 * 512); // 512MB
```

### UpDownCounter

Values that can increase or decrease (e.g., active connections, queue size).

```typescript
const upDownCounter = adapter.createUpDownCounter(
  "active_sessions",
  "sessions",
  "Active user sessions",
);
upDownCounter.add(1); // User logged in
upDownCounter.add(-1); // User logged out
```

## 🏗️ Architecture

The library uses an adapter pattern to provide a unified interface for different telemetry backends:

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Application   │───▶│   Adapter    │───▶│   Backend       │
│                 │    │  Interface   │    │ (OpenTelemetry) │
└─────────────────┘    └──────────────┘    └─────────────────┘
```

The `Adapter` interface defines methods for creating different metric types:

- `createCounter()` - For monotonically increasing values
- `createHistogram()` - For statistical distributions
- `createGauge()` - For point-in-time measurements
- `createUpDownCounter()` - For values that can increase/decrease
- `collect()` - For triggering metric collection

## 🧪 Development

```sh
# Build the project (generates both CJS and ESM outputs)
npm run build

# Build in watch mode
npm run build:watch

# Clean build artifacts
npm run clean

# Run linting
npm run lint

# Run tests
npm run test
```

The build process generates:

- `dist/index.cjs.js` - CommonJS build
- `dist/index.esm.js` - ES modules build
- `dist/index.d.ts` - TypeScript declarations
- Source maps for both builds

## 📦 Dependencies

- `@opentelemetry/api` - OpenTelemetry API
- `@opentelemetry/sdk-metrics` - OpenTelemetry SDK for metrics
- `@opentelemetry/exporter-otlp-http` - OTLP HTTP exporter

## 📝 License

Licensed under the BSD 3-Clause License.

## 🔧 Future Roadmap

- Additional adapter implementations (Console, Database, HTTP)
- Advanced metric aggregation features
- Distributed tracing support
- Custom exporter configurations

## ✨ Contributing

Feel free to open an issue or PR! 🚀
