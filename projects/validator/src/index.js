var directoryReader = require("./directory-reader");
var fileReader = require("./file-reader");
var validator = require("./validator");
var cssValidator = require("./css-validator");
var reporter = require("./reporter");

var directoryPath = process.argv[2];

console.log("CRO Validator v0.3 iniciado.");

if (directoryPath === undefined) {
  console.log("");
  console.log("Nenhuma pasta foi informada.");
  console.log("");
  console.log("Use:");
  console.log('npm run validate -- "C:\\caminho\\V1"');
  process.exit(1);
}

try {
  var files = directoryReader.findFiles(directoryPath);
  var hasErrors = false;

  console.log("");
  console.log("Pasta encontrada:");
  console.log(directoryPath);

  if (files.javascript) {
    var javascriptData = fileReader.readFile(files.javascript);

    var javascriptIssues = validator.validateJavaScript(javascriptData.content);

    console.log("");
    console.log("=== JAVASCRIPT ===");

    reporter.printReport(javascriptData, javascriptIssues);

    if (
      javascriptIssues.some(function (issue) {
        return issue.severity === "error";
      })
    ) {
      hasErrors = true;
    }
  } else {
    console.log("");
    console.log("JavaScript não encontrado.");
  }

  if (files.css) {
    var cssData = fileReader.readFile(files.css);

    var cssIssues = cssValidator.validateCss(cssData.content);

    console.log("");
    console.log("=== CSS ===");

    reporter.printReport(cssData, cssIssues);

    if (
      cssIssues.some(function (issue) {
        return issue.severity === "error";
      })
    ) {
      hasErrors = true;
    }
  } else {
    console.log("");
    console.log("CSS não encontrado.");
  }

  if (files.info) {
    console.log("");
    console.log("infos-teste.md encontrado:");
    console.log(files.info);
  } else {
    console.log("");
    console.log("infos-teste.md não encontrado.");
  }

  console.log("");
  console.log("==============================");

  if (hasErrors) {
    console.log("Resultado geral: REPROVADO");
    process.exitCode = 1;
  } else {
    console.log("Resultado geral: APROVADO");
  }

  console.log("==============================");
} catch (error) {
  console.log("");
  console.log("Erro: " + error.message);
  process.exit(1);
}
