function createCounter() {
  return {
    found: false,
    count: 0,
  };
}

function createEventCounters() {
  return {
    scroll: createCounter(),
    click: createCounter(),
    mouseenter: createCounter(),
    mousemove: createCounter(),
    mouseout: createCounter(),
    touchstart: createCounter(),
    beforeunload: createCounter(),
    visibilitychange: createCounter(),
    keydown: createCounter(),
    pointerdown: createCounter(),
    change: createCounter(),
    focus: createCounter(),
  };
}

function createScanResult() {
  return {
    executeTrigger: createCounter(),
    vwoReady: createCounter(),
    observer: createCounter(),
    polling: createCounter(),
    clearInterval: createCounter(),
    timeout: createCounter(),
    clearTimeout: createCounter(),
    fetch: createCounter(),
    addEventListener: createCounter(),
    removeEventListener: createCounter(),
    host: createCounter(),
    hostname: createCounter(),
    pathname: createCounter(),
    href: createCounter(),
    eventsAdded: createEventCounters(),
    eventsRemoved: createEventCounters(),
    options: {
      once: createCounter(),
      passive: createCounter(),
    },
  };
}

function increment(counter) {
  counter.found = true;
  counter.count += 1;
}

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

  if (node.type === "Literal") {
    return String(node.value);
  }

  if (node.type === "CallExpression") {
    var callName = getNodeName(node.callee);

    if (callName === null) {
      return null;
    }

    var argumentNames = [];

    node.arguments.forEach(function (argument) {
      var argumentName = getNodeName(argument);

      if (argumentName !== null) {
        argumentNames.push(argumentName);
      }
    });

    return callName + "(" + argumentNames.join(",") + ")";
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

function getLiteralValue(node) {
  if (node === null || node === undefined) {
    return null;
  }

  if (node.type === "Literal") {
    return node.value;
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
        if (
          child &&
          typeof child === "object" &&
          typeof child.type === "string"
        ) {
          walk(child, callback);
        }
      });

      return;
    }

    if (value && typeof value === "object" && typeof value.type === "string") {
      walk(value, callback);
    }
  });
}

function incrementEvent(eventCounters, eventName) {
  if (typeof eventName !== "string") {
    return;
  }

  if (eventCounters[eventName] === undefined) {
    return;
  }

  increment(eventCounters[eventName]);
}

function scanListenerOptions(node, result) {
  if (node === null || node === undefined || node.type !== "ObjectExpression") {
    return;
  }

  node.properties.forEach(function (property) {
    var propertyName = getNodeName(property.key);

    var propertyValue = getLiteralValue(property.value);

    if (propertyName === "once" && propertyValue === true) {
      increment(result.options.once);
    }

    if (propertyName === "passive" && propertyValue === true) {
      increment(result.options.passive);
    }
  });
}

function scanEventListener(node, result) {
  if (
    node.type !== "CallExpression" ||
    node.callee.type !== "MemberExpression"
  ) {
    return;
  }

  var methodName = getNodeName(node.callee.property);

  if (
    methodName !== "addEventListener" &&
    methodName !== "removeEventListener"
  ) {
    return;
  }

  var eventName = getLiteralValue(node.arguments[0]);

  if (methodName === "addEventListener") {
    increment(result.addEventListener);

    incrementEvent(result.eventsAdded, eventName);

    scanListenerOptions(node.arguments[2], result);

    return;
  }

  increment(result.removeEventListener);

  incrementEvent(result.eventsRemoved, eventName);
}

function scanCallExpression(node, result) {
  if (node.type !== "CallExpression") {
    return;
  }

  var calleeName = getNodeName(node.callee);

  if (calleeName === "executeTrigger") {
    increment(result.executeTrigger);
  }

  if (calleeName === "setInterval") {
    increment(result.polling);
  }

  if (calleeName === "clearInterval") {
    increment(result.clearInterval);
  }

  if (calleeName === "setTimeout") {
    increment(result.timeout);
  }

  if (calleeName === "clearTimeout") {
    increment(result.clearTimeout);
  }

  if (calleeName === "fetch") {
    increment(result.fetch);
  }

  if (
    node.callee.type === "MemberExpression" &&
    getNodeName(node.callee.property) === "ready"
  ) {
    var readyTarget = getNodeName(node.callee.object);

    if (readyTarget === "vwo_$(document)") {
      increment(result.vwoReady);
    }
  }

  scanEventListener(node, result);
}

function scanNewExpression(node, result) {
  if (node.type !== "NewExpression") {
    return;
  }

  var constructorName = getNodeName(node.callee);

  if (constructorName === "MutationObserver") {
    increment(result.observer);
  }
}

function scanMemberExpression(node, result) {
  if (node.type !== "MemberExpression") {
    return;
  }

  var propertyName = getNodeName(node.property);

  if (propertyName === "host") {
    increment(result.host);
  }

  if (propertyName === "hostname") {
    increment(result.hostname);
  }

  if (propertyName === "pathname") {
    increment(result.pathname);
  }

  if (propertyName === "href") {
    increment(result.href);
  }
}

function scanArrayForEachEvents(node, result) {
  if (
    node.type !== "CallExpression" ||
    node.callee.type !== "MemberExpression"
  ) {
    return;
  }

  if (getNodeName(node.callee.property) !== "forEach") {
    return;
  }

  if (node.callee.object.type !== "ArrayExpression") {
    return;
  }

  if (node.arguments.length === 0) {
    return;
  }

  var callback = node.arguments[0];

  if (
    callback.type !== "FunctionExpression" &&
    callback.type !== "ArrowFunctionExpression"
  ) {
    return;
  }

  if (callback.params.length === 0) {
    return;
  }

  var eventParameter = callback.params[0];

  if (eventParameter.type !== "Identifier") {
    return;
  }

  var parameterName = eventParameter.name;

  var listenerMethod = null;

  walk(callback.body, function (child) {
    if (
      child.type !== "CallExpression" ||
      child.callee.type !== "MemberExpression"
    ) {
      return;
    }

    var methodName = getNodeName(child.callee.property);

    if (
      methodName !== "addEventListener" &&
      methodName !== "removeEventListener"
    ) {
      return;
    }

    if (child.arguments.length === 0) {
      return;
    }

    var eventArgument = child.arguments[0];

    if (
      eventArgument.type !== "Identifier" ||
      eventArgument.name !== parameterName
    ) {
      return;
    }

    listenerMethod = methodName;
  });

  if (listenerMethod === null) {
    return;
  }

  node.callee.object.elements.forEach(function (element) {
    var eventName = getLiteralValue(element);

    if (listenerMethod === "addEventListener") {
      incrementEvent(result.eventsAdded, eventName);

      return;
    }

    incrementEvent(result.eventsRemoved, eventName);
  });
}

function scanTrigger(ast) {
  var result = createScanResult();

  walk(ast, function (node) {
    scanCallExpression(node, result);

    scanNewExpression(node, result);

    scanMemberExpression(node, result);

    scanArrayForEachEvents(node, result);
  });

  return result;
}

module.exports = {
  scanTrigger: scanTrigger,
};
