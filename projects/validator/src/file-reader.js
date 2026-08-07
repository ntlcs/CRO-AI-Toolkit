var fs = require("fs");
var path = require("path");

function readFile(filePath) {
  if (fs.existsSync(filePath) === false) {
    throw new Error("O caminho informado não existe.");
  }

  var stats = fs.statSync(filePath);

  if (stats.isFile() === false) {
    throw new Error("O caminho informado não é um arquivo.");
  }

  var extension = path.extname(filePath).toLowerCase();

  if (extension !== ".js" && extension !== ".css") {
    throw new Error("Apenas arquivos .js e .css são aceitos nesta etapa.");
  }

  var content = fs.readFileSync(filePath, "utf8");
  var lines = content.split(/\r?\n/);

  return {
    path: filePath,
    name: path.basename(filePath),
    extension: extension,
    size: stats.size,
    totalLines: lines.length,
    content: content,
  };
}

module.exports = {
  readFile: readFile,
};
