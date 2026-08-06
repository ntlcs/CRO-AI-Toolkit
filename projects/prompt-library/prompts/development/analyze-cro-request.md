# Analisar solicitação CRO

## Objetivo

Analisar uma solicitação de teste A/B recebida pelo Jira e detalhada no Confluence, transformando as informações de negócio em um resumo técnico para desenvolvimento no VWO.

## Quando utilizar

Utilize este prompt ao receber uma nova atividade, antes de analisar o DOM da página ou iniciar o desenvolvimento.

## Entrada esperada

Forneça, quando disponível:

- Número do teste
- Nome do teste
- Área ou produto relacionado
- Descrição do Jira
- Conteúdo do Confluence
- URL do teste
- Devices envolvidos
- Tipo de teste
- Número de variantes
- Link ou print do Figma
- Objetivo do teste
- Hipótese
- Critérios de sucesso
- Métricas
- Informações sobre GTM
- Informações sobre eventos
- Informações sobre API
- Trigger do teste
- Massa de teste
- Observações adicionais

## Prompt

Atue como um Desenvolvedor Front-end Sênior especialista em CRO, testes A/B, VWO, JavaScript Vanilla, DOM, CSS puro, GTM, GA4 e aplicações SPA.

Analise a solicitação abaixo sem gerar código.

Sua tarefa é transformar as informações recebidas do Jira e do Confluence em uma especificação técnica inicial para desenvolvimento.

Não invente informações ausentes.

Quando algum dado necessário não estiver disponível, liste-o como pendência.

Organize a resposta exatamente nestas seções:

## Identificação

- Número do teste
- Nome do teste
- Área ou produto
- Tipo de teste
- Devices
- Número de variantes
- URL
- Link do Figma
- ID VWO, caso informado

## Objetivo técnico

Explique objetivamente o que deverá ser alterado na interface.

## Elementos que provavelmente estarão envolvidos

Liste os componentes que deverão ser localizados e analisados na página.

Não invente seletores.

## Comportamento esperado

Descreva:

- comportamento atual;
- comportamento da variação;
- diferenças entre desktop e mobile;
- ação esperada no clique;
- destino de links;
- estado visual;
- interações relacionadas.

## Analytics e GTM

Identifique:

- eventos necessários;
- métricas relacionadas;
- atributos existentes que precisam ser preservados;
- necessidade de ajuste no GTM;
- informações ainda não confirmadas.

## VWO

Identifique:

- comportamento que inicia o teste;
- necessidade de trigger customizada;
- carregamento da página;
- scroll;
- clique;
- elemento visível;
- possibilidade de execução em SPA;
- possíveis riscos de reexecução.

## Riscos técnicos iniciais

Avalie possíveis riscos relacionados a:

- renderização tardia;
- SPA;
- reconstrução do DOM;
- responsividade;
- duplicação;
- eventos existentes;
- links;
- acessibilidade;
- performance;
- analytics;
- coexistência entre V1 e página original.

## Informações que devem ser coletadas na página

Gere uma lista objetiva do que deve ser inspecionado no DevTools antes do desenvolvimento:

- HTML do componente;
- elemento pai;
- elementos irmãos;
- classes;
- IDs;
- atributos data;
- eventos;
- estilos;
- comportamento responsivo;
- renderização tardia;
- alterações após navegação SPA;
- comportamento no resize;
- analytics existente.

## Pendências

Liste somente as informações que ainda precisam ser confirmadas.

## Próxima ação recomendada

Indique exatamente o que deve ser feito na página antes de iniciar o código.

## Regras

- Não gerar JavaScript.
- Não gerar CSS.
- Não sugerir MutationObserver sem evidência.
- Não assumir que a página é SPA sem confirmação.
- Não inventar seletores.
- Não alterar o escopo do teste.
- Diferenciar claramente requisito de negócio e necessidade técnica.

## Solicitação

Cole abaixo o conteúdo do Jira e do Confluence:

[COLE AQUI]
