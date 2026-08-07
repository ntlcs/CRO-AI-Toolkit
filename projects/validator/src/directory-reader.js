var fs = require("fs");
var path = require("path");

function findFiles(directoryPath) {
  if (fs.existsSync(directoryPath) === false) {
    throw new Error("Diretório não encontrado.");
  }

  var stats = fs.statSync(directoryPath);

  if (stats.isDirectory() === false) {
    throw new Error("O caminho informado não é um diretório.");
  }

  var files = fs.readdirSync(directoryPath);

  var result = {
    directory: directoryPath,
    javascript: null,
    css: null,
    info: null,
  };

  files.forEach(function (file) {
    var extension = path.extname(file).toLowerCase();

    if (extension === ".js") {
      result.javascript = path.join(directoryPath, file);
    }

    if (extension === ".css") {
      result.css = path.join(directoryPath, file);
    }

    if (file.toLowerCase() === "infos-teste.md") {
      result.info = path.join(directoryPath, file);
    }
  });

  return result;
}

module.exports = {
  findFiles: findFiles,
};
