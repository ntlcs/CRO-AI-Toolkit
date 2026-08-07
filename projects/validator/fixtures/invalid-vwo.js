var button = jQuery(".button");
var text = button?.text();
var value = text ?? "Padrão";
var status = value ? "ativo" : "inativo";

console.log(status);
