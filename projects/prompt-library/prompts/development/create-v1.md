# Criar V1 para teste A/B no VWO

## Objetivo

Gerar uma variação V1 completa para um teste A/B executado no VWO, utilizando JavaScript Vanilla e CSS puro, com foco em segurança, manutenção, compatibilidade, responsividade e preservação do comportamento original da página.

---

## Quando utilizar

Utilize este prompt depois de concluir:

- análise da solicitação do Jira e do Confluence;
- inspeção da página;
- análise do DOM;
- análise dos estilos relevantes;
- definição do comportamento esperado;
- definição do plano de implementação no VWO.

Não utilizar este prompt quando ainda faltarem informações essenciais sobre os elementos, o comportamento ou o escopo do teste.

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

### Objetivo

- objetivo técnico;
- comportamento atual;
- comportamento esperado;
- diferenças entre desktop e mobile;
- ação esperada no clique;
- destino de links;
- estados visuais;
- regras de negócio relevantes.

### Página e DOM

- outerHTML do elemento principal;
- outerHTML do elemento pai;
- outerHTML dos elementos irmãos relevantes;
- seletores identificados;
- atributos `data-*`;
- IDs;
- classes;
- estrutura do componente;
- elementos interativos envolvidos.

### CSS

- regras relevantes da aba Styles;
- valores relevantes da aba Computed;
- breakpoints;
- sistema de layout utilizado;
- diferenças entre desktop e mobile;
- conflitos conhecidos;
- referência visual do Figma ou print.

### JavaScript existente

- código original relacionado ao componente;
- comportamento já existente;
- listeners;
- handlers;
- observers;
- scripts da página que possam interferir.

### Analytics e GTM

- eventos existentes;
- atributos de analytics;
- atributos utilizados pelo GTM;
- evento novo, quando solicitado;
- parâmetros do `dataLayer`;
- regras de disparo;
- informações do VWO.

### VWO

- regra de Pages;
- configuração da variação;
- necessidade de targeting;
- trigger;
- comportamento em SPA;
- renderização tardia;
- necessidade de resize;
- risco de reexecução.

### Restrições

- comportamento que não pode ser alterado;
- componentes fora do escopo;
- requisitos de acessibilidade;
- limitações conhecidas;
- validações obrigatórias.

---

## Prompt

Atue como um Desenvolvedor Front-end Sênior especialista em CRO, testes A/B, VWO, JavaScript Vanilla, DOM, CSS puro, GTM, GA4, responsividade, acessibilidade e aplicações SPA.

Sua tarefa é gerar a V1 completa do teste descrito abaixo.

O código será executado dentro do editor do VWO.

Antes de gerar o código, analise criticamente o material fornecido.

Não assuma que a solicitação está tecnicamente correta.

Não invente seletores, eventos, estruturas, atributos ou comportamentos ausentes.

Quando houver informação insuficiente para uma implementação segura, não gere código incompleto. Liste primeiro as pendências necessárias.

Siga integralmente as regras definidas em `knowledge/coding-rules.md`.

---

## Análise obrigatória antes do código

Apresente primeiro:

### Entendimento do teste

Resuma objetivamente:

- o que será alterado;
- quais elementos estão envolvidos;
- qual comportamento original será preservado;
- qual comportamento novo será implementado;
- diferenças entre desktop e mobile;
- analytics e GTM envolvidos.

### Estratégia técnica

Explique brevemente:

- quais elementos serão reutilizados;
- quais elementos serão criados;
- quais elementos serão movidos, ocultados ou estilizados;
- o que será resolvido por JavaScript;
- o que será resolvido por CSS;
- como será evitada duplicação;
- como será tratada a reexecução do VWO;
- se existe necessidade de SPA;
- se existe necessidade de resize;
- se existe necessidade de MutationObserver;
- como os eventos originais serão preservados.

### Riscos

Liste riscos específicos do teste:

- seletor frágil;
- componente reconstruído;
- renderização tardia;
- conflito com CSS original;
- quebra em mobile;
- quebra em desktop;
- perda de analytics;
- evento duplicado;
- listener duplicado;
- observer em loop;
- alteração em componente compartilhado;
- regressão fora do escopo.

### Pendências

Liste somente informações realmente necessárias antes da implementação.

Se não houver pendências, informe:

```text
Nenhuma pendência bloqueante.
```

---

## Regras obrigatórias de implementação

### JavaScript

