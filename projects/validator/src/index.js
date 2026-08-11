var fs = require("fs");
var path = require("path");
var directoryReader = require("./directory-reader");
var projectReader = require("./project-reader");
var fileReader = require("./file-reader");
var validator = require("./validator");
var cssValidator = require("./css-validator");
var structureValidator = require("./structure-validator");
var astValidator = require("./ast-validator");
var listenerValidator = require("./listener-validator");
var observerValidator = require("./observer-validator");
var triggerValidator = require("./trigger-validator");
var reporter = require("./reporter");

function getPrimaryFile(files) {
  var preferred = files.find(function (filePath) {
    var fileName = path.basename(filePath);

    return fileName.indexOf(" ") === -1;
  });

  if (preferred) {
    return preferred;
  }

  return files[0];
}

function mergeIssues(firstIssues, secondIssues) {
  return firstIssues.concat(secondIssues);
}

function isVariantDirectory(directoryPath) {
  var directoryName = path.basename(directoryPath);

  return /^V\d+$/.test(directoryName);
}

function validateJavaScriptFile(filePath, label) {
  var result = {
    errors: 0,
    warnings: 0,
    infos: 0,
  };

  var javascriptData = fileReader.readFile(filePath);

  console.log("");
  console.log("====================================");
  console.log(label);
  console.log("====================================");

  console.log("");
  console.log("Arquivo:");
  console.log(path.basename(filePath));

  var astResult = astValidator.validateAst(javascriptData.content);

  var javascriptIssues = [];

  if (astResult.ast) {
    var listenerResult = listenerValidator.validateListeners(astResult.ast);

    var observerResult = observerValidator.validateObservers(astResult.ast);

    javascriptIssues = validator.validateJavaScript(javascriptData.content);

    javascriptIssues = mergeIssues(javascriptIssues, listenerResult.issues);

    javascriptIssues = mergeIssues(javascriptIssues, observerResult.issues);

    javascriptIssues = mergeIssues(astResult.issues, javascriptIssues);
  } else {
    javascriptIssues = astResult.issues;
  }

  var javascriptResult = reporter.printReport(javascriptData, javascriptIssues);

  result.errors += javascriptResult.errors;

  result.warnings += javascriptResult.warnings;

  if (javascriptResult.infos !== undefined) {
    result.infos += javascriptResult.infos;
  }

  console.log("");

  if (astResult.ast) {
    console.log("AST: OK");
  } else {
    console.log("AST: FALHA");

    console.log(
      "Demais validações JavaScript ignoradas devido ao erro de sintaxe.",
    );
  }

  return result;
}

function validateTriggerFile(filePath) {
  var result = {
    errors: 0,
    warnings: 0,
    infos: 0,
  };

  var triggerData = fileReader.readFile(filePath);

  var triggerResult = triggerValidator.validateTrigger(triggerData.content);

  console.log("");
  console.log("====================================");
  console.log("TRIGGER");
  console.log("====================================");

  console.log("");
  console.log("Arquivo: " + path.basename(filePath));

  console.log(
    "Formato: " + (triggerResult.mode ? triggerResult.mode : "inválido"),
  );

  console.log("AST: " + (triggerResult.success ? "OK" : "FALHA"));

  console.log("");

  if (triggerResult.issues.length === 0) {
    console.log("Nenhuma ocorrência.");
  } else {
    triggerResult.issues.forEach(function (issue) {
      console.log(issue.severity.toUpperCase() + " | " + issue.rule);

      console.log(issue.message);

      console.log("");
    });
  }

  console.log("Erros: " + triggerResult.errors);

  console.log("Avisos: " + triggerResult.warnings);

  console.log("Informações: " + triggerResult.infos);

  console.log("");
  console.log("Resultado: " + triggerResult.status);

  result.errors += triggerResult.errors;

  result.warnings += triggerResult.warnings;

  result.infos += triggerResult.infos;

  return result;
}

function validateCssFile(filePath) {
  var result = {
    errors: 0,
    warnings: 0,
    infos: 0,
  };

  var cssData = fileReader.readFile(filePath);

  var cssIssues = cssValidator.validateCss(cssData.content);

  console.log("");
  console.log("====================================");
  console.log("CSS");
  console.log("====================================");

  var cssResult = reporter.printReport(cssData, cssIssues);

  result.errors += cssResult.errors;

  result.warnings += cssResult.warnings;

  if (cssResult.infos !== undefined) {
    result.infos += cssResult.infos;
  }

  return result;
}

