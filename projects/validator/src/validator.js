function createIssue(rule, severity, lineNumber, lineContent, message) {
  return {
    rule: rule,
    severity: severity,
    lineNumber: lineNumber,
    lineContent: lineContent.trim(),
    message: message,
  };
}

function validateJavaScript(content) {
  var issues = [];
  var lines = content.split(/\r?\n/);

  lines.forEach(function (line, index) {
    var lineNumber = index + 1;

    if (
      line.includes("jQuery") ||
      line.includes("$(") ||
      line.includes("vwo_$")
    ) {
      issues.push(
        createIssue(
          "jquery",
          "error",
          lineNumber,
          line,
          "jQuery não é permitido.",
        ),
      );
    }

    if (line.includes("?.")) {
      issues.push(
        createIssue(
          "optional-chaining",
          "error",
          lineNumber,
          line,
          "Optional chaining não é permitido.",
        ),
      );
    }

    if (line.includes("??")) {
      issues.push(
        createIssue(
          "nullish-coalescing",
          "error",
          lineNumber,
          line,
          "Nullish coalescing não é permitido.",
        ),
      );
    }

    if (
      line.includes("?") &&
      line.includes(":") &&
      line.includes("http://") === false &&
      line.includes("https://") === false
    ) {
      issues.push(
        createIssue(
          "ternary",
          "error",
          lineNumber,
          line,
          "Possível operador ternário encontrado.",
        ),
      );
    }

    if (line.includes("console.log")) {
      issues.push(
        createIssue(
          "console-log",
          "warning",
          lineNumber,
          line,
          "console.log deve ser removido antes da entrega.",
        ),
      );
    }
  });

  return issues;
}

module.exports = {
  validateJavaScript: validateJavaScript,
};
