# Regras de desenvolvimento

## Contexto

Todo código deste projeto será utilizado em testes A/B executados no VWO.

As implementações devem alterar somente o necessário, preservar o comportamento original da página e evitar impactos em componentes fora do escopo do teste.

---

## Tecnologias permitidas

- JavaScript Vanilla
- DOM API
- CSS puro
- VWO
- GTM
- GA4
- Git
- GitHub

---

## Tecnologias não permitidas

- jQuery
- Frameworks JavaScript
- TypeScript
- Bibliotecas externas

---

## Regras de JavaScript

- Entregar sempre o código completo.
- Não entregar somente trechos para substituição.
- Não utilizar optional chaining.
- Não utilizar nullish coalescing.
- Não utilizar operador ternário.
- Não utilizar operador de negação com exclamação.
- Não utilizar comentários, salvo quando solicitado.
- Utilizar `var` quando necessário para compatibilidade com o ambiente.
- Organizar o código em funções pequenas.
- Utilizar nomes claros para funções, variáveis e chaves globais.
- Evitar funções grandes.
- Evitar abstrações desnecessárias.
- Evitar repetição de seletores.
- Evitar consultas repetidas ao DOM.
- Evitar processamento desnecessário.
- Evitar `setInterval`.
- Utilizar `setTimeout` somente quando houver necessidade real.
- Não utilizar `document.write`.
- Não substituir elementos originais sem necessidade.
- Não clonar elementos interativos quando for possível reutilizar o elemento original.
- Preservar eventos, atributos e comportamentos existentes.
- Preservar atributos de analytics e GTM.
- Evitar disparos duplicados no `dataLayer`.
- Evitar variáveis e funções não utilizadas.
- Remover listeners antigos antes de adicionar novos quando houver possibilidade de reexecução.
- Remover observers antigos antes de criar novos.
- Armazenar listeners e observers em chaves globais quando for necessário realizar limpeza.
- Garantir que a execução repetida não duplique elementos, estilos, listeners ou observers.
- Considerar renderização tardia de componentes.
- Considerar navegação SPA.
- Considerar reconstrução do DOM.
- Considerar reexecução do VWO.
- Considerar mudança de rota sem recarregamento completo.
- Utilizar `MutationObserver` somente quando houver evidência de renderização tardia ou reconstrução do DOM.
- Desconectar o `MutationObserver` quando ele não for mais necessário.
- Evitar observers aplicados em áreas amplas do documento.
- Evitar callbacks de observer que alterem continuamente o mesmo DOM observado.
- Tratar `resize` somente quando o comportamento não puder ser resolvido apenas com CSS.
- Remover o listener de `resize` antigo antes de registrar um novo.
- Evitar cálculos de layout repetidos em eventos de alta frequência.
- Preservar o comportamento original da página.

---

## Regras de CSS

- Entregar o CSS separado do JavaScript.
- Não injetar CSS pelo JavaScript, salvo quando solicitado.
- Utilizar seletores específicos do contexto do teste.
- Evitar seletores globais.
- Evitar alterar classes compartilhadas sem limitar o escopo.
- Utilizar uma classe exclusiva do teste no container principal quando isso reduzir riscos.
- Evitar `important`.
- Utilizar `important` somente quando o CSS original não puder ser sobrescrito com segurança por especificidade.
- Evitar CSS duplicado.
- Evitar regras sem efeito.
- Evitar propriedades conflitantes.
- Preservar o design system original quando possível.
- Considerar `box-sizing`.
- Considerar largura mínima e máxima.
- Considerar `overflow`.
- Considerar flexbox e grid existentes.
- Evitar larguras fixas quando o componente precisa ser responsivo.
- Não resolver com JavaScript o que pode ser resolvido de forma segura com CSS.
- Separar regras desktop e mobile quando o comportamento for diferente.
- Considerar os breakpoints reais da página.
- Não assumir que desktop e mobile possuem a mesma estrutura.
- Validar o impacto em elementos irmãos, pais, overlays, menus, modais e autocompletes.

---

## Regras de responsividade

- Considerar desktop e mobile em todas as implementações.
- Considerar resize entre os breakpoints.
- Preservar o comportamento original em resoluções não afetadas pelo teste.
- Evitar JavaScript baseado apenas em `window.innerWidth` quando CSS for suficiente.
- Quando JavaScript depender do viewport, garantir atualização no resize.
- Evitar duplicação de elementos ao alternar entre desktop e mobile.
- Validar orientação retrato e paisagem quando aplicável.
- Validar toque em dispositivos móveis.
- Validar foco e teclado em desktop.

---

## Regras para SPA

