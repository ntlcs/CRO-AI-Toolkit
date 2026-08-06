# Planejar implementação no VWO

## Objetivo

Transformar a análise técnica do teste em um plano de implementação para o VWO, separando claramente o que será configurado em Pages, Variations & Traffic e Targeting.

## Quando utilizar

Utilize depois de analisar a solicitação do Jira e do Confluence e depois de inspecionar os elementos envolvidos na página.

Não utilizar antes de obter o HTML, os seletores e o comportamento atual dos componentes.

## Entrada esperada

Forneça, quando disponível:

- Número do teste
- Nome do teste
- Área
- URL
- Tipo de teste
- Devices
- Número de variantes
- Objetivo da alteração
- HTML do componente
- Elemento pai
- Elementos relacionados
- CSS relevante
- JavaScript existente
- Seletores identificados
- Comportamento atual
- Comportamento esperado
- Eventos existentes
- Atributos de analytics
- Necessidade de GTM
- Trigger informado no Confluence
- Comportamento da página em SPA
- Comportamento no resize
- Figma ou prints
- Restrições conhecidas

## Prompt

Atue como um Desenvolvedor Front-end Sênior especialista em CRO, testes A/B, VWO, JavaScript Vanilla, DOM, CSS puro, GTM, GA4 e aplicações SPA.

Analise as informações fornecidas e gere um plano técnico de implementação no VWO.

Não gere o código final nesta etapa.

Não invente seletores, eventos ou comportamentos que não tenham sido confirmados.

Organize a resposta exatamente nas seções abaixo.

## Pages

Informe:

- URL que deverá ser incluída;
- tipo de correspondência de URL mais adequado;
- necessidade de incluir mais de uma URL;
- necessidade de excluir URLs;
- presença de parâmetros;
- presença de query string;
- possibilidade de mudança de rota em SPA;
- riscos de a regra de URL ser ampla ou restritiva demais.

Quando não houver informação suficiente, indique a pendência.

## Variations & Traffic

Informe:

- número esperado de variantes;
- nome recomendado para cada variante;
- o que será feito por JavaScript;
- o que será feito por CSS;
- quais elementos originais serão reutilizados;
- quais elementos novos serão criados;
- quais eventos devem ser preservados;
- quais atributos devem ser preservados;
- quais comportamentos originais não podem ser alterados;
- necessidade de desktop;
- necessidade de mobile;
- necessidade de tratamento de resize;
- necessidade de proteção contra duplicação;
- necessidade de limpeza de listeners;
- necessidade de limpeza de observers;
- risco de reexecução do VWO;
- risco de renderização tardia;
- risco de reconstrução do DOM;
- risco de conflito com o JavaScript original da página.

Não sugerir MutationObserver sem evidência de renderização tardia ou reconstrução do DOM.

## Targeting

Informe qual estratégia parece mais adequada:

- carregamento da página;
- clique;
- scroll;
- elemento visível;
- trigger customizada;
- outra condição.

Explique:

- qual condição deve iniciar o teste;
- por que essa condição é necessária;
- se a URL sozinha é suficiente;
- se existe risco de disparo antecipado;
- se existe risco de disparo duplicado;
- se existe risco em navegação SPA;
- se a condição depende de um elemento assíncrono;
- se precisa aguardar login, etapa, modal ou componente específico;
- quais informações ainda precisam ser confirmadas.

## Analytics e GTM

Informe:

- eventos que já existem no elemento;
- eventos que precisam ser preservados;
- necessidade de criar evento novo;
- necessidade de ajustar GTM;
- atributos data existentes;
- atributos que não podem ser removidos;
- risco de duplicação de eventos;
- forma recomendada de validar no dataLayer;
- forma recomendada de validar no VWO;
- pendências de analytics.

## Estratégia técnica recomendada

Descreva a sequência de implementação recomendada:

1. localizar os elementos;
2. validar o contexto;
3. aplicar a alteração;
4. preservar os eventos originais;
5. tratar reexecução;
6. tratar SPA, quando necessário;
7. tratar resize, quando necessário;
8. validar analytics;
9. validar desktop;
10. validar mobile.

Adapte a sequência ao teste analisado.

## Riscos

Avalie:

- selector frágil;
- alteração em componente compartilhado;
- DOM reconstruído;
- observer em loop;
- listeners duplicados;
- alteração de layout;
- regressão mobile;
- regressão desktop;
- perda de eventos;
- duplicação de analytics;
- trigger iniciando cedo demais;
- trigger não iniciando;
- conflito entre CSS original e CSS da variação.

## Pendências antes de desenvolver

Liste somente as informações que precisam ser confirmadas antes da geração do código.

## Saída final

Finalize com uma tabela contendo:

| Área do VWO | Configuração recomendada | Status |
|---|---|---|
| Pages | | Confirmado ou Pendente |
| Variations & Traffic | | Confirmado ou Pendente |
| Targeting | | Confirmado ou Pendente |
| Analytics/GTM | | Confirmado ou Pendente |

## Regras obrigatórias

- Não gerar JavaScript.
- Não gerar CSS.
- Não inventar seletores.
- Não inventar eventos.
- Não assumir que a página é SPA.
- Não sugerir trigger customizada sem necessidade.
- Não sugerir MutationObserver sem evidência.
- Diferenciar claramente requisito confirmado e recomendação técnica.

## Informações do teste

[COLE AQUI]