function validateVariant(directoryPath, options) {
  var result = {
    errors: 0,
    warnings: 0,
    infos: 0,
  };

  var files = directoryReader.findFiles(directoryPath);

  var requireInfo = true;

  if (options && options.requireInfo === false) {
    requireInfo = false;
  }

  console.log("");
  console.log("####################################");
  console.log("VARIANTE " + files.directoryName);
  console.log("####################################");

  var structureIssues = structureValidator.validateStructure(files, {
    requireInfo: requireInfo,
  });

  var structureData = {
    name: files.directoryName,
    totalLines: 0,
  };

  var structureResult = reporter.printReport(structureData, structureIssues);

  result.errors += structureResult.errors;

  result.warnings += structureResult.warnings;

  if (structureResult.infos !== undefined) {
    result.infos += structureResult.infos;
  }

  if (files.javascriptFiles.length > 0) {
    var primaryJavaScript = getPrimaryFile(files.javascriptFiles);

    console.log("");
    console.log("JavaScript selecionado:");

    console.log(path.basename(primaryJavaScript));

    var javascriptResult = validateJavaScriptFile(
      primaryJavaScript,
      "JAVASCRIPT",
    );

    result.errors += javascriptResult.errors;

    result.warnings += javascriptResult.warnings;

    result.infos += javascriptResult.infos;
  }

  if (files.cssFiles.length > 0) {
    var primaryCss = getPrimaryFile(files.cssFiles);

    console.log("");
    console.log("CSS selecionado:");

    console.log(path.basename(primaryCss));

    var cssResult = validateCssFile(primaryCss);

    result.errors += cssResult.errors;

    result.warnings += cssResult.warnings;

    result.infos += cssResult.infos;
  } else {
    console.log("");
    console.log("CSS não encontrado.");
  }

  return result;
}

function validateProject(projectPath) {
  var result = {
    errors: 0,
    warnings: 0,
    infos: 0,
  };

  var project = projectReader.readProject(projectPath);

  console.log("");
  console.log("####################################");
  console.log("TESTE");
  console.log("####################################");

  console.log(project.projectName);

  console.log("");

  console.log(
    "infos-teste.md: " + (project.info ? "ENCONTRADO" : "NÃO ENCONTRADO"),
  );

  if (project.info === null) {
    result.warnings += 1;
  }

  if (project.triggers.length > 0) {
    project.triggers.forEach(function (triggerPath) {
      var triggerResult = validateTriggerFile(triggerPath);

      result.errors += triggerResult.errors;

      result.warnings += triggerResult.warnings;

      result.infos += triggerResult.infos;
    });
  } else {
    console.log("");
    console.log("Trigger: NÃO ENCONTRADA");
  }

  if (project.variants.length === 0) {
    console.log("");
    console.log("Nenhuma variante encontrada.");

    result.errors += 1;

    return result;
  }

  project.variants.forEach(function (variant) {
    var variantResult = validateVariant(variant.path, {
      requireInfo: false,
    });

    result.errors += variantResult.errors;

    result.warnings += variantResult.warnings;

    result.infos += variantResult.infos;
  });

  return result;
}

var inputPath = process.argv[2];

console.log("====================================");

console.log("CRO Validator v0.7");

console.log("====================================");

if (inputPath === undefined) {
  console.log("");
  console.log("Nenhuma pasta foi informada.");

  console.log("");
  console.log("Use:");

  console.log('npm run validate -- "C:\\caminho\\teste"');

  process.exit(1);
}

try {
  if (fs.existsSync(inputPath) === false) {
    throw new Error("O caminho informado não existe.");
  }

  var totalResult;

  if (isVariantDirectory(inputPath)) {
    totalResult = validateVariant(inputPath, {
      requireInfo: true,
    });
  } else {
    totalResult = validateProject(inputPath);
  }

  console.log("");
  console.log("====================================");

  console.log("RESULTADO GERAL");

  console.log("====================================");

  console.log("Erros: " + totalResult.errors);

  console.log("Avisos: " + totalResult.warnings);

  console.log("Informações: " + totalResult.infos);

  var finalStatus = reporter.getStatus(
    totalResult.errors,
    totalResult.warnings,
  );

  console.log("");
  console.log(finalStatus);

  console.log("====================================");

  if (totalResult.errors > 0) {
    process.exitCode = 1;
  }
} catch (error) {
  console.log("");

  console.log("Erro: " + error.message);

  process.exit(1);
}
