# Gerar checklist de QA para teste A/B no VWO

## Objetivo

Gerar um checklist de QA específico para uma implementação de teste A/B executada no VWO.

O checklist deve considerar o comportamento esperado, o código JavaScript, o CSS, o DOM, os eventos, o GTM, o VWO, desktop, mobile, SPA, resize, acessibilidade e possíveis regressões.

---

## Quando utilizar

Utilize:

- depois que o JavaScript e o CSS estiverem prontos;
- depois da revisão técnica;
- antes de enviar o teste para QA;
- depois de uma correção solicitada pelo QA;
- antes de publicar o teste no VWO;
- quando houver alterações em targeting, analytics ou trigger customizada.

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
- número de variantes;
- ID VWO.

### Contexto

- objetivo técnico;
- comportamento atual;
- comportamento esperado;
- diferenças entre desktop e mobile;
- critérios de aceite;
- restrições;
- componentes fora do escopo.

### Página e DOM

- HTML relevante;
- elementos envolvidos;
- seletores;
- elementos interativos;
- atributos `data-*`;
- links;
- componentes relacionados;
- comportamento responsivo.

### Implementação

- JavaScript completo;
- CSS completo;
- trigger customizada;
- configuração de Pages;
- configuração de Targeting;
- eventos GTM;
- eventos VWO;
- parâmetros do `dataLayer`.

### Comportamento técnico

- existência de SPA;
- renderização tardia;
- uso de MutationObserver;
- uso de resize;
- comportamento após reload;
- comportamento após mudança de rota;
- comportamento após reexecução do VWO.

---

## Prompt

Atue como um QA técnico e Desenvolvedor Front-end Sênior especialista em CRO, testes A/B, VWO, JavaScript Vanilla, DOM, CSS puro, GTM, GA4, responsividade, acessibilidade e aplicações SPA.

Analise o material fornecido e gere um checklist de validação específico para o teste.

Não gere itens genéricos que não se aplicam ao código ou ao contexto informado.

Não assuma que a implementação está correta.

Tente identificar cenários capazes de quebrar o teste.

Siga integralmente as regras definidas em `knowledge/coding-rules.md`.

---

## Formato obrigatório da resposta

Organize a resposta exatamente nas seções abaixo.

## 1. Resumo do teste

Informe objetivamente:

- o que será alterado;
- quais elementos estão envolvidos;
- quais devices estão no escopo;
- quais interações precisam ser validadas;
- quais eventos precisam ser preservados ou criados;
- quais riscos técnicos merecem maior atenção.

## 2. Pré-condições

Liste tudo que precisa existir antes do teste:

- URL correta;
- parâmetros;
- massa de teste;
- login;
- estado do carrinho;
- CEP;
- produto;
- etapa da jornada;
- variante ativa;
- targeting ativo;
- trigger configurada;
- ambiente correto;
- cache limpo;
- ferramentas abertas.

Inclua somente itens aplicáveis.

## 3. Validação no VWO

Criar itens específicos para:

### Pages

- correspondência da URL;
- query string;
- parâmetros;
- exclusões;
- múltiplas URLs;
- rota em SPA.

### Variations & Traffic

- variação correta;
- JavaScript carregado;
- CSS carregado;
- ausência de duplicação;
- tráfego configurado;
- preview;
- execução publicada.

### Targeting

- condição de início;
- trigger customizada;
- clique;
- scroll;
- elemento visível;
- carregamento;
- risco de disparo antecipado;
- risco de não disparo;
- risco de duplicação;
- comportamento em SPA.

## 4. Validação funcional

Criar cenários para validar:

- comportamento original;
- comportamento da variação;
- criação de elementos;
- remoção ou ocultação;
- movimentação de elementos;
- alteração de texto;
- alteração de link;
- clique;
- abertura e fechamento;
- estados ativos e inativos;
- navegação;
- retorno;
- interação repetida;
- múltiplos cliques;
- teclado;
- foco;
- toque;
- links externos;
- componentes relacionados.

## 5. Desktop

Validar, quando aplicável:

- resolução grande;
- resolução intermediária;
- resize;
- alinhamento;
- largura;
- altura;
- espaçamento;
- overflow;
- posição;
- z-index;
- menus;
- autocomplete;
- modal;
- overlay;
- foco;
- teclado;
- hover;
- clique.

## 6. Mobile

Validar, quando aplicável:

- largura pequena;
- orientação retrato;
- orientação paisagem;
- toque;
- scroll;
- overflow horizontal;
- empilhamento;
- largura dos elementos;
- quebra de texto;
- elementos fixos;
- teclado virtual;
- reabertura do componente;
- mudança de orientação;
- resize;
- duplicação após troca de viewport.

## 7. SPA e renderização tardia

Validar, quando aplicável:

