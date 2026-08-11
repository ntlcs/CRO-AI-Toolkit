var observerAnalyzer = require("./observer-analyzer");

function createIssue(rule, severity, lineNumber, message) {
  return {
    rule: rule,
    category: "SPA/VWO",
    severity: severity,
    lineNumber: lineNumber,
    lineContent: "",
    message: message,
  };
}

function isBroadTarget(target) {
  return target === "document.body" || target === "document.documentElement";
}

function validateObservers(ast) {
  var issues = [];

  var observers = observerAnalyzer.analyzeObservers(ast);

  observers.forEach(function (observer) {
    if (observer.observes.length === 0) {
      issues.push(
        createIssue(
          "observer-without-observe",
          "warning",
          observer.lineCreate,
          'MutationObserver "' +
            observer.variable +
            '" foi criado, mas nenhuma chamada observe correspondente foi localizada.',
        ),
      );
    }

    if (observer.hasDisconnect === false) {
      issues.push(
        createIssue(
          "observer-without-disconnect",
          "warning",
          observer.lineCreate,
          'MutationObserver "' +
            observer.variable +
            '" não possui disconnect correspondente.',
        ),
      );
    }

    observer.observes.forEach(function (observeData) {
      if (isBroadTarget(observeData.target)) {
        issues.push(
          createIssue(
            "broad-observer",
            "warning",
            observeData.lineNumber,
            'MutationObserver "' +
              observer.variable +
              '" observa "' +
              observeData.target +
              '". Verifique escopo, performance e necessidade.',
          ),
        );
      }

      if (
        observeData.options.subtree === true &&
        isBroadTarget(observeData.target)
      ) {
        issues.push(
          createIssue(
            "broad-observer-subtree",
            "warning",
            observeData.lineNumber,
            'MutationObserver "' +
              observer.variable +
              '" utiliza subtree em "' +
              observeData.target +
              '", aumentando o custo de observação.',
          ),
        );
      }
    });
  });

  return {
    observers: observers,
    issues: issues,
  };
}

module.exports = {
  validateObservers: validateObservers,
};
