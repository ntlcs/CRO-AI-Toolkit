var directoryReader = require("./directory-reader");
var fileReader = require("./file-reader");
var validator = require("./validator");
var cssValidator = require("./css-validator");
var reporter = require("./reporter");

var directoryPath = process.argv[2];

console.log("====================================");
console.log("CRO Validator v0.4");
console.log("====================================");

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

  var totalErrors = 0;
  var totalWarnings = 0;

  console.log("");
  console.log("Pasta:");
  console.log(directoryPath);

  if (files.javascript) {
    var javascriptData = fileReader.readFile(files.javascript);

    var javascriptIssues = validator.validateJavaScript(javascriptData.content);

    console.log("");
    console.log("====================================");
    console.log("JAVASCRIPT");
    console.log("====================================");

    var javascriptResult = reporter.printReport(
      javascriptData,
      javascriptIssues,
    );

    totalErrors += javascriptResult.errors;
    totalWarnings += javascriptResult.warnings;
  } else {
    console.log("");
    console.log("JavaScript não encontrado.");
  }

  if (files.css) {
    var cssData = fileReader.readFile(files.css);

    var cssIssues = cssValidator.validateCss(cssData.content);

    console.log("");
    console.log("====================================");
    console.log("CSS");
    console.log("====================================");

    var cssResult = reporter.printReport(cssData, cssIssues);

    totalErrors += cssResult.errors;
    totalWarnings += cssResult.warnings;
  } else {
    console.log("");
    console.log("CSS não encontrado.");
  }

  console.log("");
  console.log(
    "infos-teste.md: " + (files.info ? "ENCONTRADO" : "NÃO ENCONTRADO"),
  );

  console.log("");
  console.log("====================================");
  console.log("RESULTADO GERAL");
  console.log("====================================");

  console.log("Erros: " + totalErrors);
  console.log("Avisos: " + totalWarnings);

  var finalStatus = reporter.getStatus(totalErrors, totalWarnings);

  console.log("");
  console.log(finalStatus);
  console.log("====================================");

  if (totalErrors > 0) {
    process.exitCode = 1;
  }
} catch (error) {
  console.log("");
  console.log("Erro: " + error.message);
  process.exit(1);
}
