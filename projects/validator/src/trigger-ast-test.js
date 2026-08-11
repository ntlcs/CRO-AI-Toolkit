var fs = require("fs");
var path = require("path");
var triggerAst = require("./trigger-ast");

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

var result = triggerAst.parseTrigger(content);

if (result.success === false) {
  console.log("");
  console.log("Trigger inválida.");

  if (result.error) {
    console.log("Linha: " + result.error.line);

    console.log("Coluna: " + result.error.column);

    console.log("Erro: " + result.error.message);
  }

  process.exit(1);
}

console.log("");
console.log("Trigger analisada com sucesso.");
console.log("");
console.log("Formato: " + result.mode);
console.log("AST: OK");
console.log("Nós principais: " + result.ast.body.length);