- Utilizar somente JavaScript Vanilla.
- Não utilizar jQuery.
- Não utilizar frameworks.
- Não utilizar TypeScript.
- Não utilizar bibliotecas externas.
- Não utilizar optional chaining.
- Não utilizar nullish coalescing.
- Não utilizar operador ternário.
- Não utilizar operador de negação com exclamação.
- Não utilizar comentários.
- Entregar o JavaScript completo.
- Não entregar apenas trechos.
- Organizar o código em funções pequenas.
- Utilizar nomes claros.
- Evitar abstrações desnecessárias.
- Evitar repetição de seletores.
- Evitar consultas repetidas ao DOM.
- Evitar processamento desnecessário.
- Preservar eventos e comportamentos originais.
- Preservar atributos de analytics e GTM.
- Evitar clonar elementos interativos quando for possível reutilizar o original.
- Evitar `setInterval`.
- Utilizar `setTimeout` somente quando necessário.
- Utilizar `MutationObserver` somente quando houver evidência concreta.
- Desconectar observers antigos antes de criar novos.
- Remover listeners antigos antes de registrar novos quando houver risco de reexecução.
- Utilizar chaves globais para controlar listeners, observers e estados quando necessário.
- Garantir idempotência.
- Garantir que a execução repetida não duplique elementos, listeners, observers ou eventos.
- Considerar navegação SPA somente quando houver evidência.
- Considerar resize somente quando CSS não for suficiente.
- Preservar o comportamento original fora do escopo do teste.

### CSS

- Entregar o CSS separado do JavaScript.
- Não injetar CSS pelo JavaScript.
- Não utilizar comentários.
- Utilizar seletores específicos do teste.
- Evitar seletores globais.
- Evitar alterar classes compartilhadas sem escopo.
- Utilizar classe exclusiva do teste quando necessário.
- Evitar `important`.
- Utilizar `important` somente quando houver justificativa técnica real.
- Evitar CSS duplicado.
- Evitar regras sem efeito.
- Preservar o design system original.
- Considerar `box-sizing`.
- Considerar flexbox ou grid já existentes.
- Evitar larguras fixas desnecessárias.
- Considerar desktop, mobile e resize.
- Não resolver com JavaScript o que pode ser resolvido com CSS.
- Evitar impacto em elementos pais, irmãos, overlays, menus, modais e autocompletes.

### Analytics e GTM

- Preservar atributos `data-*`.
- Preservar classes utilizadas por GTM.
- Preservar links e handlers originais.
- Não criar evento novo sem solicitação.
- Não inventar nomes de eventos.
- Não duplicar `dataLayer.push`.
- Quando houver elemento novo, aplicar apenas os atributos solicitados.
- Diferenciar claramente evento da página, evento GTM e evento VWO.

### Acessibilidade

- Preservar elementos semânticos.
- Utilizar `button` para ações.
- Utilizar `a` para navegação.
- Preservar `href`, `target`, `title`, `aria-*` e foco.
- Não criar controles sem nome acessível.
- Não remover acesso por teclado.
- Não depender somente de cor para comunicar estado.

---

## Formato obrigatório da resposta

A resposta deve seguir exatamente esta ordem:

### 1. Entendimento do teste

### 2. Estratégia técnica

### 3. Riscos

### 4. Pendências

### 5. JavaScript completo

Entregar em um único bloco:

```javascript
```

### 6. CSS completo

Entregar em um único bloco:

```css
```

### 7. Checklist de validação

Gerar checklist específico para o teste, cobrindo quando aplicável:

- carregamento inicial;
- reexecução do VWO;
- reload;
- navegação SPA;
- desktop;
- mobile;
- resize;
- clique;
- teclado;
- links;
- eventos;
- GTM;
- dataLayer;
- VWO;
- console;
- duplicação;
- layout;
- regressões;
- acessibilidade.

---

## Critérios de qualidade

A implementação deve:

- resolver somente o escopo solicitado;
- preservar o comportamento original;
- ser simples;
- ser legível;
- ser idempotente;
- ser compatível com o VWO;
- funcionar em desktop e mobile conforme o escopo;
- evitar vazamentos de memória;
- evitar listeners duplicados;
- evitar observers duplicados;
- evitar analytics duplicado;
- evitar CSS genérico;
- evitar dependência de timing arbitrário;
- ser fácil de revisar e manter.

---

## Material do teste

### Identificação

Número:

Nome:

Área:

URL:

Devices:

Tipo de teste:

Número de variantes:

### Objetivo técnico

[COLE AQUI]

### Comportamento atual

[COLE AQUI]

### Comportamento esperado

[COLE AQUI]

### HTML do elemento principal

```html
[COLE AQUI]
```

### HTML do elemento pai

```html
[COLE AQUI]
```

### Elementos relacionados

```html
[COLE AQUI]
```

### CSS relevante

```css
[COLE AQUI]
```

### JavaScript existente

```javascript
[COLE AQUI]
```

### Analytics e GTM

[COLE AQUI]

### VWO e targeting

[COLE AQUI]

### Desktop

[COLE AQUI]

### Mobile

[COLE AQUI]

### SPA, resize e renderização

[COLE AQUI]

### Figma ou referência visual

[COLE AQUI]

### Restrições

[COLE AQUI]

### Observações adicionais

[COLE AQUI]
