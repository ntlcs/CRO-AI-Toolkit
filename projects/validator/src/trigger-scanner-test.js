var fs = require("fs");
var path = require("path");
var triggerAst = require("./trigger-ast");
var triggerScanner = require("./trigger-scanner");

function printCounter(label, counter) {
  console.log(label + ": " + counter.count);
}

function printEvents(events) {
  Object.keys(events).forEach(function (eventName) {
    printCounter(eventName, events[eventName]);
  });
}

var filePath = process.argv[2];

if (filePath === undefined) {
  console.log("Informe um arquivo de trigger.");

  process.exit(1);
}

var absolutePath = path.resolve(filePath);

if (fs.existsSync(absolutePath) === false) {
  console.log("Arquivo não encontrado.");

  process.exit(1);
}

var content = fs.readFileSync(absolutePath, "utf8");

var astResult = triggerAst.parseTrigger(content);

if (astResult.success === false) {
  console.log("");
  console.log("Trigger inválida.");

  if (astResult.error) {
    console.log("Linha: " + astResult.error.line);

    console.log("Coluna: " + astResult.error.column);

    console.log("Erro: " + astResult.error.message);
  }

  process.exit(1);
}

var scan = triggerScanner.scanTrigger(astResult.ast);

console.log("");
console.log("Trigger Scanner");
console.log("");

console.log("Arquivo: " + path.basename(absolutePath));

console.log("Formato: " + astResult.mode);

console.log("");
console.log("GERAL");

printCounter("executeTrigger", scan.executeTrigger);

printCounter("vwoReady", scan.vwoReady);

printCounter("observer", scan.observer);

printCounter("polling", scan.polling);

printCounter("clearInterval", scan.clearInterval);

printCounter("timeout", scan.timeout);

printCounter("clearTimeout", scan.clearTimeout);

printCounter("fetch", scan.fetch);

printCounter("addEventListener", scan.addEventListener);

printCounter("removeEventListener", scan.removeEventListener);

printCounter("host", scan.host);

printCounter("hostname", scan.hostname);

printCounter("pathname", scan.pathname);
printCounter("href", scan.href);

console.log("");
console.log("EVENTOS ADICIONADOS");

printEvents(scan.eventsAdded);

console.log("");
console.log("EVENTOS REMOVIDOS");

printEvents(scan.eventsRemoved);

console.log("");
console.log("OPÇÕES");

printCounter("once", scan.options.once);

printCounter("passive", scan.options.passive);
