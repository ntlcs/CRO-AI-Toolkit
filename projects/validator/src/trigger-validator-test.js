var fs = require("fs");
var path = require("path");
var triggerValidator = require("./trigger-validator");

function printIssues(issues) {
  if (issues.length === 0) {
    console.log("Nenhuma ocorrência.");
    return;
  }

  issues.forEach(function (issue) {
    console.log(issue.severity.toUpperCase() + " | " + issue.rule);

    console.log(issue.message);

    console.log("");
  });
}

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

var result = triggerValidator.validateTrigger(content);

console.log("");
console.log("====================================");
console.log("TRIGGER VALIDATOR");
console.log("====================================");

console.log("");
console.log("Arquivo: " + path.basename(absolutePath));

console.log("Formato: " + (result.mode ? result.mode : "inválido"));

console.log("AST: " + (result.success ? "OK" : "FALHA"));

console.log("");
console.log("OCORRÊNCIAS");
console.log("");

printIssues(result.issues);

console.log("====================================");
console.log("RESUMO");
console.log("====================================");

console.log("Erros: " + result.errors);

console.log("Avisos: " + result.warnings);

console.log("Informações: " + result.infos);

console.log("");
console.log("Resultado: " + result.status);

if (result.errors > 0) {
  process.exitCode = 1;
}
