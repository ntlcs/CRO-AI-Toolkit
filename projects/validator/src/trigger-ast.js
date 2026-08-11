var acorn = require("acorn");

function parseSource(source) {
  try {
    return {
      success: true,
      ast: acorn.parse(source, {
        ecmaVersion: "latest",
        sourceType: "script",
        locations: true,
      }),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      ast: null,
      error: {
        message: error.message,
        line: error.loc.line,
        column: error.loc.column,
      },
    };
  }
}

function isFunctionExpressionStatement(statement) {
  if (statement.type !== "ExpressionStatement") {
    return false;
  }

  return statement.expression.type === "FunctionExpression";
}

function isIifeStatement(statement) {
  if (statement.type !== "ExpressionStatement") {
    return false;
  }

  var expression = statement.expression;

  if (expression.type !== "CallExpression") {
    return false;
  }

  if (
    expression.callee.type === "FunctionExpression" ||
    expression.callee.type === "ArrowFunctionExpression"
  ) {
    return true;
  }

  return false;
}

function detectScriptMode(ast) {
  if (ast.body.length !== 1) {
    return "script";
  }

  var statement = ast.body[0];

  if (isIifeStatement(statement)) {
    return "iife";
  }

  if (isFunctionExpressionStatement(statement)) {
    return "parenthesized-function";
  }

  return "script";
}

function parseFunctionExpression(content) {
  var wrappedSource = "(" + content + ")";
  var result = parseSource(wrappedSource);

  if (result.success === false) {
    return result;
  }

  if (result.ast.body.length !== 1) {
    return {
      success: false,
      ast: null,
      error: null,
    };
  }

  var statement = result.ast.body[0];

  if (isFunctionExpressionStatement(statement) === false) {
    return {
      success: false,
      ast: null,
      error: null,
    };
  }

  return result;
}

function parseTrigger(content) {
  var scriptResult = parseSource(content);

  if (scriptResult.success) {
    return {
      success: true,
      mode: detectScriptMode(scriptResult.ast),
      ast: scriptResult.ast,
      error: null,
    };
  }

  var functionResult = parseFunctionExpression(content);

  if (functionResult.success) {
    return {
      success: true,
      mode: "function-expression",
      ast: functionResult.ast,
      error: null,
    };
  }

  return {
    success: false,
    mode: null,
    ast: null,
    error: scriptResult.error,
  };
}

module.exports = {
  parseTrigger: parseTrigger,
};
