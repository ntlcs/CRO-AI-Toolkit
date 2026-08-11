var triggerAst = require("./trigger-ast");
var triggerScanner = require("./trigger-scanner");
var triggerRules = require("./trigger-rules");

function countBySeverity(issues, severity) {
  return issues.filter(function (issue) {
    return issue.severity === severity;
  }).length;
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

function validateTrigger(content) {
  var astResult = triggerAst.parseTrigger(content);

  if (astResult.success === false) {
    return {
      success: false,
      mode: null,
      ast: null,
      scan: null,
      issues: [
        {
          rule: "invalid-trigger-syntax",
          category: "Trigger",
          severity: "error",
          lineNumber:
            astResult.error && astResult.error.line ? astResult.error.line : 0,
          lineContent: "",
          message:
            "Trigger inválida: " +
            (astResult.error
              ? astResult.error.message
              : "erro de sintaxe não identificado"),
        },
      ],
      errors: 1,
      warnings: 0,
      infos: 0,
      status: "REPROVADO",
    };
  }

  var scan = triggerScanner.scanTrigger(astResult.ast);

  var issues = triggerRules.applyTriggerRules(scan);

  var errors = countBySeverity(issues, "error");

  var warnings = countBySeverity(issues, "warning");

  var infos = countBySeverity(issues, "info");

  return {
    success: true,
    mode: astResult.mode,
    ast: astResult.ast,
    scan: scan,
    issues: issues,
    errors: errors,
    warnings: warnings,
    infos: infos,
    status: getStatus(errors, warnings),
  };
}

module.exports = {
  validateTrigger: validateTrigger,
};
