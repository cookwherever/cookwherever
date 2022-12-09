#!/usr/bin/env node
const esbuild = require("esbuild");
const fs = require("fs-extra");
const path = require("path");
const relay = require("./plugin");
const inlineImage = require('esbuild-plugin-inline-image');

const root = path.resolve(__dirname);
const outDir = path.resolve(root, "dist");
const publicDir = path.resolve(root, "public");

let config = "--build";
if (process.argv.length > 2) {
  config = process.argv[2];
}

fs.ensureDirSync(outDir);
fs.emptyDirSync(outDir);
fs.copySync(publicDir, outDir);

const baseConfig = {
  entryPoints: ["src/index.tsx"],
  outdir: outDir,
  bundle: true,
  define: {
    "process.env.NODE_ENV": '"development"',
    global: "window",
  },
  sourcemap: true,
  minify: false,
  loader: {
    '.ts': 'tsx',
    '.tsx': 'tsx',
    '.woff2': 'file',
    '.woff': 'file',
  },
  plugins: [relay(), inlineImage()],
};

try {
  if (config === "--watch") {
    esbuild.build({ ...baseConfig, watch: true });
    serve();
  }

  if (config === "--build") {
    console.log("Building…");
    esbuild.build({
      ...baseConfig,
      minify: true,
    });
  }
} catch (err) {
  process.exit(1);
}

async function serve() {
  const port = process.env.PORT || "3000";

  console.log(`Development server running at http://localhost:${port}/`);
  const servor = require("servor");
  await servor({
    browser: true,
    root: outDir,
    port,
  });
}
