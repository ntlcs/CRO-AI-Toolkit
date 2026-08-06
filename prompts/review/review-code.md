
# Revisar código de teste A/B no VWO

## Objetivo

Revisar criticamente uma implementação de teste A/B para VWO, identificar problemas técnicos, riscos de regressão e oportunidades de melhoria, e entregar ao final o JavaScript completo e o CSS completo já corrigidos.

---

## Quando utilizar

Utilize este prompt depois que a primeira versão do código estiver pronta.

Também pode ser utilizado:

- antes do QA;
- depois de uma correção;
- ao receber código de outro desenvolvedor;
- ao revisar uma versão antiga;
- antes de subir o código para o GitHub;
- quando o código funciona, mas apresenta comportamento instável;
- quando houver suspeita de regressão em SPA, resize, mobile ou desktop.

---

## Entrada esperada

Forneça, quando disponível:

### Identificação

- número do teste;
- nome do teste;
- área ou produto;
- URL;
- devices;
- tipo de teste;
- quantidade de variantes.

### Contexto

- objetivo técnico;
- comportamento atual;
- comportamento esperado;
- escopo do teste;
- restrições;
- critérios de aceite.

### Página e DOM

- HTML do elemento principal;
- HTML do container pai;
- HTML de elementos relacionados;
- seletores relevantes;
- atributos de analytics;
- comportamento responsivo;
- comportamento em SPA.

### Código

- JavaScript completo;
- CSS completo;
- trigger customizada, quando existir;
- código GTM relacionado, quando existir.

### Comportamento observado

- o que funciona;
- o que não funciona;
- erros apontados pelo QA;
- comportamento em desktop;
- comportamento em mobile;
- comportamento no resize;
- comportamento após reload;
- comportamento após navegação SPA;
- comportamento no VWO Preview.

---

## Prompt

Atue como um Desenvolvedor Front-end Sênior especialista em CRO, testes A/B, VWO, JavaScript Vanilla, DOM, CSS puro, GTM, GA4, responsividade, acessibilidade e aplicações SPA.

Revise criticamente o código fornecido.

Não assuma que o código está correto apenas porque funciona no primeiro carregamento.

Tente encontrar formas de quebrar a implementação.

Analise o comportamento em reexecução do VWO, SPA, renderização tardia, resize, desktop, mobile, analytics e interação com o código original da página.

Siga integralmente as regras definidas em `knowledge/coding-rules.md`.

Ao final, sempre gere o JavaScript completo e o CSS completo corrigidos.

Nunca entregue somente trechos para substituição.

Não preserve uma implementação problemática apenas para reduzir alterações.

Ao mesmo tempo, não reescreva tudo sem necessidade.

Preserve o comportamento atual que estiver correto e altere somente o necessário para eliminar riscos, bugs, duplicações e problemas de manutenção.

---

## Análise obrigatória

Organize a resposta exatamente nas seções abaixo.

## 1. Pontos fortes

Liste objetivamente os aspectos corretos da implementação.

Avalie, quando aplicável:

- clareza;
- organização;
- idempotência;
- reutilização de elementos originais;
- preservação de eventos;
- separação entre JavaScript e CSS;
- simplicidade;
- responsividade;
- tratamento de SPA;
- limpeza de listeners;
- limpeza de observers;
- escopo do CSS;
- acessibilidade;
- performance.

Não elogie genericamente.

Cite somente pontos confirmados pelo código.

## 2. Pontos fracos

Identifique problemas concretos.

Avalie:

- funções grandes;
- duplicação de lógica;
- seletores repetidos;
- seletores frágeis;
- consultas repetidas ao DOM;
- código morto;
- variáveis não utilizadas;
- funções não utilizadas;
- CSS morto;
- regras sobrescritas;
- especificidade excessiva;
- uso desnecessário de `important`;
- dependência de timing;
- uso inadequado de `setTimeout`;
- uso inadequado de `setInterval`;
- excesso de abstração;
- falta de limpeza;
- falta de proteção contra reexecução.

## 3. Riscos

Tente quebrar o código nos seguintes cenários:

### VWO

- execução mais de uma vez;
- preview;
- publicação;
- troca de variante;
- reinjeção;
- código executado antes do DOM esperado;
- targeting iniciando cedo demais.

### SPA

- navegação interna;
- mudança de rota sem reload;
- elemento removido e recriado;
- componente reconstruído;
- retorno para a rota;
- listener preso a elemento removido;
- observer permanecendo ativo fora do contexto.

### MutationObserver

- observer duplicado;
- observer em loop;
- observação ampla demais;
- callback executando trabalho desnecessário;
- observer nunca desconectado;
- alteração feita pelo próprio callback provocando novas mutações.

### Resize

- listener duplicado;
- execução excessiva;
- mudança de desktop para mobile;
- mudança de mobile para desktop;
- elementos duplicados;
- layout não restaurado;
- estado incorreto após breakpoint.

### Desktop e mobile

- estrutura diferente;
- elementos ausentes;
- classes distintas;
- largura fixa;
- overflow;
- quebra de alinhamento;
- toque;
- foco;
- clique;
- orientação;
- autocomplete;
- menu;
- modal;
- overlay.

### Eventos e analytics

