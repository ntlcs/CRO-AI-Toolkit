function getNodeName(node) {
  if (node === null || node === undefined) {
    return null;
  }

  if (node.type === "Identifier") {
    return node.name;
  }

  if (node.type === "MemberExpression") {
    var objectName = getNodeName(node.object);
    var propertyName = getNodeName(node.property);

    if (objectName === null || propertyName === null) {
      return null;
    }

    return objectName + "." + propertyName;
  }

  return null;
}

function getEventName(node) {
  if (node === null || node === undefined) {
    return null;
  }

  if (node.type === "Literal") {
    return String(node.value);
  }

  return null;
}

function getHandlerName(node) {
  if (node === null || node === undefined) {
    return null;
  }

  if (node.type === "Identifier") {
    return node.name;
  }

  if (
    node.type === "FunctionExpression" ||
    node.type === "ArrowFunctionExpression"
  ) {
    return "anonymous";
  }

  return null;
}

function walk(node, callback) {
  if (node === null || node === undefined || typeof node !== "object") {
    return;
  }

  callback(node);

  Object.keys(node).forEach(function (key) {
    var value = node[key];

    if (Array.isArray(value)) {
      value.forEach(function (child) {
        walk(child, callback);
      });

      return;
    }

    if (value && typeof value === "object" && typeof value.type === "string") {
      walk(value, callback);
    }
  });
}

function getListenerData(node, methodName) {
  if (node.type !== "CallExpression") {
    return null;
  }

  if (node.callee.type !== "MemberExpression") {
    return null;
  }

  var propertyName = getNodeName(node.callee.property);

  if (propertyName !== methodName) {
    return null;
  }

  var target = getNodeName(node.callee.object);

  var eventName = getEventName(node.arguments[0]);

  var handlerName = getHandlerName(node.arguments[1]);

  return {
    target: target,
    eventName: eventName,
    handlerName: handlerName,
    lineNumber: node.loc.start.line,
  };
}

function getListenerKey(listener) {
  return (
    listener.target + "|" + listener.eventName + "|" + listener.handlerName
  );
}

function analyzeListeners(ast) {
  var addedListeners = [];
  var removedListeners = [];

  walk(ast, function (node) {
    var added = getListenerData(node, "addEventListener");

    if (added) {
      addedListeners.push(added);
    }

    var removed = getListenerData(node, "removeEventListener");

    if (removed) {
      removedListeners.push(removed);
    }
  });

  var removedKeys = {};

  removedListeners.forEach(function (listener) {
    removedKeys[getListenerKey(listener)] = true;
  });

  return addedListeners.map(function (listener) {
    var key = getListenerKey(listener);

    return {
      target: listener.target,
      eventName: listener.eventName,
      handlerName: listener.handlerName,
      lineNumber: listener.lineNumber,
      hasCleanup: removedKeys[key] === true,
    };
  });
}

module.exports = {
  analyzeListeners: analyzeListeners,
};
