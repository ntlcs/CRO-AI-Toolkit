var fs = require("fs");
var path = require("path");
var triggerAst = require("./trigger-ast");
var triggerScanner = require("./trigger-scanner");
var triggerRules = require("./trigger-rules");

var filePath = process.argv[2];

if (filePath === undefined) {
  console.log("Informe um arquivo de trigger.");

  process.exit(1);
}

var absolutePath = path.resolve(filePath);

if (fs.existsSync(absolutePath) === false) {
  console.log("Arquivo não encontrado.");

  process.exit(1);
}

var content = fs.readFileSync(absolutePath, "utf8");

var astResult = triggerAst.parseTrigger(content);

if (astResult.success === false) {
  console.log("");
  console.log("Trigger inválida.");
  process.exit(1);
}

var scan = triggerScanner.scanTrigger(astResult.ast);

var issues = triggerRules.applyTriggerRules(scan);

console.log("");
console.log("Trigger Rules");
console.log("");
console.log("Arquivo: " + path.basename(absolutePath));
console.log("Formato: " + astResult.mode);

console.log("");

if (issues.length === 0) {
  console.log("Nenhuma ocorrência.");

  process.exit(0);
}

issues.forEach(function (issue) {
  console.log(issue.severity.toUpperCase() + " | " + issue.rule);

  console.log(issue.message);

  console.log("");
});