- perda de listeners originais;
- perda de atributos `data-*`;
- disparo duplicado;
- evento disparado no carregamento;
- evento disparado fora do clique correto;
- link alterado;
- `dataLayer.push` duplicado;
- GTM deixando de reconhecer o elemento;
- evento do VWO não disparando.

### CSS

- seletor afetando outros componentes;
- conflito com design system;
- regra global;
- elemento oculto mantendo espaço;
- elemento removido da navegação visual, mas não do teclado;
- overflow;
- z-index;
- posicionamento;
- comportamento inesperado em breakpoints.

### Performance

- leituras e escritas repetidas;
- consultas desnecessárias;
- observer pesado;
- resize sem controle;
- recriação de elementos;
- manipulação contínua do DOM;
- vazamento de memória.

## 4. Sugestões

Apresente somente sugestões que realmente melhorem:

- estabilidade;
- legibilidade;
- manutenção;
- performance;
- compatibilidade com VWO;
- comportamento em SPA;
- responsividade;
- analytics;
- acessibilidade.

Quando houver mais de uma solução, explique brevemente:

- opção mais simples;
- opção mais robusta;
- prós e contras;
- solução recomendada.

## 5. Correções aplicadas

Antes do código, resuma o que foi alterado.

Exemplo:

- removida duplicação de listener;
- adicionada proteção contra reexecução;
- reduzidas consultas ao DOM;
- observer restringido ao container correto;
- CSS limitado ao escopo do teste;
- eventos originais preservados;
- comportamento mobile corrigido.

Não use explicações genéricas.

## 6. JavaScript completo corrigido

Entregue todo o JavaScript final em um único bloco.

```javascript
```

Regras:

- código completo;
- sem comentários;
- sem jQuery;
- sem frameworks;
- sem TypeScript;
- sem optional chaining;
- sem nullish coalescing;
- sem operador ternário;
- sem operador de negação com exclamação;
- compatível com VWO;
- idempotente;
- com limpeza de listeners e observers quando necessário;
- preservando o comportamento original;
- sem código morto;
- sem funções não utilizadas;
- sem variáveis não utilizadas.

## 7. CSS completo corrigido

Entregue todo o CSS final em um único bloco.

```css
```

Regras:

- código completo;
- sem comentários;
- separado do JavaScript;
- sem CSS morto;
- sem duplicações;
- sem regras sem efeito;
- com escopo específico;
- compatível com desktop e mobile;
- sem impacto fora do teste;
- preservando o design system original.

Quando o teste não exigir CSS, informe:

```text
Este teste não exige CSS.
```

## 8. Checklist de validação

Gere um checklist específico para o código revisado.

Inclua somente os itens aplicáveis:

- carregamento inicial;
- reexecução do VWO;
- reload;
- navegação SPA;
- retorno para a rota;
- desktop;
- mobile;
- resize;
- orientação;
- clique;
- teclado;
- foco;
- link;
- target;
- analytics;
- GTM;
- dataLayer;
- evento VWO;
- console;
- duplicação;
- observer;
- listener;
- layout;
- autocomplete;
- menu;
- modal;
- overlay;
- regressão fora do escopo.

---

## Regras obrigatórias da revisão

- Sempre entregar o JavaScript completo corrigido.
- Sempre entregar o CSS completo corrigido quando houver CSS.
- Nunca entregar apenas os trechos alterados.
- Não utilizar comentários no código.
- Não alterar o escopo do teste.
- Não inventar requisitos.
- Não inventar eventos.
- Não inventar seletores.
- Não remover comportamento original sem justificativa.
- Não adicionar MutationObserver sem necessidade.
- Não adicionar resize quando CSS for suficiente.
- Não reescrever todo o código apenas por preferência pessoal.
- Não manter código ruim apenas porque já funciona.
- Informar quando a falta de informação impedir uma revisão segura.
- Mesmo com poucas correções, entregar os códigos completos ao final.

---

## Critérios de aprovação

O código somente pode ser considerado aprovado quando:

- não duplica elementos;
- não duplica listeners;
- não duplica observers;
- não duplica eventos;
- preserva analytics;
- preserva o comportamento original;
- suporta reexecução do VWO;
- trata SPA somente quando necessário;
- trata resize somente quando necessário;
- funciona no desktop conforme o escopo;
- funciona no mobile conforme o escopo;
- possui CSS limitado ao teste;
- não apresenta código morto;
- não apresenta vazamentos evidentes;
- não depende de timing arbitrário sem justificativa;
- é legível e fácil de manter.

---

## Material para revisão

### Identificação

Número:

Nome:

Área:

URL:

Devices:

Tipo de teste:

### Objetivo técnico

[COLE AQUI]

### Comportamento esperado

[COLE AQUI]

### HTML relevante

```html
[COLE AQUI]
```

### JavaScript atual

```javascript
[COLE AQUI]
```

### CSS atual

```css
[COLE AQUI]
```

### Trigger customizada

```javascript
[COLE AQUI]
```

### Analytics e GTM

[COLE AQUI]

### Comportamento em SPA

[COLE AQUI]

### Comportamento no resize

[COLE AQUI]

### Problemas encontrados

[COLE AQUI]

### Observações adicionais

[COLE AQUI]
