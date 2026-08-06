# Validar configuração e execução do teste no VWO

## Objetivo

Validar tecnicamente a configuração de um teste A/B no VWO, verificando Pages, Variations & Traffic, Targeting, trigger customizada, execução da variação, compatibilidade com SPA, eventos e possíveis riscos de ativação incorreta.

---

## Quando utilizar

Utilize:

- depois de configurar o teste no VWO;
- antes de enviar para QA;
- quando a variação não estiver executando;
- quando a trigger customizada não disparar;
- quando o teste executar fora da URL correta;
- quando houver comportamento diferente entre preview e publicação;
- depois de alterar Pages, Targeting ou trigger;
- quando houver suspeita de duplicação da variação;
- quando o VWO executar antes do componente existir.

---

## Entrada esperada

Forneça, quando disponível:

### Identificação

- número do teste;
- nome do teste;
- tipo de teste;
- ID VWO;
- URL;
- devices;
- quantidade de variantes.

### Pages

- URL configurada;
- tipo de correspondência;
- query string;
- parâmetros;
- exclusões;
- múltiplas URLs;
- print ou descrição da configuração.

### Variations & Traffic

- nome das variações;
- distribuição de tráfego;
- JavaScript completo;
- CSS completo;
- código de campanha;
- comportamento em preview;
- comportamento publicado;
- print ou descrição da configuração.

### Targeting

- device;
- público;
- condição de ativação;
- trigger customizada;
- scroll;
- clique;
- elemento visível;
- carregamento;
- condição de URL;
- comportamento em SPA.

### Analytics e eventos

- goals;
- eventos VWO;
- eventos GTM;
- eventos GA4;
- parâmetros do `dataLayer`;
- atributos `data-*`;
- comportamento esperado.

### Problema observado

- teste não inicia;
- teste inicia cedo demais;
- teste inicia fora da URL;
- variação duplica;
- trigger não executa;
- evento não dispara;
- preview funciona e publicação não;
- desktop funciona e mobile não;
- SPA não reaplica;
- outro comportamento.

---

## Prompt

Atue como um Desenvolvedor Front-end Sênior especialista em CRO, testes A/B, VWO, JavaScript Vanilla, DOM, GTM, GA4, aplicações SPA e validação técnica de experimentos.

Analise criticamente a configuração informada.

Não assuma que a configuração está correta.

Não gere código de variação nesta etapa.

Quando houver trigger customizada, revise o código e entregue a trigger completa corrigida ao final.

Não invente URLs, eventos, condições, seletores ou configurações ausentes.

Siga integralmente as regras definidas em `knowledge/coding-rules.md`.

---

## Formato obrigatório da resposta

Organize a resposta exatamente nas seções abaixo.

## 1. Resumo da configuração

Informe:

- tipo de teste;
- URL;
- devices;
- número de variantes;
- forma de ativação;
- presença de trigger customizada;
- presença de SPA;
- eventos envolvidos;
- problema relatado.

## 2. Validação de Pages

Analise:

- URL configurada;
- tipo de correspondência;
- correspondência exata;
- correspondência por contém;
- regex;
- parâmetros;
- query string;
- hash;
- rota em SPA;
- exclusões;
- risco de URL ampla demais;
- risco de URL restritiva demais;
- risco de ativação em página incorreta;
- risco de não ativação.

Classifique:

- correta;
- correta com ressalvas;
- incorreta;
- insuficiente para validar.

Explique objetivamente.

## 3. Validação de Variations & Traffic

Analise:

- número de variantes;
- nomes;
- distribuição de tráfego;
- JavaScript;
- CSS;
- ordem de execução;
- proteção contra reexecução;
- duplicação;
- dependência de DOM;
- dependência de timing;
- preview;
- publicação;
- impacto entre variantes;
- código compartilhado;
- conflito com página original.

Classifique:

- correta;
- correta com ressalvas;
- incorreta;
- insuficiente para validar.

## 4. Validação de Targeting

Analise:

- device;
- público;
- condição de início;
- carregamento;
- clique;
- scroll;
- elemento visível;
- trigger customizada;
- URL;
- SPA;
- risco de disparo antecipado;
- risco de disparo duplicado;
- risco de não disparo;
- dependência de elemento assíncrono;
- retorno para a rota;
- mudança de rota sem reload.

Classifique:

- correta;
- correta com ressalvas;
- incorreta;
- insuficiente para validar.

## 5. Trigger customizada

Quando houver trigger, analisar:

- compatibilidade com o ambiente do VWO;
- uso de JavaScript Vanilla;
- ausência de jQuery;
- ausência de optional chaining;
- ausência de nullish coalescing;
- ausência de operador ternário;
- ausência de operador de negação com exclamação;
- risco de múltiplos disparos;
- risco de nunca disparar;
- listeners;
- observers;
- scroll;
- clique;
- elemento visível;
- SPA;
- retorno esperado;
- comportamento após reexecução;
- limpeza.

Identifique:

- pontos fortes;
- pontos fracos;
- riscos;
- correções necessárias.

## 6. Analytics e eventos

Analise:

- goals;
- evento VWO;
- evento GTM;
- evento GA4;
- `dataLayer.push`;
- atributos `data-*`;
- parâmetros;
- quantidade de disparos;
- clique correto;
- disparo no carregamento;
- duplicação;
- perda de evento;
- correspondência entre nome configurado e nome disparado.

Classifique:

- correto;
- correto com ressalvas;
- incorreto;
- insuficiente para validar.

## 7. Compatibilidade com SPA

Quando aplicável, analisar:

- ativação no primeiro carregamento;
- ativação após navegação interna;
- retorno para a rota;
- reconstrução do componente;
- reexecução do VWO;
- duplicação da variação;
- listener preso a elemento removido;
- observer antigo;
- estado fora da rota;
- trigger executando novamente.

Quando não houver evidência de SPA, informar que a validação não se aplica.

## 8. Cenários de falha

Tente identificar formas de quebrar a configuração:

- carregar diretamente a URL;
- acessar por navegação interna;
- voltar pelo navegador;
- alterar query string;
- trocar device;
- executar preview;
- executar publicação;
- recarregar;
- executar VWO mais de uma vez;
- componente aparecer tarde;
- componente ser recriado;
- clicar múltiplas vezes;
- scroll rápido;
- trocar desktop por mobile;
- retornar para rota anterior;
- evento disparar antes da variação.

## 9. Correções recomendadas

Liste objetivamente:

- ajuste em Pages;
- ajuste em Variations & Traffic;
- ajuste em Targeting;
- ajuste em trigger;
- ajuste em analytics;
- ajuste em SPA;
- ajuste em duplicação;
- ajuste em timing.

Não sugerir alterações fora do escopo.

## 10. Trigger completa corrigida

Quando houver trigger customizada com problemas, entregue todo o código final corrigido em um único bloco:

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
- sem duplicação;
- com limpeza quando necessária;
- com retorno correto para a trigger.

Quando não houver trigger ou nenhuma correção for necessária, informe:

```text
Não há trigger customizada para corrigir.
```

## 11. Checklist de validação no VWO

Gerar itens específicos para:

- URL correta;
- variante correta;
- tráfego;
- preview;
- publicação;
- targeting;
- trigger;
- desktop;
- mobile;
- SPA;
- reload;
- retorno para rota;
- duplicação;
- evento VWO;
- GTM;
- dataLayer;
- console;
- Network;
- timing;
- carregamento tardio.

## 12. Resultado final

Finalize com esta tabela:

| Área | Classificação | Correção necessária |
|---|---|---|
| Pages | | |
| Variations & Traffic | | |
| Targeting | | |
| Trigger | | |
| Analytics/GTM | | |
| SPA | | |
| Execução geral | | |

## 13. Status geral

Escolha somente uma opção:

- aprovado;
- aprovado com ressalvas;
- reprovado;
- insuficiente para validar.

Justifique em até cinco linhas.

---

## Regras obrigatórias

- Não gerar o JavaScript da variação.
- Não gerar CSS.
- Gerar trigger completa corrigida quando houver problema.
- Não inventar eventos.
- Não inventar seletores.
- Não inventar URLs.
- Não assumir SPA sem evidência.
- Não recomendar trigger customizada quando Pages e carregamento forem suficientes.
- Não usar MutationObserver para compensar targeting incorreto.
- Diferenciar problema de código e problema de configuração.
- Diferenciar evento GTM, evento GA4 e evento VWO.
- Sempre considerar preview e publicação.
- Sempre considerar reexecução do VWO.

---

## Material para validação

### Identificação

Número:

Nome:

Tipo:

ID VWO:

URL:

Devices:

Variantes:

### Pages

[COLE AQUI]

### Variations & Traffic

[COLE AQUI]

### JavaScript da variação

```javascript
[COLE AQUI]
```

### CSS da variação

```css
[COLE AQUI]
```

### Targeting

[COLE AQUI]

### Trigger customizada

```javascript
[COLE AQUI]
```

### Analytics, GTM e VWO

[COLE AQUI]

### Comportamento em SPA

[COLE AQUI]

### Problema observado

[COLE AQUI]

### Evidências

[COLE AQUI]
