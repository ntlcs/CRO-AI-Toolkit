function createIssue(rule, severity, message) {
  return {
    rule: rule,
    category: "Trigger",
    severity: severity,
    lineNumber: 0,
    lineContent: "",
    message: message,
  };
}

function hasUrlCheck(scan) {
  if (scan.host.found) {
    return true;
  }

  if (scan.hostname.found) {
    return true;
  }

  if (scan.pathname.found) {
    return true;
  }

  if (scan.href.found) {
    return true;
  }

  return false;
}

function hasInteractionTrigger(scan) {
  var events = scan.eventsAdded;

  if (events.scroll.found) {
    return true;
  }

  if (events.click.found) {
    return true;
  }

  if (events.mouseenter.found) {
    return true;
  }

  if (events.mousemove.found) {
    return true;
  }

  if (events.mouseout.found) {
    return true;
  }

  if (events.touchstart.found) {
    return true;
  }

  if (events.beforeunload.found) {
    return true;
  }

  if (events.visibilitychange.found) {
    return true;
  }

  if (events.keydown.found) {
    return true;
  }

  return false;
}

function validateExecuteTrigger(scan, issues) {
  if (scan.executeTrigger.found === false) {
    issues.push(
      createIssue(
        "missing-execute-trigger",
        "error",
        "executeTrigger() não foi encontrado na trigger.",
      ),
    );

    return;
  }

  if (scan.executeTrigger.count > 1) {
    issues.push(
      createIssue(
        "multiple-execute-trigger",
        "info",
        "executeTrigger() aparece " +
          scan.executeTrigger.count +
          " vezes. Confirme se os múltiplos caminhos de disparo são intencionais.",
      ),
    );
  }
}

function validatePolling(scan, issues) {
  if (scan.polling.found === false) {
    return;
  }

  issues.push(
    createIssue(
      "polling-detected",
      "info",
      "Polling com setInterval foi detectado.",
    ),
  );

  if (scan.clearInterval.found === false) {
    issues.push(
      createIssue(
        "polling-without-clear",
        "warning",
        "setInterval foi encontrado sem clearInterval correspondente. Existe risco de polling contínuo.",
      ),
    );
  }
}

function validateObserver(scan, issues) {
  if (scan.observer.found === false) {
    return;
  }

  issues.push(
    createIssue(
      "observer-detected",
      "info",
      "MutationObserver foi detectado na trigger.",
    ),
  );
}

function validateUrlCheck(scan, issues) {
  if (hasUrlCheck(scan)) {
    issues.push(
      createIssue(
        "url-check-detected",
        "info",
        "A trigger possui validação de URL, host ou pathname.",
      ),
    );

    return;
  }

  if (
    scan.polling.found ||
    scan.observer.found ||
    scan.fetch.found ||
    hasInteractionTrigger(scan)
  ) {
    issues.push(
      createIssue(
        "missing-url-check",
        "warning",
        "A trigger possui lógica de espera ou interação, mas nenhuma validação explícita de URL foi detectada.",
      ),
    );
  }
}

function validateEvents(scan, issues) {
  if (scan.options.once.found) {
    issues.push(
      createIssue(
        "once-option-detected",
        "info",
        "Listener com once: true foi detectado.",
      ),
    );
  }

  if (scan.options.passive.found) {
    issues.push(
      createIssue(
        "passive-option-detected",
        "info",
        "Listener com passive: true foi detectado.",
      ),
    );
  }

  if (scan.eventsAdded.scroll.found && scan.eventsRemoved.scroll.found) {
    issues.push(
      createIssue(
        "scroll-cleanup-detected",
        "info",
        "Listener de scroll possui remoção correspondente.",
      ),
    );
  }
}

function validateFetch(scan, issues) {
  if (scan.fetch.found === false) {
    return;
  }

  issues.push(
    createIssue(
      "fetch-detected",
      "info",
      "A trigger realiza chamada via fetch.",
    ),
  );
}

function validateVwoReady(scan, issues) {
  if (scan.vwoReady.found === false) {
    return;
  }

  issues.push(
    createIssue(
      "vwo-ready-detected",
      "info",
      "vwo_$(document).ready foi detectado.",
    ),
  );
}

function applyTriggerRules(scan) {
  var issues = [];

  validateExecuteTrigger(scan, issues);

  validatePolling(scan, issues);

  validateObserver(scan, issues);

  validateUrlCheck(scan, issues);

  validateEvents(scan, issues);

  validateFetch(scan, issues);

  validateVwoReady(scan, issues);

  return issues;
}

module.exports = {
  applyTriggerRules: applyTriggerRules,
};
