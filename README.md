# CRO AI Toolkit

Toolkit para produtividade, padronização e validação técnica no desenvolvimento de testes A/B com VWO.

O projeto reúne ferramentas voltadas ao fluxo de desenvolvimento CRO, com foco em JavaScript Vanilla, CSS, SPA, GTM, GA4, VWO e automação de validações técnicas.

A primeira release estável do projeto é o **CRO Validator v1.0.0**.

---

## CRO Validator v1.0.0

O CRO Validator analisa a estrutura técnica de experimentos A/B e identifica problemas que podem afetar compatibilidade, performance, manutenção, SPA, VWO e qualidade da implementação.

A validação não se limita a arquivos isolados. O Validator também cruza informações entre:

- `infos-teste.md`
- Trigger do VWO
- Variantes V1, V2, V3...
- JavaScript
- CSS
- Estrutura da pasta do experimento

---

## Problema que o Validator resolve

Durante o desenvolvimento de testes A/B é comum revisar manualmente pontos como:

- Sintaxe JavaScript
- Compatibilidade com o ambiente VWO
- Listeners sem cleanup
- `MutationObserver` com escopo excessivo
- Polling sem encerramento
- Uso desnecessário de timers
- CSS inserido via JavaScript
- Estrutura incorreta das variantes
- Divergências entre documentação e implementação
- Inconsistência entre URL documentada e Trigger
- Variantes declaradas que não existem
- IDs divergentes entre pasta e documentação

O CRO Validator automatiza parte dessa revisão antes da entrega para QA ou publicação do experimento.

---

# Validações

## Estrutura

Analisa a organização da variante e os arquivos encontrados no experimento.

Entre os pontos analisados:

- Estrutura das variantes
- Arquivos JavaScript
- Arquivos CSS
- Arquivos esperados
- Organização do teste

---

## Sintaxe JavaScript

O Validator utiliza AST para analisar o JavaScript antes das demais verificações estruturais.

A análise utiliza:

```text
Acorn
```

Quando a AST é construída corretamente:

```text
AST: OK
```

Problemas de sintaxe podem impedir as análises que dependem da AST.

---

## Compatibilidade com VWO

O Validator identifica padrões que podem ser inadequados para o padrão adotado no desenvolvimento das variantes.

Entre as verificações existentes estão regras relacionadas a:

- jQuery
- optional chaining
- nullish coalescing
- operador ternário
- padrões incompatíveis com as regras adotadas no ambiente VWO

---

## DOM

Analisa padrões relacionados à manipulação do DOM e à implementação das variantes.

O objetivo é identificar construções que possam aumentar o risco de:

- Duplicação
- Reexecução incorreta
- Dependência excessiva do DOM
- Comportamento inconsistente em SPA

---

## Eventos

O Validator analisa listeners utilizando AST.

Entre as verificações:

- `addEventListener`
- `removeEventListener`
- Cleanup de listeners
- Scroll
- Resize
- Click
- Eventos de interação

A análise busca principalmente listeners que possam permanecer ativos desnecessariamente durante a navegação ou reexecução do experimento.

---

## MutationObserver

Existe uma análise específica para `MutationObserver`.

Entre as verificações:

- Observer sem `disconnect`
- Observer aplicado em `document.body`
- Uso de `subtree`
- Escopo amplo de observação

Exemplo:

```text
AVISO | broad-observer
MutationObserver observa document.body.
```

O uso de `document.body` não significa necessariamente que a implementação esteja incorreta, mas indica um ponto que merece revisão de performance e escopo.

---

## SPA / VWO

O Validator considera cenários comuns de aplicações SPA e reexecução de experimentos.

A análise procura riscos relacionados a:

- Renderização tardia
- MutationObserver
- Reexecução
- Navegação SPA
- Listeners persistentes
- Polling
- Cleanup

---

## Performance

Analisa padrões que podem gerar processamento desnecessário.

Exemplos:

