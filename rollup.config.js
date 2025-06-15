import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const external = [
  "@opentelemetry/api",
  "@opentelemetry/sdk-metrics",
  "@opentelemetry/exporter-otlp-http",
  "@opentelemetry/resources",
  "@opentelemetry/semantic-conventions",
];

export default [
  // ESM build
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
    external,
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.build.json",
        declaration: false,
        declarationMap: false,
      }),
    ],
  },
  // CommonJS build
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    external,
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.build.json",
        declaration: false,
        declarationMap: false,
      }),
    ],
  },
  // TypeScript declarations
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    external,
    plugins: [dts()],
  },
];