- carregamento inicial;
- navegação interna;
- mudança de rota sem reload;
- retorno para a rota;
- componente removido;
- componente recriado;
- alteração reaplicada;
- ausência de duplicação;
- listeners antigos removidos;
- observers antigos desconectados;
- estado restaurado fora da rota;
- targeting reaplicado;
- evento disparado apenas uma vez.

## 8. MutationObserver

Quando existir observer, validar:

- necessidade real;
- container observado;
- ausência de observação excessiva;
- callback;
- risco de loop;
- desconexão;
- recriação;
- duplicação;
- impacto de performance;
- comportamento após remover o componente.

Quando não existir observer, não criar itens artificiais.

## 9. Resize

Quando existir tratamento de resize, validar:

- desktop para mobile;
- mobile para desktop;
- múltiplas alternâncias;
- ausência de elementos duplicados;
- estado atualizado;
- layout restaurado;
- listeners únicos;
- comportamento nos breakpoints;
- ausência de processamento excessivo.

Quando o layout for resolvido apenas por CSS, validar somente a resposta visual nos breakpoints.

## 10. Analytics, GTM e VWO

Validar:

- atributos `data-*`;
- classes utilizadas pelo GTM;
- evento original;
- evento novo;
- parâmetros;
- `dataLayer.push`;
- número de disparos;
- clique correto;
- ausência de disparo no carregamento;
- ausência de disparo em elementos incorretos;
- evento VWO;
- goals;
- métricas;
- link;
- `href`;
- `target`;
- custom section;
- custom title;
- category;
- action;
- label.

Não inventar eventos ausentes no material.

## 11. Acessibilidade

Validar, quando aplicável:

- elemento semântico;
- navegação por teclado;
- tecla Enter;
- tecla Espaço;
- foco visível;
- ordem de foco;
- nome acessível;
- atributos `aria-*`;
- estado expandido;
- contraste;
- comunicação além da cor;
- link e botão corretos;
- conteúdo oculto fora da navegação por teclado.

## 12. Performance e estabilidade

Validar:

- erros no console;
- warnings;
- duplicação;
- listeners;
- observers;
- processamento no resize;
- múltiplas execuções;
- reflow;
- layout thrashing;
- alteração contínua do DOM;
- carregamento lento;
- comportamento em interação repetida;
- vazamentos aparentes.

## 13. Regressões

Criar cenários para validar componentes que podem ser afetados indiretamente:

- elemento pai;
- elementos irmãos;
- menu;
- header;
- autocomplete;
- modal;
- overlay;
- carrinho;
- formulário;
- CTA;
- links;
- componentes compartilhados;
- jornada original;
- páginas fora da URL do teste.

## 14. Critérios de aprovação

Defina critérios objetivos para considerar o teste aprovado.

Exemplo:

- alteração aplicada apenas na URL correta;
- ausência de duplicação;
- comportamento correto em desktop e mobile;
- eventos disparados uma única vez;
- ausência de erro no console;
- página original preservada;
- targeting executado corretamente;
- regressões não identificadas.

## 15. Evidências recomendadas

Liste as evidências que devem ser registradas:

- print desktop;
- print mobile;
- vídeo curto;
- console;
- dataLayer;
- evento VWO;
- URL;
- variante;
- targeting;
- comportamento antes e depois;
- resultado após resize;
- resultado após navegação SPA.

## 16. Resultado esperado

Finalize com uma tabela:

| Área | Status esperado | Evidência |
|---|---|---|
| VWO Pages | | |
| Variação | | |
| Targeting | | |
| Desktop | | |
| Mobile | | |
| SPA | | |
| Analytics/GTM | | |
| Acessibilidade | | |
| Performance | | |
| Regressões | | |

---

## Regras obrigatórias

- Gerar checklist específico para o teste.
- Não gerar código.
- Não inventar eventos.
- Não inventar requisitos.
- Não incluir cenários irrelevantes.
- Diferenciar desktop e mobile.
- Considerar SPA somente quando aplicável.
- Considerar MutationObserver somente quando existir ou for tecnicamente necessário.
- Considerar resize somente quando aplicável.
- Incluir validação de reexecução do VWO.
- Incluir validação de analytics quando houver eventos.
- Incluir regressões em componentes relacionados.
- Tentar encontrar formas de quebrar o teste.

---

## Material do teste

### Identificação

Número:

Nome:

Área:

URL:

Devices:

Tipo de teste:

ID VWO:

### Objetivo técnico

[COLE AQUI]

### Comportamento esperado

[COLE AQUI]

### Critérios de aceite

[COLE AQUI]

### HTML relevante

```html
[COLE AQUI]
```

### JavaScript

```javascript
[COLE AQUI]
```

### CSS

```css
[COLE AQUI]
```

### Configuração de Pages

[COLE AQUI]

### Targeting e trigger

```javascript
[COLE AQUI]
```

### Analytics e GTM

[COLE AQUI]

### SPA, resize e renderização

[COLE AQUI]

### Problemas ou riscos conhecidos

[COLE AQUI]

### Observações adicionais

[COLE AQUI]
