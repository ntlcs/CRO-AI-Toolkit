function createIssue(rule, severity, message) {
  return {
    rule: rule,
    category: "Infos",
    severity: severity,
    lineNumber: 0,
    lineContent: "",
    message: message,
  };
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getLines(content) {
  return content.split(/\r?\n/);
}

function getFields() {
  return [
    {
      key: "test-type",
      label: "Tipo de Teste",
      aliases: ["Tipo de Teste"],
    },
    {
      key: "device",
      label: "Dispositivo",
      aliases: ["Dispositivo"],
    },
    {
      key: "hypothesis",
      label: "Hipótese",
      aliases: ["Hipótese"],
    },
    {
      key: "url",
      label: "URL onde será executado",
      aliases: ["URL onde será executado"],
    },
    {
      key: "figma",
      label: "Link do Figma",
      aliases: ["Link do Figma"],
    },
    {
      key: "vwo-name",
      label: "Nome do teste para o VWO",
      aliases: ["Nome do teste para o VWO"],
    },
    {
      key: "variants",
      label: "Nome das variantes",
      aliases: ["Nome das variantes"],
      optional: true,
    },
    {
      key: "vwo-link",
      label: "Link do teste no VWO",
      aliases: ["Link do teste no VWO"],
    },
    {
      key: "test-mass",
      label: "Massa de teste",
      aliases: ["Massa de teste", "Massa de teste (se tiver)"],
    },
    {
      key: "description",
      label: "Descrição do que foi realizado no teste",
      aliases: ["Descrição do que foi realizado no teste"],
    },
    {
      key: "developer",
      label: "Desenvolvedor responsável",
      aliases: ["Desenvolvedor responsável"],
    },
  ];
}

function isFieldHeader(line, fields) {
  var normalizedLine = normalizeText(line);

  return fields.some(function (field) {
    return field.aliases.some(function (alias) {
      return normalizedLine === normalizeText(alias);
    });
  });
}

function findFieldIndex(lines, aliases) {
  var index = -1;

  lines.some(function (line, currentIndex) {
    var normalizedLine = normalizeText(line);

    var found = aliases.some(function (alias) {
      return normalizedLine === normalizeText(alias);
    });

    if (found) {
      index = currentIndex;
      return true;
    }

    return false;
  });

  return index;
}

function getFieldValue(lines, fieldIndex, fields) {
  var values = [];

  for (var current = fieldIndex + 1; current < lines.length; current += 1) {
    var line = lines[current];

    if (isFieldHeader(line, fields)) {
      break;
    }

    if (line.trim() !== "") {
      values.push(line.trim());
    }
  }

  return values.join("\n");
}

function findField(lines, field, fields) {
  var index = findFieldIndex(lines, field.aliases);

  if (index === -1) {
    return null;
  }

  return {
    lineNumber: index + 1,
    value: getFieldValue(lines, index, fields),
  };
}

function validateField(lines, config, fields, issues) {
  var field = findField(lines, config, fields);

  if (field === null) {
    if (config.optional === true) {
      return;
    }

    issues.push(
      createIssue(
        "missing-" + config.key,
        "warning",
        'Campo "' + config.label + '" não encontrado em infos-teste.md.',
      ),
    );

    return;
  }

  if (field.value === "") {
    issues.push(
      createIssue(
        "empty-" + config.key,
        "warning",
        'Campo "' + config.label + '" foi encontrado, mas está vazio.',
      ),
    );

    return;
  }

  issues.push(
    createIssue(
      "found-" + config.key,
      "info",
      'Campo "' + config.label + '" encontrado.',
    ),
  );
}

function validateInfo(content) {
  var lines = getLines(content);

  var fields = getFields();

  var issues = [];

  fields.forEach(function (field) {
    validateField(lines, field, fields, issues);
  });

  return issues;
}

module.exports = {
  validateInfo: validateInfo,
};