- Não assumir que o carregamento inicial da página é suficiente.
- Verificar se o componente é reconstruído após navegação interna.
- Verificar se a URL muda sem reload.
- Verificar se o elemento desaparece e reaparece.
- Evitar duplicação após mudança de rota.
- Reaplicar a alteração somente quando necessário.
- Não manter listeners ligados a elementos removidos.
- Não manter observers antigos depois que o contexto do teste deixar de existir.
- Evitar observers globais permanentes.
- Preservar o estado original fora da rota do teste.

---

## Regras para VWO

- O código deve ser compatível com o editor do VWO.
- JavaScript e CSS devem ser entregues separados.
- A variação deve possuir proteção contra reexecução.
- A variação não deve duplicar elementos.
- A variação não deve duplicar estilos.
- A variação não deve duplicar listeners.
- A variação não deve duplicar observers.
- O código deve funcionar em preview e no experimento publicado.
- O targeting deve ser o mais simples possível.
- Não utilizar trigger customizada quando a URL e o carregamento da página forem suficientes.
- Não iniciar o teste antes de o contexto necessário existir.
- Não utilizar observer para compensar targeting mal configurado.
- Validar Pages, Variations & Traffic e Targeting separadamente.
- Preservar a página original quando a variação não estiver ativa.
- Não depender de recursos externos não aprovados.

---

## Regras para GTM e analytics

- Preservar atributos `data-*` existentes.
- Preservar eventos originais.
- Não remover classes utilizadas por GTM.
- Não alterar links originais sem necessidade.
- Não clonar elementos clicáveis quando isso puder perder listeners ou analytics.
- Quando criar um elemento novo, confirmar se ele precisa de atributos de analytics.
- Evitar múltiplos `dataLayer.push` para uma única interação.
- Validar o evento no `dataLayer`.
- Validar os parâmetros enviados.
- Validar se o evento é disparado apenas no clique esperado.
- Diferenciar evento da página, evento do GTM e evento do VWO.
- Não inventar nomes de eventos.
- Utilizar os nomes definidos pela documentação do teste ou pelo time de analytics.
- Não adicionar analytics quando não estiver no escopo.

---

## Regras de acessibilidade

- Preservar elementos semânticos existentes.
- Utilizar `button` para ações.
- Utilizar `a` para navegação.
- Preservar `href`, `target`, `title`, `aria-*` e estados existentes.
- Elementos clicáveis devem funcionar por teclado quando aplicável.
- Não utilizar apenas cor para comunicar estado.
- Preservar foco visível.
- Não criar controles sem nome acessível.
- Não esconder conteúdo relevante somente visualmente quando ele também precisar ser removido da navegação por teclado.
- Validar ordem de foco quando elementos forem movidos.

---

## Regras de performance

- Evitar consultas repetidas ao DOM.
- Evitar loops desnecessários.
- Evitar alterações repetidas de layout.
- Agrupar leituras e escritas no DOM quando possível.
- Evitar observers em `document.body` sem filtro ou necessidade comprovada.
- Evitar listeners de alta frequência sem controle.
- Evitar recriar elementos que já existem.
- Evitar recalcular estilos em cada mutação.
- Evitar alterar o DOM quando o estado já estiver correto.
- Priorizar soluções simples e idempotentes.

---

## Regras de revisão

Ao revisar um código, analisar:

- bugs;
- regressões;
- duplicações;
- vazamentos de memória;
- listeners;
- observers;
- reexecução;
- SPA;
- resize;
- desktop;
- mobile;
- performance;
- acessibilidade;
- analytics;
- GTM;
- CSS morto;
- JavaScript morto;
- funções não utilizadas;
- variáveis não utilizadas;
- seletores frágeis;
- conflitos com o comportamento original.

Antes de gerar uma versão corrigida, apresentar:

- pontos fortes;
- pontos fracos;
- riscos;
- sugestões.

Depois, gerar o código completo.

---

## Regras para comparação entre V1 e V2

Comparar:

- estrutura;
- fluxo de execução;
- comportamento;
- elementos criados;
- elementos reutilizados;
- seletores;
- eventos;
- listeners;
- MutationObserver;
- resize;
- SPA;
- desktop;
- mobile;
- analytics;
- GTM;
- performance;
- CSS;
- diferenças funcionais;
- diferenças visuais;
- possíveis regressões.

Não considerar uma versão correta apenas porque funciona no primeiro carregamento.

---

## Regras de entrega

Quando houver JavaScript e CSS:

1. Entregar JavaScript completo.
2. Entregar CSS completo.
3. Manter os códigos separados.
4. Não incluir comentários, salvo quando solicitado.
5. Não fornecer apenas trechos.
6. Não omitir funções necessárias.
7. Não alterar comportamento fora do escopo.
8. Informar riscos ou pendências antes do código quando necessário.
