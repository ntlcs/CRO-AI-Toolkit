var listenerAnalyzer = require("./listener-analyzer");

function createIssue(rule, severity, lineNumber, message) {
  return {
    rule: rule,
    category: "Eventos",
    severity: severity,
    lineNumber: lineNumber,
    lineContent: "",
    message: message,
  };
}

function shouldRequireCleanup(listener) {
  if (listener.eventName === "DOMContentLoaded") {
    return false;
  }

  if (listener.eventName === "load") {
    return false;
  }

  return true;
}

function validateListeners(ast) {
  var issues = [];

  var listeners = listenerAnalyzer.analyzeListeners(ast);

  listeners.forEach(function (listener) {
    if (listener.eventName === "resize") {
      issues.push(
        createIssue(
          "resize-listener",
          "warning",
          listener.lineNumber,
          'Listener de resize encontrado em "' +
            listener.target +
            '". Confirme se JavaScript é realmente necessário e valide comportamento entre breakpoints.',
        ),
      );
    }

    if (shouldRequireCleanup(listener) === false) {
      return;
    }

    if (listener.handlerName === "anonymous") {
      issues.push(
        createIssue(
          "anonymous-listener",
          "warning",
          listener.lineNumber,
          'Listener "' +
            listener.eventName +
            '" em "' +
            listener.target +
            '" utiliza função anônima. O cleanup pode ser inviável em reexecução do VWO.',
        ),
      );

      return;
    }

    if (listener.hasCleanup === false) {
      issues.push(
        createIssue(
          "listener-without-cleanup",
          "warning",
          listener.lineNumber,
          'Listener "' +
            listener.eventName +
            '" em "' +
            listener.target +
            '" com handler "' +
            listener.handlerName +
            '" não possui removeEventListener correspondente.',
        ),
      );
    }
  });

  return {
    listeners: listeners,
    issues: issues,
  };
}

module.exports = {
  validateListeners: validateListeners,
};
