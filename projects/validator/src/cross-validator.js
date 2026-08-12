var path = require("path");

function createIssue(rule, severity, message) {
  return {
    rule: rule,
    category: "Cross",
    severity: severity,
    lineNumber: 0,
    lineContent: "",
    message: message,
  };
}

function normalizeText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function extractTestId(value) {
  var normalized = normalizeText(value);
  var match = normalized.match(/(?:^|\D)(\d{3,6})(?:\D|$)/);

  if (match === null) {
    return null;
  }

  return match[1];
}

function extractUrlPath(value) {
  if (typeof value !== "string") {
    return null;
  }

  var trimmed = value.trim();

  if (trimmed === "") {
    return null;
  }

  try {
    var parsed = new URL(trimmed);
    return parsed.pathname;
  } catch (error) {
    if (trimmed.charAt(0) === "/") {
      return trimmed.split("?")[0].split("#")[0];
    }
  }

  return null;
}

function getDeclaredVariants(value) {
  if (typeof value !== "string") {
    return [];
  }

  var matches = value.match(/\bV\d+\b/gi);

  if (matches === null) {
    return [];
  }

  var variants = [];

  matches.forEach(function (variant) {
    var normalized = variant.toUpperCase();

    if (variants.indexOf(normalized) === -1) {
      variants.push(normalized);
    }
  });

  return variants;
}

function getExistingVariants(project) {
  return project.variants.map(function (variant) {
    return variant.name.toUpperCase();
  });
}

function validateTestId(project, infoData, issues) {
  var folderId = extractTestId(project.projectName);

  var vwoId = extractTestId(infoData["vwo-name"]);

  if (folderId === null) {
    issues.push(
      createIssue(
        "project-id-not-detected",
        "info",
        "Não foi possível identificar o ID do teste pelo nome da pasta.",
      ),
    );

    return;
  }

  if (vwoId === null) {
    issues.push(
      createIssue(
        "vwo-name-id-not-detected",
        "info",
        "Não foi possível identificar o ID do teste no campo Nome do teste para o VWO.",
      ),
    );

    return;
  }

  if (folderId !== vwoId) {
    issues.push(
      createIssue(
        "test-id-mismatch",
        "warning",
        'O ID "' +
          folderId +
          '" da pasta não corresponde ao ID "' +
          vwoId +
          '" informado no nome do teste para o VWO.',
      ),
    );

    return;
  }

  issues.push(
    createIssue(
      "test-id-match",
      "info",
      "ID do teste consistente entre pasta e infos-teste.md: " + folderId + ".",
    ),
  );
}

function validateVariants(project, infoData, issues) {
  var declared = getDeclaredVariants(infoData.variants);

  var existing = getExistingVariants(project);

  if (declared.length === 0) {
    issues.push(
      createIssue(
        "variants-not-declared",
        "info",
        'Nenhuma variante no padrão "V1", "V2" ou similar foi identificada no campo Nome das variantes.',
      ),
    );

    return;
  }

  declared.forEach(function (variant) {
    if (existing.indexOf(variant) === -1) {
      issues.push(
        createIssue(
          "declared-variant-missing",
          "warning",
          'A variante "' +
            variant +
            '" está declarada em infos-teste.md, mas a pasta correspondente não foi encontrada.',
        ),
      );
    }
  });

  existing.forEach(function (variant) {
    if (declared.indexOf(variant) === -1) {
      issues.push(
        createIssue(
          "variant-not-declared",
          "warning",
          'A pasta "' +
            variant +
            '" existe no teste, mas essa variante não foi identificada em infos-teste.md.',
        ),
      );
    }
  });

  var hasMismatch = issues.some(function (issue) {
    return (
      issue.rule === "declared-variant-missing" ||
      issue.rule === "variant-not-declared"
    );
  });

  if (hasMismatch === false) {
    issues.push(
      createIssue(
        "variants-match",
        "info",
        "As variantes declaradas correspondem às pastas encontradas no teste.",
      ),
    );
  }
}

function validateUrl(infoData, triggerResults, issues) {
  var infoPath = extractUrlPath(infoData.url);

  if (infoPath === null) {
    issues.push(
      createIssue(
        "info-url-not-detected",
        "info",
        "Não foi possível obter uma rota válida do campo URL onde será executado.",
      ),
    );

    return;
  }

  if (triggerResults.length === 0) {
    issues.push(
      createIssue(
        "trigger-not-available-for-url-cross",
        "info",
        "Não existe resultado de trigger disponível para cruzamento de URL.",
      ),
    );

    return;
  }

  var triggerHasUrlCheck = triggerResults.some(function (result) {
    if (result.scan === null || result.scan === undefined) {
      return false;
    }

    return (
      result.scan.host.found ||
      result.scan.hostname.found ||
      result.scan.pathname.found ||
      result.scan.href.found
    );
  });
  if (triggerHasUrlCheck === false) {
    issues.push(
      createIssue(
        "trigger-without-url-check",
        "warning",
        'infos-teste.md define a rota "' +
          infoPath +
          '", mas nenhuma validação explícita de URL foi identificada na trigger.',
      ),
    );

    return;
  }

  issues.push(
    createIssue(
      "url-check-cross-detected",
      "info",
      'infos-teste.md define a rota "' +
        infoPath +
        '" e a trigger possui validação de URL.',
    ),
  );
}

function validateDevice(infoData, issues) {
  var device = normalizeText(infoData.device);

  if (device === "") {
    return;
  }

  var desktop = device.indexOf("desktop") >= 0;

  var mobile = device.indexOf("mobile") >= 0 || device.indexOf("movel") >= 0;

  if (desktop && mobile) {
    issues.push(
      createIssue(
        "device-both",
        "info",
        "O teste está documentado para Desktop e Mobile.",
      ),
    );

    return;
  }

  if (desktop) {
    issues.push(
      createIssue(
        "device-desktop",
        "info",
        "O teste está documentado para Desktop.",
      ),
    );

    return;
  }

  if (mobile) {
    issues.push(
      createIssue(
        "device-mobile",
        "info",
        "O teste está documentado para Mobile.",
      ),
    );

    return;
  }

  issues.push(
    createIssue(
      "device-unclassified",
      "info",
      'Dispositivo informado: "' + infoData.device + '".',
    ),
  );
}

function validateCross(project, infoData, triggerResults) {
  var issues = [];

  validateTestId(project, infoData, issues);

  validateVariants(project, infoData, issues);

  validateUrl(infoData, triggerResults, issues);

  validateDevice(infoData, issues);

  return issues;
}

module.exports = {
  validateCross: validateCross,
};
