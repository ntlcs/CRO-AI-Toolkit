# Comparar V1 x V2

## Objetivo

Comparar tecnicamente duas implementações de um mesmo teste A/B executado no VWO.

O objetivo não é apenas encontrar diferenças no código, mas identificar alterações de comportamento, riscos, regressões, problemas de manutenção e oportunidades de reaproveitamento.

---

## Quando utilizar

Utilize quando:

- existir uma V1 e uma V2;
- houver refatoração;
- outra pessoa implementou uma variante;
- for necessário reproduzir o comportamento de outra versão;
- houver divergências entre desktop e mobile;
- houver suspeita de regressão.

---

## Entrada esperada

Forneça:

- objetivo do teste;
- HTML relevante;
- JavaScript da V1;
- CSS da V1;
- JavaScript da V2;
- CSS da V2;
- diferenças percebidas durante os testes.

---

## Prompt

Atue como um Desenvolvedor Front-end Sênior especialista em CRO, VWO, JavaScript Vanilla, DOM, CSS puro, GTM, GA4 e aplicações SPA.

Compare profundamente as duas implementações.

Não faça apenas um diff textual.

Considere comportamento, arquitetura, estabilidade, manutenção, performance e compatibilidade com VWO.

---

## Analise obrigatoriamente

### Estrutura

- organização
- funções
- responsabilidades
- reutilização

---

### Fluxo

- ordem de execução
- inicialização
- proteção contra reexecução

---

### DOM

- elementos reutilizados
- elementos criados
- elementos removidos
- elementos clonados
- elementos movidos

---

### Seletores

- robustez
- especificidade
- riscos

---

### Eventos

- listeners
- remoção
- duplicação
- preservação

---

### MutationObserver

- necessidade
- escopo
- limpeza
- performance

---

### Resize

- necessidade
- implementação
- riscos

---

### SPA

- comportamento
- reexecução
- renderização tardia

---

### CSS

- organização
- escopo
- duplicações
- conflitos
- responsividade

---

### Desktop

Analise possíveis diferenças.

---

### Mobile

Analise possíveis diferenças.

---

### Analytics

Analise:

- dataLayer
- GTM
- atributos
- eventos

---

### Performance

Analise:

- consultas ao DOM
- loops
- listeners
- observers
- reflow
- repaint

---

### Acessibilidade

Analise:

- foco
- teclado
- aria
- semântica

---

## Classifique

Informe qual implementação é superior em:

- legibilidade
- manutenção
- performance
- estabilidade
- simplicidade
- compatibilidade VWO
- desktop
- mobile
- SPA
- analytics

---

## Possíveis regressões

Liste todas.

---

## Melhorias recomendadas

Explique:

- o que manter da V1;
- o que manter da V2;
- o que remover;
- o que unificar.

---

## Versão recomendada

Escolha uma das opções:

- manter V1;
- manter V2;
- criar uma V3.

Justifique tecnicamente.

---

## Caso seja recomendada uma V3

Gerar:

- estratégia;
- lista das alterações;
- riscos.

Não gerar código.

---

## Material

### Objetivo

[COLE AQUI]

### HTML

```html
[COLE AQUI]
```

### JavaScript V1

```javascript
[COLE AQUI]
```

### CSS V1

```css
[COLE AQUI]
```

### JavaScript V2

```javascript
[COLE AQUI]
```

### CSS V2

```css
[COLE AQUI]
```

### Diferenças percebidas

[COLE AQUI]
