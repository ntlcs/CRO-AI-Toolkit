function printIssue(issue) {
  var label = "AVISO";

  if (issue.severity === "error") {
    label = "ERRO";
  }

  console.log("");
  console.log(label + " | Linha " + issue.lineNumber + " | " + issue.rule);
  console.log(issue.message);
  console.log(issue.lineContent);
}

function printReport(fileData, issues) {
  var errors = issues.filter(function (issue) {
    return issue.severity === "error";
  });

  var warnings = issues.filter(function (issue) {
    return issue.severity === "warning";
  });

  console.log("");
  console.log("Relatório");
  console.log("Arquivo: " + fileData.name);
  console.log("Linhas: " + fileData.totalLines);
  console.log("Erros: " + errors.length);
  console.log("Avisos: " + warnings.length);

  issues.forEach(function (issue) {
    printIssue(issue);
  });

  console.log("");

  if (errors.length > 0) {
    console.log("Resultado: REPROVADO");
    return;
  }

  console.log("Resultado: APROVADO");
}

module.exports = {
  printReport: printReport,
};
