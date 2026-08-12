var fs = require("fs");
var path = require("path");
var projectReader = require("./project-reader");
var infoValidator = require("./info-validator");
var triggerValidator = require("./trigger-validator");

function countBySeverity(issues, severity) {
  return issues.filter(function (issue) {
    return issue.severity === severity;
  }).length;
}

function loadCrossValidator() {
  return require("./cross-validator");
}

var inputPath = process.argv[2];

if (inputPath === undefined) {
  console.log("Nenhuma pasta de teste foi informada.");
  process.exit(1);
}

if (fs.existsSync(inputPath) === false) {
  console.log("Pasta não encontrada.");
  process.exit(1);
}

try {
  var project = projectReader.readProject(inputPath);

  if (project.info === null) {
    console.log("infos-teste.md não encontrado.");

    process.exit(1);
  }

  var infoContent = fs.readFileSync(project.info, "utf8");

  var infoData = infoValidator.extractInfo(infoContent);

  var triggerResults = [];

  project.triggers.forEach(function (triggerPath) {
    var triggerContent = fs.readFileSync(triggerPath, "utf8");

    triggerResults.push(triggerValidator.validateTrigger(triggerContent));
  });

  var crossValidator = loadCrossValidator();

  var issues = crossValidator.validateCross(project, infoData, triggerResults);

  console.log("");
  console.log("Cross Validator");
  console.log("");

  console.log("Teste: " + project.projectName);

  console.log("");

  if (issues.length === 0) {
    console.log("Nenhuma ocorrência.");
  } else {
    issues.forEach(function (issue) {
      console.log(issue.severity.toUpperCase() + " | " + issue.rule);

      console.log(issue.message);

      console.log("");
    });
  }

  var errors = countBySeverity(issues, "error");

  var warnings = countBySeverity(issues, "warning");

  var infos = countBySeverity(issues, "info");

  console.log("Erros: " + errors);

  console.log("Avisos: " + warnings);

  console.log("Informações: " + infos);

  console.log("");

  if (errors > 0) {
    console.log("Resultado: REPROVADO");
  } else if (warnings > 0) {
    console.log("Resultado: APROVADO COM RESSALVAS");
  } else {
    console.log("Resultado: APROVADO");
  }
} catch (error) {
  console.log("Erro: " + error.message);

  process.exit(1);
}
