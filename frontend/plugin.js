var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/index.ts
var fs = __toModule(require("fs"));

// src/compile.ts
var import_graphql = __toModule(require("graphql"));
var crypto = __toModule(require("crypto"));
var path = __toModule(require("path"));
var defaultOptions = {
  devMode: true,
  buildCommand: "relay-compiler",
  artifactDirectory: "__generated__",
  module: "esm"
};
function compile(file, contents) {
  opts = defaultOptions;
  const imports = [];
  contents = contents.replace(/graphql`([\s\S]*?)`/gm, (_match, query) => {
    const ast = (0, import_graphql.parse)(query);
    if (ast.definitions.length === 0) {
      throw new Error("Unexpected empty graphql tag.");
    }
    const definition = ast.definitions[0];
    if (definition.kind !== "FragmentDefinition" && definition.kind !== "OperationDefinition") {
      throw new Error("Expected a fragment, mutation, query, or subscription, got `" + definition.kind + "`.");
    }
    const name = definition.name && definition.name.value;
    if (!name) {
      throw new Error("GraphQL operations and fragments must contain names");
    }
    const hash = crypto.createHash("md5").update((0, import_graphql.print)(definition), "utf8").digest("hex");
    const id = `graphql__${hash}`;
    const importFile = `${name}.graphql.ts`;
    let result = id;

    imports.push(`import ${id} from "./__generated__/${importFile}";`);

    if (opts.devMode) {
      const error = getErrorMessage(name, opts.buildCommand);
      const condition = opts.condition ? `${opts.condition} && ` : "";
      if (opts.module === "cjs") {
        result = `${id} !== void 0 ? ${id} : (${id} = ${result}, ${condition}${id}.hash && ${id}.hash !== "${hash}" && console.error("${error}"), ${id})`;
      } else if (opts.module == "esm") {
        result = `(${condition}${id}.hash && ${id}.hash !== "${hash}" && console.error("${error}"), ${id})`;
      }
    }
    return result;
  });
  return (imports.length > 0 ? `${imports.join("\n")}
` : "") + contents;
}
function getErrorMessage(name, buildCommand) {
  return `The definition of '${name}' appears to have changed. Run \`${buildCommand}\` to update the generated files to receive the expected data.`;
}
function getRelativeImportPath(fileName, artifactDirectory, fileToRequire) {
  console.log(fileName, artifactDirectory, fileToRequire);
  const relative2 = path.relative(path.dirname(fileName), path.resolve(artifactDirectory));
  const relativeReference = relative2.length === 0 || !relative2.startsWith(".") ? "./" : "";
  return relativeReference + path.join(relative2, fileToRequire);
}

// src/index.ts
function createRelayPlugin(opts) {
  return {
    name: "relay",
    setup(build) {
      build.onLoad({filter: /\.tsx/}, async (args) => {
        let contents = await fs.promises.readFile(args.path, "utf8");
        if (contents.includes("graphql`")) {
          contents = compile(args.path, contents);
        }
        return {
          contents,
          loader: "tsx"
        };
      });
    }
  };
}

// src/index.cjs.ts
module.exports = createRelayPlugin;
