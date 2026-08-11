var astParser = require("./ast-parser");

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
    lineContent: lineContent,
    message: message,
  };
}

function getLineContent(content, lineNumber) {
  var lines = content.split(/\r?\n/);

  if (lineNumber < 1) {
    return "";
  }

  if (lineNumber > lines.length) {
    return "";
  }

  return lines[lineNumber - 1].trim();
}

function validateAst(content, options) {
  var source = content;
  var isFunctionExpression = false;

  if (options && options.functionExpression === true) {
    source = "(" + content + ")";
    isFunctionExpression = true;
  }

  var result = astParser.parseJavaScript(source);

  var issues = [];

  if (result.success === false) {
    issues.push(
      createIssue(
        "invalid-javascript",
        "Sintaxe",
        "error",
        result.error.line,
        getLineContent(content, result.error.line),
        "JavaScript inválido: " + result.error.message,
      ),
    );
  }

  return {
    ast: result.ast,
    issues: issues,
    functionExpression: isFunctionExpression,
  };
}

module.exports = {
  validateAst: validateAst,
};
