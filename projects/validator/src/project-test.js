var projectReader = require("./project-reader");

var projectPath = process.argv[2];

if (projectPath === undefined) {
  console.log("Informe a pasta raiz do teste.");
  process.exit(1);
}

try {
  var project = projectReader.readProject(projectPath);

  console.log("");
  console.log("Teste:");
  console.log(project.projectName);

  console.log("");
  console.log("Infos:");
  console.log(project.info ? project.info : "Não encontrado");

  console.log("");
  console.log("Triggers:");

  if (project.triggers.length === 0) {
    console.log("Nenhuma trigger encontrada.");
  } else {
    project.triggers.forEach(function (trigger) {
      console.log(trigger);
    });
  }

  console.log("");
  console.log("Variantes:");

  if (project.variants.length === 0) {
    console.log("Nenhuma variante encontrada.");
  } else {
    project.variants.forEach(function (variant) {
      console.log(variant.name + " -> " + variant.path);
    });
  }
} catch (error) {
  console.log("");
  console.log("Erro: " + error.message);
  process.exit(1);
}
