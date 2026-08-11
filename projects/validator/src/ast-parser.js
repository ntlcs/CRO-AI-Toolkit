var acorn = require("acorn");

function parseJavaScript(content) {
  try {
    return {
      success: true,
      ast: acorn.parse(content, {
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

module.exports = {
  parseJavaScript: parseJavaScript,
};
