var fileReader = require("./file-reader");
var validator = require("./validator");
var reporter = require("./reporter");

var filePath = process.argv[2];

console.log("CRO Validator v0.1 iniciado.");

if (filePath === undefined) {
  console.log("");
  console.log("Nenhum arquivo foi informado.");
  console.log("");
  console.log("Use:");
  console.log('npm run validate -- "C:\\caminho\\arquivo.js"');
  process.exit(1);
}

try {
  var fileData = fileReader.readFile(filePath);
  var issues = [];

  if (fileData.extension === ".js") {
    issues = validator.validateJavaScript(fileData.content);
  }

  reporter.printReport(fileData, issues);

  if (
    issues.some(function (issue) {
      return issue.severity === "error";
    })
  ) {
    process.exitCode = 1;
  }
} catch (error) {
  console.log("");
  console.log("Erro: " + error.message);
  process.exit(1);
}
