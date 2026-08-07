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

function validateObserver(content, lines, issues) {
  var hasObserver = content.includes("MutationObserver");
  var hasDisconnect = content.includes(".disconnect()");

  if (hasObserver && hasDisconnect === false) {
    var observerLine = findLineNumber(lines, "MutationObserver");

    issues.push(
      createIssue(
        "observer-without-disconnect",
        "SPA/VWO",
        "warning",
        observerLine,
        lines[observerLine - 1],
        "MutationObserver encontrado sem disconnect aparente.",
      ),
    );
  }

  lines.forEach(function (line, index) {
    var normalizedLine = line.replace(/\s+/g, "");

    if (
      normalizedLine.includes(".observe(document.body,") ||
      normalizedLine.includes(".observe(document.documentElement,")
    ) {
      issues.push(
        createIssue(
          "broad-observer",
          "SPA/VWO",
          "warning",
          index + 1,
          line,
          "Observer aplicado em uma área ampla do documento. Verifique performance e escopo.",
        ),
      );
    }
  });
}

function validateListeners(content, lines, issues) {
  var addCount = 0;
  var removeCount = 0;
  var resizeCount = 0;

  lines.forEach(function (line) {
    if (line.includes("addEventListener(")) {
      addCount += 1;
    }

    if (line.includes("removeEventListener(")) {
      removeCount += 1;
    }

    if (line.includes("addEventListener(") && line.includes("resize")) {
      resizeCount += 1;
    }
  });

  if (addCount > 0 && removeCount === 0) {
    var listenerLine = findLineNumber(lines, "addEventListener(");

    issues.push(
      createIssue(
        "listener-without-cleanup",
        "Eventos",
        "warning",
        listenerLine,
        lines[listenerLine - 1],
        "Listeners encontrados sem removeEventListener aparente.",
      ),
    );
  }

  if (resizeCount > 0) {
    var resizeLine = findLineNumber(lines, "resize");

    issues.push(
      createIssue(
        "resize-listener",
        "Eventos",
        "warning",
        resizeLine,
        lines[resizeLine - 1],
        "Listener de resize encontrado. Confirme necessidade, limpeza e comportamento entre breakpoints.",
      ),
    );
  }
}

function validateAnalytics(content, lines, issues) {
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
  validateTimers(lines, issues);
  validateDomManipulation(lines, issues);
  validateObserver(content, lines, issues);
  validateListeners(content, lines, issues);
  validateAnalytics(content, lines, issues);
  validateRepeatedSelectors(lines, issues);

  return issues;
}

module.exports = {
  validateJavaScript: validateJavaScript,
};
