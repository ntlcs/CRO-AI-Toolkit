# Safe Listener

## Objetivo

Registrar um event listener com proteção contra duplicação e permitir a remoção do listener anterior quando o código do VWO executar novamente.

## Quando utilizar

- Quando o teste adiciona eventos de clique.
- Quando o VWO pode executar o JavaScript mais de uma vez.
- Quando a página possui navegação SPA.
- Quando o elemento permanece no DOM durante a reexecução.
- Quando o listener é registrado em `document`, `window` ou em um elemento persistente.

## Quando não utilizar

- Quando nenhum listener novo é necessário.
- Quando o comportamento pode ser resolvido reutilizando o evento original.
- Quando o elemento é completamente recriado e exige uma estratégia específica.
- Quando o listener é temporário e pode utilizar a opção `once`.

## Riscos evitados

- Clique disparado duas vezes.
- Evento duplicado no `dataLayer`.
- Função executada várias vezes.
- Vazamento de memória.
- Listener antigo permanecendo após reexecução do VWO.

## Estrutura

```javascript
(function () {
  var listenerKey = '__vwoTestSafeListener';
  var target = document;
  var eventName = 'click';

  if (window[listenerKey]) {
    target.removeEventListener(eventName, window[listenerKey]);
  }

  function handleClick(event) {
    var element = event.target.closest('[data-vwo-element]');

    if (element === null) {
      return;
    }

    element.click();
  }

  window[listenerKey] = handleClick;
  target.addEventListener(eventName, window[listenerKey]);
})();
```

## Adaptação obrigatória

Antes de utilizar:

- trocar `__vwoTestSafeListener` por uma chave exclusiva do teste;
- trocar o seletor `[data-vwo-element]`;
- trocar o tipo de evento quando necessário;
- escolher corretamente entre `document`, `window` ou o elemento específico;
- remover `element.click()` e aplicar a ação real do teste.

## Exemplo de chave por teste

```javascript
var listenerKey = '__vwoTest2270Click';
```

## Uso com elemento específico

```javascript
(function () {
  var listenerKey = '__vwoTest2270ButtonClick';
  var button = document.querySelector('#vwo-button');

  if (button === null) {
    return;
  }

  if (window[listenerKey]) {
    button.removeEventListener('click', window[listenerKey]);
  }

  function handleButtonClick() {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: 'clique',
      custom_section: 'planos-claro-res:dados-pessoais',
      custom_title: 'CRO-clique:botao'
    });
  }

  window[listenerKey] = handleButtonClick;
  button.addEventListener('click', window[listenerKey]);
})();
```

## Checklist

- O listener antigo é removido antes do novo?
- A chave global é exclusiva do teste?
- O seletor está limitado ao componente correto?
- O clique dispara somente uma vez?
- O evento não dispara no carregamento?
- O `dataLayer` recebe somente um evento?
- O comportamento continua correto após reexecução do VWO?
- O listener continua válido após navegação SPA?
- O elemento pode ser reconstruído?
- O listener deveria estar em `document` ou diretamente no elemento?

## Testes onde foi utilizado

Adicionar os números dos testes conforme o padrão for aplicado e validado.

## Status

Versão inicial.
