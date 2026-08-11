var path = require("path");

function createIssue(rule, severity, message) {
  return {
    rule: rule,
    category: "Estrutura",
    severity: severity,
    lineNumber: 0,
    lineContent: "",
    message: message,
  };
}

function validateVariantName(directoryName, issues) {
  if (/^V\d+$/.test(directoryName) === false) {
    issues.push(
      createIssue(
        "invalid-variant-directory",
        "warning",
        "A pasta da variante não segue o padrão V1, V2, V3...",
      ),
    );
  }
}

function validateJavaScriptFiles(files, issues) {
  if (files.length === 0) {
    issues.push(
      createIssue(
        "missing-javascript",
        "error",
        "Nenhum arquivo JavaScript foi encontrado na variante.",
      ),
    );

    return;
  }

  if (files.length > 1) {
    var fileNames = files.map(function (filePath) {
      return path.basename(filePath);
    });

    issues.push(
      createIssue(
        "multiple-javascript-files",
        "warning",
        "Foram encontrados " +
          files.length +
          " arquivos JavaScript: " +
          fileNames.join(", ") +
          ". O Validator utilizará preferencialmente o arquivo sem espaços no nome.",
      ),
    );
  }
}

function validateCssFiles(files, issues) {
  if (files.length > 1) {
    var fileNames = files.map(function (filePath) {
      return path.basename(filePath);
    });

    issues.push(
      createIssue(
        "multiple-css-files",
        "warning",
        "Foram encontrados " +
          files.length +
          " arquivos CSS: " +
          fileNames.join(", ") +
          ". O Validator utilizará preferencialmente o arquivo sem espaços no nome.",
      ),
    );
  }
}

function validateFileNames(files, directoryName, issues) {
  files.forEach(function (filePath) {
    var fileName = path.basename(filePath);

    if (
      fileName.toLowerCase().includes(directoryName.toLowerCase()) === false
    ) {
      issues.push(
        createIssue(
          "variant-name-mismatch",
          "warning",
          'O arquivo "' +
            fileName +
            '" não contém o nome da variante "' +
            directoryName +
            '".',
        ),
      );
    }
  });
}

function validateInfoFile(info, issues, requireInfo) {
  if (requireInfo === false) {
    return;
  }

  if (info === null) {
    issues.push(
      createIssue(
        "missing-info-file",
        "warning",
        "infos-teste.md não encontrado.",
      ),
    );
  }
}

function validateStructure(files, options) {
  var issues = [];
  var requireInfo = true;

  if (options && options.requireInfo === false) {
    requireInfo = false;
  }

  validateVariantName(files.directoryName, issues);

  validateJavaScriptFiles(files.javascriptFiles, issues);

  validateCssFiles(files.cssFiles, issues);

  validateFileNames(files.javascriptFiles, files.directoryName, issues);

  validateFileNames(files.cssFiles, files.directoryName, issues);

  validateInfoFile(files.info, issues, requireInfo);

  return issues;
}

module.exports = {
  validateStructure: validateStructure,
};