- `setTimeout`
- `setInterval`
- Polling contínuo
- MutationObserver amplo
- Listeners persistentes
- Listeners relacionados a scroll e resize

---

## CSS

Quando existe CSS separado na variante, ele também é analisado.

Quando a variante não possui arquivo CSS:

```text
CSS: NÃO ENCONTRADO
```

A ausência de CSS não reprova automaticamente o experimento, pois algumas variantes podem depender exclusivamente de JavaScript.

---

# Trigger Validator

Triggers utilizadas pelo VWO possuem características diferentes do JavaScript executado nas variantes.

Por isso, o projeto possui um Validator específico para Trigger.

Fluxo:

```text
Trigger
  |
  +-- Trigger AST
  |
  +-- Trigger Scanner
  |
  +-- Trigger Rules
```

---

## Trigger AST

O Trigger Validator primeiro tenta interpretar a estrutura JavaScript da Trigger.

Entre os formatos reconhecidos estão estruturas como:

```text
function-expression
parenthesized-function
script
```

Quando a análise é concluída:

```text
Formato: function-expression
AST: OK
```

---

## Trigger Scanner

O scanner percorre a AST e identifica elementos importantes da Trigger.

Entre eles:

- `executeTrigger`
- `vwo_$(document).ready`
- `MutationObserver`
- `setInterval`
- `clearInterval`
- `setTimeout`
- `clearTimeout`
- `fetch`
- `addEventListener`
- `removeEventListener`
- `host`
- `hostname`
- `pathname`
- `href`

Também identifica eventos como:

- scroll
- click
- mouseenter
- mousemove
- mouseout
- touchstart
- beforeunload
- visibilitychange
- keydown
- pointerdown
- change
- focus

E opções de listeners como:

- `once: true`
- `passive: true`

---

## Trigger Rules

Depois do scanner, regras específicas analisam as informações encontradas.

Exemplo de validação de URL:

```text
INFO | url-check-detected
A trigger possui validação de URL, host ou pathname.
```

Exemplo de polling:

```text
WARNING | polling-without-clear
setInterval foi encontrado sem clearInterval correspondente.
```

Exemplo de cleanup:

```text
INFO | scroll-cleanup-detected
Listener de scroll possui remoção correspondente.
```

---

# Infos Validator

O Validator também analisa o arquivo:

```text
infos-teste.md
```

Campos atualmente reconhecidos:

- Tipo de Teste
- Dispositivo
- Hipótese
- URL onde será executado
- Link do Figma
- Nome do teste para o VWO
- Nome das variantes
- Link do teste no VWO
- Massa de teste
- Descrição do que foi realizado no teste
- Desenvolvedor responsável

Exemplo de campo encontrado:

```text
INFO | found-device
Campo "Dispositivo" encontrado.
```

Exemplo de campo vazio:

```text
WARNING | empty-device
Campo "Dispositivo" foi encontrado, mas está vazio.
```

Exemplo de campo ausente:

```text
WARNING | missing-vwo-link
Campo "Link do teste no VWO" não encontrado em infos-teste.md.
```

---

# Cross Validator

O Cross Validator verifica a consistência entre diferentes partes do experimento.

Fluxo:

```text
Pasta do teste
     |
     +-- infos-teste.md
     |
     +-- Trigger
     |
     +-- Variantes
     |
     +-- Cross Validator
```

---

## Validação do ID

Compara o ID encontrado no nome da pasta com o ID identificado no nome documentado para o VWO.

Quando estão consistentes:

```text
INFO | test-id-match
ID do teste consistente entre pasta e infos-teste.md.
```

Quando existe divergência:

```text
WARNING | test-id-mismatch
O ID da pasta não corresponde ao ID informado no nome do teste para o VWO.
```

---

## Validação das variantes

Compara as variantes documentadas com as pastas encontradas no experimento.

Quando estão consistentes:

