var fs = require("fs");
var path = require("path");

function getFiles(directoryPath) {
  return fs.readdirSync(directoryPath, {
    withFileTypes: true,
  });
}

function findInfoFile(entries, directoryPath) {
  var info = entries.find(function (entry) {
    return entry.isFile() && entry.name.toLowerCase() === "infos-teste.md";
  });

  if (info === undefined) {
    return null;
  }

  return path.join(directoryPath, info.name);
}

function findTriggerFiles(entries, directoryPath) {
  return entries
    .filter(function (entry) {
      return (
        entry.isFile() &&
        entry.name.toLowerCase().includes("trigger") &&
        path.extname(entry.name).toLowerCase() === ".js"
      );
    })
    .map(function (entry) {
      return path.join(directoryPath, entry.name);
    });
}

function findVariantDirectories(entries, directoryPath) {
  return entries
    .filter(function (entry) {
      return entry.isDirectory() && /^V\d+$/.test(entry.name);
    })
    .map(function (entry) {
      return {
        name: entry.name,
        path: path.join(directoryPath, entry.name),
      };
    });
}

function readProject(projectPath) {
  if (fs.existsSync(projectPath) === false) {
    throw new Error("Pasta do teste não encontrada.");
  }

  var stats = fs.statSync(projectPath);

  if (stats.isDirectory() === false) {
    throw new Error("O caminho informado não é uma pasta de teste.");
  }

  var entries = getFiles(projectPath);

  return {
    projectPath: projectPath,
    projectName: path.basename(projectPath),
    info: findInfoFile(entries, projectPath),
    triggers: findTriggerFiles(entries, projectPath),
    variants: findVariantDirectories(entries, projectPath),
  };
}

module.exports = {
  readProject: readProject,
};
