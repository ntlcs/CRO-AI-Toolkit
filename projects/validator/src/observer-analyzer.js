function getNodeName(node) {
  if (node === null || node === undefined) {
    return null;
  }

  if (node.type === "Identifier") {
    return node.name;
  }

  if (node.type === "ThisExpression") {
    return "this";
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

function getBooleanValue(node) {
  if (node === null || node === undefined) {
    return null;
  }

  if (node.type === "Literal") {
    if (node.value === true) {
      return true;
    }

    if (node.value === false) {
      return false;
    }
  }

  return null;
}

function getObserverOptions(node) {
  var options = {
    childList: false,
    subtree: false,
    attributes: false,
    characterData: false,
  };

  if (node === null || node === undefined || node.type !== "ObjectExpression") {
    return options;
  }

  node.properties.forEach(function (property) {
    var propertyName = getNodeName(property.key);
    var propertyValue = getBooleanValue(property.value);

    if (propertyName === "childList" && propertyValue === true) {
      options.childList = true;
    }

    if (propertyName === "subtree" && propertyValue === true) {
      options.subtree = true;
    }

    if (propertyName === "attributes" && propertyValue === true) {
      options.attributes = true;
    }

    if (propertyName === "characterData" && propertyValue === true) {
      options.characterData = true;
    }
  });

  return options;
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

function getObserverCreation(node) {
  if (node.type !== "VariableDeclarator") {
    return null;
  }

  if (
    node.id === null ||
    node.id === undefined ||
    node.id.type !== "Identifier"
  ) {
    return null;
  }

  if (
    node.init === null ||
    node.init === undefined ||
    node.init.type !== "NewExpression"
  ) {
    return null;
  }

  var constructorName = getNodeName(node.init.callee);

  if (constructorName !== "MutationObserver") {
    return null;
  }

  return {
    variable: node.id.name,
    lineCreate: node.loc.start.line,
  };
}

function getObserverMethod(node, methodName) {
  if (node.type !== "CallExpression") {
    return null;
  }

  if (
    node.callee === null ||
    node.callee === undefined ||
    node.callee.type !== "MemberExpression"
  ) {
    return null;
  }

  var propertyName = getNodeName(node.callee.property);

  if (propertyName !== methodName) {
    return null;
  }

  var observerName = getNodeName(node.callee.object);

  if (observerName === null) {
    return null;
  }

  return {
    variable: observerName,
    node: node,
  };
}

function createObserverData(variable, lineCreate) {
  return {
    variable: variable,
    lineCreate: lineCreate,
    observes: [],
    disconnectLines: [],
  };
}

function analyzeObservers(ast) {
  var observers = {};

  walk(ast, function (node) {
    var creation = getObserverCreation(node);

    if (creation) {
      if (observers[creation.variable] === undefined) {
        observers[creation.variable] = createObserverData(
          creation.variable,
          creation.lineCreate,
        );
      }
    }

    var observeCall = getObserverMethod(node, "observe");

    if (observeCall) {
      var observer = observers[observeCall.variable];

      if (observer) {
        var target = getNodeName(observeCall.node.arguments[0]);

        var options = getObserverOptions(observeCall.node.arguments[1]);

        observer.observes.push({
          target: target,
          lineNumber: observeCall.node.loc.start.line,
          options: options,
        });
      }
    }

    var disconnectCall = getObserverMethod(node, "disconnect");

    if (disconnectCall) {
      var disconnectObserver = observers[disconnectCall.variable];

      if (disconnectObserver) {
        disconnectObserver.disconnectLines.push(
          disconnectCall.node.loc.start.line,
        );
      }
    }
  });

  return Object.keys(observers).map(function (key) {
    var observer = observers[key];

    return {
      variable: observer.variable,
      lineCreate: observer.lineCreate,
      observes: observer.observes,
      disconnectLines: observer.disconnectLines,
      hasDisconnect: observer.disconnectLines.length > 0,
    };
  });
}

module.exports = {
  analyzeObservers: analyzeObservers,
};