```text
INFO | variants-match
As variantes declaradas correspondem às pastas encontradas no teste.
```

Quando existe uma variante declarada sem pasta correspondente:

```text
WARNING | declared-variant-missing
A variante está declarada em infos-teste.md, mas a pasta correspondente não foi encontrada.
```

---

## Validação de URL

Cruza a URL documentada no `infos-teste.md` com a existência de validação explícita de URL na Trigger.

Exemplo:

```text
INFO | url-check-cross-detected
infos-teste.md define uma rota e a trigger possui validação de URL.
```

Quando a documentação possui rota, mas a Trigger não apresenta validação explícita:

```text
WARNING | trigger-without-url-check
infos-teste.md define uma rota, mas nenhuma validação explícita de URL foi identificada na trigger.
```

---

## Validação de dispositivo

O Validator identifica informações relacionadas ao dispositivo documentado para o experimento.

Atualmente reconhece:

```text
Desktop
Mobile
Desktop e Mobile
```

Exemplo:

```text
INFO | device-both
O teste está documentado para Desktop e Mobile.
```

---

# Estrutura esperada de um experimento

Exemplo:

```text
2269 - Nome do teste/
|
+-- infos-teste.md
+-- trigger - 2269.js
|
+-- V1/
|   +-- V1 - 2269.js
|   +-- V1 - 2269.css
|
+-- V2/
    +-- V2 - 2269.js
    +-- V2 - 2269.css
```

O Validator também suporta variantes que não possuem CSS.

---

# Resultado da validação

O CRO Validator trabalha com três estados principais.

## APROVADO

Nenhum erro ou aviso foi encontrado.

```text
Erros: 0
Avisos: 0

APROVADO
```

---

## APROVADO COM RESSALVAS

Não existem erros bloqueantes, mas foram encontrados pontos que merecem revisão.

```text
Erros: 0
Avisos: 2

APROVADO COM RESSALVAS
```

---

## REPROVADO

Existe pelo menos um erro considerado bloqueante.

```text
Erros: 1
Avisos: 2

REPROVADO
```

Essa diferenciação permite separar problemas críticos de recomendações técnicas.

---

# Exemplo de resultado

```text
====================================
CRO Validator v1.0.0
====================================

####################################
TESTE
####################################
2269 - Nome do teste

====================================
INFOS
====================================

Erros: 0
Avisos: 0
Informações: 11

Resultado: APROVADO

====================================
TRIGGER
====================================

AST: OK

Erros: 0
Avisos: 0
Informações: 4

Resultado: APROVADO

====================================
CROSS VALIDATOR
====================================

Erros: 0
Avisos: 0
Informações: 4

Resultado: APROVADO

####################################
VARIANTE V1
####################################

AST: OK

====================================
RESULTADO GERAL
====================================

Erros: 0
Avisos: 2
Informações: 19

APROVADO COM RESSALVAS
====================================
```

---

# Instalação

Clone o projeto:

```bash
git clone https://github.com/ntlcs/CRO-AI-Toolkit.git
```

Entre na pasta:

```bash
cd CRO-AI-Toolkit
```

Instale as dependências:

```bash
npm install
```

---

# Como executar

Para validar uma pasta completa de experimento:

```bash
npm run validate -- "CAMINHO_DO_TESTE"
```

Exemplo no Windows:

```powershell
npm run validate -- "C:\Workspace\CRO-Testes\src\Sites\2026\2269 - Nome do teste"
```

---

# Comandos disponíveis

## Validator completo

```bash
npm run validate -- "CAMINHO"
```

## AST

```bash
npm run ast:test -- "ARQUIVO.js"
```

## Project Reader

```bash
npm run project:test -- "PASTA_DO_TESTE"
```

## Trigger AST

```bash
npm run trigger:ast:test -- "trigger.js"
```

## Trigger Scanner

```bash
npm run trigger:scan:test -- "trigger.js"
```

## Trigger Rules

