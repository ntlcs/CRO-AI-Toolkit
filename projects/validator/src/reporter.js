var categories = [
  "Estrutura",
  "Sintaxe",
  "DOM",
  "Eventos",
  "SPA/VWO",
  "Analytics",
  "Performance",
  "CSS",
];

function getCategoryIssues(issues, category) {
  return issues.filter(function (issue) {
    return issue.category === category;
  });
}

function printIssue(issue) {
  var label = "AVISO";

  if (issue.severity === "error") {
    label = "ERRO";
  }

  console.log(label + " | Linha " + issue.lineNumber + " | " + issue.rule);

  console.log(issue.message);
  console.log(issue.lineContent);
  console.log("");
}

function printCategory(category, issues) {
  var categoryIssues = getCategoryIssues(issues, category);

  console.log("");
  console.log("[" + category.toUpperCase() + "]");

  if (categoryIssues.length === 0) {
    console.log("OK - Nenhuma ocorrência.");
    return;
  }

  categoryIssues.forEach(function (issue) {
    printIssue(issue);
  });
}

function getStatus(errors, warnings) {
  if (errors > 0) {
    return "REPROVADO";
  }

  if (warnings > 0) {
    return "APROVADO COM RESSALVAS";
  }

  return "APROVADO";
}

function printReport(fileData, issues) {
  var errors = issues.filter(function (issue) {
    return issue.severity === "error";
  });

  var warnings = issues.filter(function (issue) {
    return issue.severity === "warning";
  });

  console.log("");
  console.log("Arquivo: " + fileData.name);
  console.log("Linhas: " + fileData.totalLines);

  categories.forEach(function (category) {
    printCategory(category, issues);
  });

  console.log("");
  console.log("Resumo do arquivo");
  console.log("Erros: " + errors.length);
  console.log("Avisos: " + warnings.length);
  console.log("Resultado: " + getStatus(errors.length, warnings.length));

  return {
    errors: errors.length,
    warnings: warnings.length,
    status: getStatus(errors.length, warnings.length),
  };
}

module.exports = {
  printReport: printReport,
  getStatus: getStatus,
};
