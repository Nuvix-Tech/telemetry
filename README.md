# Nuvix Telemetry 📊

A lightweight and extensible telemetry system for logging performance metrics, supporting multiple exporters and future OpenTelemetry integration.

## 🚀 Features

- **Adapter System** – Easily switch between telemetry providers.
- **Multiple Exporters** – Console, Database, and more.
- **Async Support** – Flush telemetry data in batches.
- **Future-Proof** – OpenTelemetry integration ready.

## 📦 Installation

```sh
npm install @nuvix/telemetry
```

## 🛠 Usage

### 1️⃣ Basic Setup

```javascript
import { Telemetry } from "@nuvix/telemetry";
import { ConsoleExporter } from "@nuvix/telemetry";

const telemetry = new Telemetry([new ConsoleExporter()]);

telemetry.record("cache_hit", 25, { key: "user:123" });
```

### Using Multiple Exporters

```javascript
import { Telemetry, ConsoleExporter, DatabaseExporter } from "@nuvix/telemetry";

const telemetry = new Telemetry([
  new ConsoleExporter(),
  new DatabaseExporter()
]);

telemetry.record("request", 40, { route: "/api/users" });
await telemetry.flush();
```

## 📤 Available Exporters

| Exporter          | Description                              |
|-------------------|------------------------------------------|
| ConsoleExporter   | Logs telemetry data to console.          |
| DatabaseExporter  | (Coming Soon) Stores telemetry data in a database. |
| HTTPExporter      | (Coming Soon) Sends data to an external API. |

## 📝 License

Licensed under the BSD 3-Clause License.

## 🔧 Future Roadmap

- OpenTelemetry integration
- HTTP Exporter
- Distributed tracing support

## ✨ Contributing

Feel free to open an issue or PR! 🚀

