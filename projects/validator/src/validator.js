function createIssue(
  rule,
  category,
  severity,
  lineNumber,
  lineContent,
  message,
) {
  return {
    rule: rule,
    category: category,
    severity: severity,
    lineNumber: lineNumber,
    lineContent: lineContent.trim(),
    message: message,
  };
}

function findLineNumber(lines, search) {
  var index = lines.findIndex(function (line) {
    return line.includes(search);
  });

  if (index === -1) {
    return 1;
  }

  return index + 1;
}

function addOccurrenceIssue(
  issues,
  lines,
  search,
  rule,
  category,
  severity,
  message,
) {
  lines.forEach(function (line, index) {
    if (line.includes(search)) {
      issues.push(
        createIssue(rule, category, severity, index + 1, line, message),
      );
    }
  });
}

function validateForbiddenSyntax(lines, issues) {
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
          "Sintaxe",
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
          "Sintaxe",
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
          "Sintaxe",
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
          "Sintaxe",
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
          "Sintaxe",
          "warning",
          lineNumber,
          line,
          "console.log deve ser removido antes da entrega.",
        ),
      );
    }
  });
}

function validateNegation(lines, issues) {
  lines.forEach(function (line, index) {
    var sanitized = line.replace(/!==/g, "").replace(/!=/g, "");

    if (sanitized.includes("!")) {
      issues.push(
        createIssue(
          "negation-operator",
          "Sintaxe",
          "error",
          index + 1,
          line,
          "Operador de negação com exclamação não é permitido.",
        ),
      );
    }
  });
}

function validateComments(lines, issues) {
  var insideBlockComment = false;

  lines.forEach(function (line, index) {
    var trimmedLine = line.trim();

    if (insideBlockComment) {
      issues.push(
        createIssue(
          "comment",
          "Sintaxe",
          "warning",
          index + 1,
          line,
          "Comentário encontrado.",
        ),
      );

      if (trimmedLine.includes("*/")) {
        insideBlockComment = false;
      }

      return;
    }

    if (trimmedLine.startsWith("/*")) {
      issues.push(
        createIssue(
          "comment",
          "Sintaxe",
          "warning",
          index + 1,
          line,
          "Comentário encontrado.",
        ),
      );

      if (trimmedLine.includes("*/") === false) {
        insideBlockComment = true;
      }

      return;
    }

    if (trimmedLine.startsWith("//") || trimmedLine.includes(" //")) {
      issues.push(
        createIssue(
          "comment",
          "Sintaxe",
          "warning",
          index + 1,
          line,
          "Comentário encontrado.",
        ),
      );
    }
  });
}

function validateTimers(lines, issues) {
  addOccurrenceIssue(
    issues,
    lines,
    "setInterval(",
    "set-interval",
    "Performance",
    "warning",
    "setInterval encontrado. Verifique necessidade e limpeza.",
  );

  addOccurrenceIssue(
    issues,
    lines,
    "setTimeout(",
    "set-timeout",
    "Performance",
    "warning",
    "setTimeout encontrado. Confirme se não existe dependência de timing arbitrário.",
  );
}

function validateDomManipulation(lines, issues) {
  addOccurrenceIssue(
    issues,
    lines,
    ".innerHTML",
    "inner-html",
    "DOM",
    "warning",
    "innerHTML encontrado. Verifique segurança e preservação de elementos e eventos.",
  );

  addOccurrenceIssue(
    issues,
    lines,
    "createElement('style')",
    "css-in-javascript",
    "DOM",
    "error",
    "Possível injeção de CSS pelo JavaScript encontrada.",
  );

  addOccurrenceIssue(
    issues,
    lines,
    'createElement("style")',
    "css-in-javascript",
    "DOM",
    "error",
    "Possível injeção de CSS pelo JavaScript encontrada.",
  );
}

function validateAnalytics(lines, issues) {
  var pushCount = 0;

  lines.forEach(function (line) {
    if (line.includes("dataLayer.push")) {
      pushCount += 1;
    }
  });

  if (pushCount > 1) {
    var dataLayerLine = findLineNumber(lines, "dataLayer.push");

    issues.push(
      createIssue(
        "multiple-data-layer-push",
        "Analytics",
        "warning",
        dataLayerLine,
        lines[dataLayerLine - 1],
        "Mais de um dataLayer.push encontrado. Confirme se não existe risco de analytics duplicado.",
      ),
    );
  }
}

function validateRepeatedSelectors(lines, issues) {
  var selectors = {};

  lines.forEach(function (line, index) {
    var match = line.match(/querySelector\(\s*(['"])(.*?)\1\s*\)/);

    if (match === null) {
      return;
    }

    var selector = match[2];

    if (selectors[selector] === undefined) {
      selectors[selector] = {
        count: 0,
        lineNumber: index + 1,
        lineContent: line,
      };
    }

    selectors[selector].count += 1;
  });

  Object.keys(selectors).forEach(function (selector) {
    var data = selectors[selector];

    if (data.count < 3) {
      return;
    }

    issues.push(
      createIssue(
        "repeated-selector",
        "DOM",
        "warning",
        data.lineNumber,
        data.lineContent,
        'O seletor "' +
          selector +
          '" aparece ' +
          data.count +
          " vezes. Avalie reutilizar a referência.",
      ),
    );
  });
}

function validateJavaScript(content) {
  var issues = [];
  var lines = content.split(/\r?\n/);

  validateForbiddenSyntax(lines, issues);
  validateNegation(lines, issues);
  validateComments(lines, issues);
  validateTimers(lines, issues);
  validateDomManipulation(lines, issues);
  validateAnalytics(lines, issues);
  validateRepeatedSelectors(lines, issues);

  return issues;
}

module.exports = {
  validateJavaScript: validateJavaScript,
};