```bash
npm run trigger:rules:test -- "trigger.js"
```

## Trigger Validator

```bash
npm run trigger:validate:test -- "trigger.js"
```

## Infos Validator

```bash
npm run info:validate:test -- "infos-teste.md"
```

## Cross Validator

```bash
npm run cross:validate:test -- "PASTA_DO_TESTE"
```

---

# Arquitetura do Validator

```text
projects/
└── validator/
    ├── fixtures/
    │
    └── src/
        ├── index.js
        ├── validator.js
        ├── reporter.js
        ├── file-reader.js
        ├── directory-reader.js
        ├── project-reader.js
        ├── structure-validator.js
        │
        ├── ast-parser.js
        ├── ast-validator.js
        │
        ├── listener-analyzer.js
        ├── listener-validator.js
        │
        ├── observer-analyzer.js
        ├── observer-validator.js
        │
        ├── trigger-ast.js
        ├── trigger-scanner.js
        ├── trigger-rules.js
        ├── trigger-validator.js
        │
        ├── info-validator.js
        └── cross-validator.js
```

---

# Fixtures

O projeto utiliza fixtures para testar cenários conhecidos e validar o comportamento do próprio Validator.

Entre os cenários existentes:

```text
ast-valid.js
ast-invalid.js
invalid-ast-vwo/
listener-vwo/
observer-vwo/
trigger-invalid.js
infos-incomplete.md
2269-cross-invalid/
```

As fixtures ajudam a verificar situações como:

- JavaScript válido
- JavaScript inválido
- Listeners
- MutationObserver
- Trigger inválida
- Infos incompletas
- Inconsistências entre documentação e implementação

---

# Estrutura do CRO AI Toolkit

O Validator é um dos módulos do projeto.

```text
CRO-AI-Toolkit/
|
+-- checklists/
+-- docs/
+-- examples/
+-- knowledge/
+-- projects/
|   +-- validator/
|
+-- prompts/
+-- scripts/
+-- templates/
+-- package.json
+-- README.md
```

---

# Tecnologias

- JavaScript
- Node.js
- Acorn
- Git
- GitHub
- Markdown

O Validator não utiliza frameworks de front-end.

---

# Princípios

O desenvolvimento do CRO AI Toolkit prioriza:

- JavaScript Vanilla
- Simplicidade
- Legibilidade
- Manutenção
- Performance
- Compatibilidade com VWO
- Prevenção de duplicação
- Suporte a SPA
- Cleanup de eventos
- Controle de observers
- Automação de revisão técnica

---

# Limitações da v1.0.0

O CRO Validator realiza principalmente análise estática.

Ele não substitui:

- QA visual
- Testes reais no navegador
- Validação funcional completa da página
- Validação completa do GTM
- Validação completa do GA4
- Execução real do experimento no VWO
- Testes de acessibilidade em runtime
- Testes de performance em runtime

Algumas regras são deliberadamente classificadas como avisos porque dependem do contexto da implementação.

Por exemplo:

```text
MutationObserver em document.body
```

pode ser necessário em determinados cenários SPA, mas merece revisão de escopo e performance.

---

# Roadmap

## v1.1+

- Redução de falsos positivos
- Testes automatizados de regressão
- Comando único para execução da suíte de testes
- Score técnico por categoria
- Saída JSON
- Relatório Markdown
- Integração com CI
- GitHub Actions

## Próximos módulos

- V1 × V2 Comparator
- QA Generator
- Commit Generator
- Release Generator
- CSS Cleaner
- JavaScript Cleaner
- Biblioteca de exemplos
- Checklists técnicos
- Análise assistida por IA

## Integrações futuras

- GitHub
- Jira
- VWO
- VS Code
- Figma

---

# Status

**Versão atual:** `v1.0.0`

**Status:** primeira release estável do CRO Validator.

---

# Licença

Projeto voltado para estudos, produtividade, automação e evolução do fluxo de desenvolvimento CRO.
