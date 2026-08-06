# Analisar página e DOM

## Objetivo

Analisar os elementos reais da página antes do desenvolvimento de uma variação no VWO, identificando estrutura, estilos, comportamento, analytics e riscos técnicos.

## Quando utilizar

Utilize depois de analisar a solicitação do Jira e do Confluence e antes de planejar ou gerar o código.

## Entrada esperada

Forneça, quando disponível:

- número e nome do teste;
- URL;
- devices;
- objetivo da alteração;
- print atual;
- print ou frame do Figma;
- outerHTML do elemento principal;
- outerHTML do container pai;
- outerHTML de elementos irmãos relevantes;
- regras relevantes da aba Styles;
- propriedades relevantes da aba Computed;
- atributos data;
- comportamento atual;
- comportamento no desktop;
- comportamento no mobile;
- comportamento no resize;
- comportamento após interação;
- comportamento após navegação SPA;
- eventos existentes.

## Prompt

Atue como um Desenvolvedor Front-end Sênior especialista em CRO, testes A/B, VWO, JavaScript Vanilla, DOM, CSS puro, GTM, GA4, responsividade e aplicações SPA.

Analise as informações da página sem gerar JavaScript ou CSS.

Não invente seletores, estilos, eventos ou comportamentos que não estejam presentes no material fornecido.

Organize a resposta exatamente nas seções abaixo.

## Elemento principal

Identifique:

- tag;
- classes;
- ID;
- atributos;
- função aparente;
- conteúdo;
- interação;
- eventos e atributos de analytics existentes.

## Estrutura do DOM

Analise:

- container pai;
- ancestral relevante;
- elementos irmãos;
- ordem dos elementos;
- dependências estruturais;
- relação com outros componentes;
- possibilidade de o elemento ser reconstruído.

## Seletores

Classifique os seletores disponíveis em:

- recomendados;
- aceitáveis com ressalvas;
- frágeis;
- não recomendados.

Explique brevemente o motivo.

Não crie seletores inexistentes.

## Análise visual

Compare a implementação atual com a referência visual.

Identifique diferenças em:

- posição;
- dimensões;
- espaçamentos;
- alinhamento;
- tipografia;
- cores;
- bordas;
- ícones;
- comportamento responsivo;
- ordem visual.

Diferencie valores confirmados no DevTools de valores estimados pelo Figma ou print.

## CSS atual

Analise as regras fornecidas em Styles e Computed.

Identifique:

- propriedade responsável pelo layout;
- propriedade responsável pela largura;
- sistema utilizado, como flex, grid ou posicionamento;
- conflitos;
- regras sobrescritas;
- especificidade;
- uso de `important`;
- impacto do `box-sizing`;
- limites de largura;
- overflow;
- possíveis efeitos colaterais.

## Comportamento responsivo

Analise separadamente:

### Desktop

- estrutura;
- largura;
- alinhamento;
- espaçamento;
- interações.

### Mobile

- estrutura;
- largura;
- empilhamento;
- overflow;
- toque;
- interações.

### Resize

- pontos de quebra;
- mudança de layout;
- necessidade de JavaScript;
- possibilidade de resolver apenas com CSS.

## Renderização e SPA

Avalie somente com base nas evidências:

- se o elemento existe no carregamento inicial;
- se aparece posteriormente;
- se é reconstruído;
- se muda após navegação interna;
- se precisa ser localizado novamente;
- se há evidência para MutationObserver;
- se uma inicialização simples e idempotente é suficiente.

Não recomendar MutationObserver sem evidência.

## Eventos, GTM e analytics

Identifique:

- elementos clicáveis;
- atributos `data-*`;
- eventos existentes;
- links;
- handlers que precisam ser preservados;
- risco de perder analytics ao clonar ou substituir elementos;
- risco de disparo duplicado.

## Estratégia técnica sugerida

Descreva a abordagem mais segura sem gerar código.

Indique:

- se deve reutilizar, mover, ocultar, estilizar ou criar elemento;
- se a alteração pode ser feita apenas com CSS;
- se exige JavaScript;
- se o elemento original deve ser preservado;
- se precisa de tratamento de desktop e mobile;
- se precisa de resize;
- se precisa de tratamento para SPA;
- se precisa de observer;
- como evitar duplicação.

## Riscos

Liste riscos específicos do material analisado:

- seletor frágil;
- alteração em componente compartilhado;
- conflito de CSS;
- regressão desktop;
- regressão mobile;
- quebra de autocomplete;
- quebra de menu, modal ou overlay;
- perda de eventos;
- duplicação de analytics;
- reflow;
- overflow;
- reconstrução do DOM.

## Informações faltantes

Liste somente o que ainda precisa ser coletado antes do código.

## Conclusão

Informe se o material é suficiente para:

- planejar a implementação;
- gerar o JavaScript;
- gerar o CSS;
- configurar o VWO;
- definir o targeting.

Use os estados:

- suficiente;
- parcialmente suficiente;
- insuficiente.

## Material da página

[COLE AQUI]
