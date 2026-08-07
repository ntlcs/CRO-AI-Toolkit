function createIssue(rule, severity, lineNumber, lineContent, message) {
  return {
    rule: rule,
    category: "CSS",
    severity: severity,
    lineNumber: lineNumber,
    lineContent: lineContent.trim(),
    message: message,
  };
}

function validateCss(content) {
  var issues = [];
  var lines = content.split(/\r?\n/);

  lines.forEach(function (line, index) {
    var lineNumber = index + 1;
    var normalizedLine = line.trim().toLowerCase();

    if (normalizedLine.includes("!important")) {
      issues.push(
        createIssue(
          "important",
          "warning",
          lineNumber,
          line,
          "Uso de !important encontrado. Confirme se é realmente necessário.",
        ),
      );
    }

    if (normalizedLine.includes("@import")) {
      issues.push(
        createIssue(
          "css-import",
          "error",
          lineNumber,
          line,
          "@import não deve ser utilizado no CSS da variação.",
        ),
      );
    }

    if (
      normalizedLine === "body {" ||
      normalizedLine === "html {" ||
      normalizedLine === "* {"
    ) {
      issues.push(
        createIssue(
          "global-selector",
          "warning",
          lineNumber,
          line,
          "Seletor global encontrado. Existe risco de afetar elementos fora do teste.",
        ),
      );
    }

    if (
      normalizedLine.includes("position: fixed") ||
      normalizedLine.includes("position:fixed")
    ) {
      issues.push(
        createIssue(
          "fixed-position",
          "warning",
          lineNumber,
          line,
          "position: fixed encontrado. Validar desktop, mobile, resize, overlays e teclado.",
        ),
      );
    }

    if (
      normalizedLine.includes("overflow: hidden") ||
      normalizedLine.includes("overflow:hidden")
    ) {
      issues.push(
        createIssue(
          "overflow-hidden",
          "warning",
          lineNumber,
          line,
          "overflow: hidden encontrado. Confirme se nenhum conteúdo, menu ou autocomplete será cortado.",
        ),
      );
    }

    if (
      normalizedLine.includes("width: 100vw") ||
      normalizedLine.includes("width:100vw")
    ) {
      issues.push(
        createIssue(
          "viewport-width",
          "warning",
          lineNumber,
          line,
          "width: 100vw encontrado. Verifique possibilidade de overflow horizontal.",
        ),
      );
    }
  });

  return issues;
}

module.exports = {
  validateCss: validateCss,
};
