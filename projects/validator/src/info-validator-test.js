var fs = require("fs");
var path = require("path");
var infoValidator = require("./info-validator");

function countBySeverity(issues, severity) {
  return issues.filter(function (issue) {
    return issue.severity === severity;
  }).length;
}

var filePath = process.argv[2];

if (filePath === undefined) {
  console.log("Informe um arquivo infos-teste.md.");

  process.exit(1);
}

var absolutePath = path.resolve(filePath);

if (fs.existsSync(absolutePath) === false) {
  console.log("Arquivo não encontrado.");

  process.exit(1);
}

var content = fs.readFileSync(absolutePath, "utf8");

var issues = infoValidator.validateInfo(content);

console.log("");
console.log("====================================");
console.log("INFOS VALIDATOR");
console.log("====================================");

console.log("");
console.log("Arquivo: " + path.basename(absolutePath));

console.log("");

issues.forEach(function (issue) {
  console.log(issue.severity.toUpperCase() + " | " + issue.rule);

  console.log(issue.message);

  console.log("");
});

var errors = countBySeverity(issues, "error");

var warnings = countBySeverity(issues, "warning");

var infos = countBySeverity(issues, "info");

console.log("Erros: " + errors);
console.log("Avisos: " + warnings);
console.log("Informações: " + infos);

if (errors > 0) {
  process.exitCode = 1;
}
