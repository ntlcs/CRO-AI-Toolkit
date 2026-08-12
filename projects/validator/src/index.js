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
var infoValidator = require("./info-validator");
var crossValidator = require("./cross-validator");
var reporter = require("./reporter");

function createResult() {
  return {
    errors: 0,
    warnings: 0,
    infos: 0,
  };
}

function addResult(target, source) {
  target.errors += source.errors;
  target.warnings += source.warnings;
  target.infos += source.infos;
}

function countIssues(issues) {
  var result = createResult();

  issues.forEach(function (issue) {
    if (issue.severity === "error") {
      result.errors += 1;
    }

    if (issue.severity === "warning") {
      result.warnings += 1;
    }

    if (issue.severity === "info") {
      result.infos += 1;
    }
  });

  return result;
}

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

function validateJavaScriptFile(filePath, label) {
  var result = createResult();

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
  var result = createResult();

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

  printIssues(triggerResult.issues);

  console.log("Erros: " + triggerResult.errors);
  console.log("Avisos: " + triggerResult.warnings);
  console.log("Informações: " + triggerResult.infos);

  console.log("");
  console.log("Resultado: " + triggerResult.status);

  result.errors += triggerResult.errors;
  result.warnings += triggerResult.warnings;
  result.infos += triggerResult.infos;

  return {
    summary: result,
    validation: triggerResult,
  };
}

function validateInfoFile(filePath) {
  var content = fs.readFileSync(filePath, "utf8");

  var issues = infoValidator.validateInfo(content);

  var result = countIssues(issues);

  console.log("");
  console.log("====================================");
  console.log("INFOS");
  console.log("====================================");

  console.log("");
  console.log("Arquivo: " + path.basename(filePath));

  console.log("");

  printIssues(issues);

  var status = reporter.getStatus(result.errors, result.warnings);

  console.log("Erros: " + result.errors);
  console.log("Avisos: " + result.warnings);
  console.log("Informações: " + result.infos);

  console.log("");
  console.log("Resultado: " + status);

  return {
    summary: result,
    content: content,
  };
}

function validateCrossProject(project, infoContent, triggerResults) {
  var result = createResult();

  var infoData = infoValidator.extractInfo(infoContent);

  var issues = crossValidator.validateCross(project, infoData, triggerResults);

  result = countIssues(issues);

  console.log("");
  console.log("====================================");
  console.log("CROSS VALIDATOR");
  console.log("====================================");

  console.log("");

  printIssues(issues);

  var status = reporter.getStatus(result.errors, result.warnings);

  console.log("Erros: " + result.errors);
  console.log("Avisos: " + result.warnings);
  console.log("Informações: " + result.infos);

  console.log("");
  console.log("Resultado: " + status);

  return result;
}

function validateCssFile(filePath) {
  var result = createResult();

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
  var result = createResult();

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

    addResult(result, javascriptResult);
  }

  if (files.cssFiles.length > 0) {
    var primaryCss = getPrimaryFile(files.cssFiles);

    console.log("");
    console.log("CSS selecionado:");
    console.log(path.basename(primaryCss));

    var cssResult = validateCssFile(primaryCss);

    addResult(result, cssResult);
  } else {
    console.log("");
    console.log("CSS não encontrado.");
  }

  return result;
}

function validateProject(projectPath) {
  var result = createResult();

  var project = projectReader.readProject(projectPath);

  var infoContent = null;

  var triggerResults = [];

  console.log("");
  console.log("####################################");
  console.log("TESTE");
  console.log("####################################");

  console.log(project.projectName);

  if (project.info) {
    var infoResult = validateInfoFile(project.info);

    infoContent = infoResult.content;

    addResult(result, infoResult.summary);
  } else {
    console.log("");
    console.log("infos-teste.md: NÃO ENCONTRADO");

    result.warnings += 1;
  }

  if (project.triggers.length > 0) {
    project.triggers.forEach(function (triggerPath) {
      var triggerResult = validateTriggerFile(triggerPath);

      triggerResults.push(triggerResult.validation);

      addResult(result, triggerResult.summary);
    });
  } else {
    console.log("");
    console.log("Trigger: NÃO ENCONTRADA");
  }

  if (infoContent !== null) {
    var crossResult = validateCrossProject(
      project,
      infoContent,
      triggerResults,
    );

    addResult(result, crossResult);
  } else {
    console.log("");
    console.log("====================================");
    console.log("CROSS VALIDATOR");
    console.log("====================================");

    console.log("");
    console.log(
      "Validação cruzada ignorada porque infos-teste.md não foi encontrado.",
    );
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

    addResult(result, variantResult);
  });

  return result;
}

var inputPath = process.argv[2];

console.log("====================================");
console.log("CRO Validator v0.9");
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
