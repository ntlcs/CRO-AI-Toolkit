var fs = require("fs");
var path = require("path");
var astParser = require("./ast-parser");

var filePath = process.argv[2];

if (filePath === undefined) {
  console.log("Informe um arquivo JavaScript.");
  process.exit(1);
}

var absolutePath = path.resolve(filePath);

if (fs.existsSync(absolutePath) === false) {
  console.log("Arquivo não encontrado.");
  process.exit(1);
}

var content = fs.readFileSync(absolutePath, "utf8");

var result = astParser.parseJavaScript(content);

if (result.success === false) {
  console.log("JavaScript inválido.");
  console.log("Linha: " + result.error.line);
  console.log("Coluna: " + result.error.column);
  console.log("Erro: " + result.error.message);

  process.exit(1);
}

console.log("JavaScript analisado com sucesso.");
console.log("AST criada.");
console.log("Tipo raiz: " + result.ast.type);
console.log("Nós principais: " + result.ast.body.length);
