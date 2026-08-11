var fs = require("fs");
var path = require("path");

function getFilesByExtension(files, extension) {
  return files.filter(function (file) {
    return path.extname(file).toLowerCase() === extension;
  });
}

function findFiles(directoryPath) {
  if (fs.existsSync(directoryPath) === false) {
    throw new Error("Diretório não encontrado.");
  }

  var stats = fs.statSync(directoryPath);

  if (stats.isDirectory() === false) {
    throw new Error("O caminho informado não é um diretório.");
  }

  var files = fs.readdirSync(directoryPath);

  var javascriptFiles = getFilesByExtension(files, ".js");
  var cssFiles = getFilesByExtension(files, ".css");

  var infoFile = files.find(function (file) {
    return file.toLowerCase() === "infos-teste.md";
  });

  var directoryName = path.basename(directoryPath);

  return {
    directory: directoryPath,
    directoryName: directoryName,
    javascriptFiles: javascriptFiles.map(function (file) {
      return path.join(directoryPath, file);
    }),
    cssFiles: cssFiles.map(function (file) {
      return path.join(directoryPath, file);
    }),
    info: infoFile ? path.join(directoryPath, infoFile) : null,
  };
}

module.exports = {
  findFiles: findFiles,
};
