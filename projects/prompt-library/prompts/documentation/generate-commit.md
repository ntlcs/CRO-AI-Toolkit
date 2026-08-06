# Gerar mensagem de commit para testes CRO

## Objetivo

Gerar uma mensagem de commit compatível com o padrão utilizado no repositório de testes CRO.

A mensagem deve refletir corretamente o tipo da alteração realizada e incluir, quando aplicável:

- número do teste;
- área ou produto;
- descrição objetiva da alteração.

---

## Quando utilizar

Utilize depois de:

- finalizar um novo teste;
- corrigir um erro apontado pelo QA;
- alterar documentação;
- ajustar arquivos de lint ou formatação;
- atualizar arquivos JavaScript, CSS ou Markdown do teste;
- preparar o commit antes do `git commit`.

---

## Tipos permitidos

### feat

Utilizar quando:

- um novo teste for criado;
- uma nova funcionalidade for adicionada;
- uma nova variação for implementada;
- o desenvolvimento inicial for finalizado.

Exemplo:

```text
feat: 2270 - Planos Celular - Finalizado
```

### fix

Utilizar quando:

- o QA apontar um erro;
- houver correção de comportamento;
- houver correção de layout;
- houver correção de evento;
- houver correção de responsividade;
- houver correção após desenvolvimento inicial.

Exemplo:

```text
fix: 2270 - Planos Celular - Corrige largura do campo CEP
```

### docs

Utilizar quando:

- somente arquivos `.md` forem alterados;
- documentação for criada;
- documentação for atualizada;
- regras ou instruções forem modificadas.

Exemplo:

```text
docs: 2270 - Planos Celular - Atualiza informações do teste
```

### style

Utilizar quando:

- somente formatação for alterada;
- houver ajuste em Prettier;
- houver ajuste em lint;
- houver ajuste de espaçamento ou ponto e vírgula;
- não houver alteração funcional.

Exemplo:

```text
style: ajusta configuração do prettier
```

---

## Entrada esperada

Forneça:

- número do teste;
- nome do teste;
- área ou produto;
- arquivos alterados;
- motivo da alteração;
- fase do desenvolvimento;
- se houve apontamento do QA;
- se houve mudança funcional;
- se houve alteração apenas de documentação;
- se houve alteração apenas de formatação;
- descrição objetiva do que foi feito.

---

## Prompt

Atue como um Desenvolvedor Front-end Sênior responsável por versionamento Git em um repositório de testes A/B.

Analise as informações fornecidas e gere uma mensagem de commit curta, objetiva e compatível com as regras abaixo.

Escolha corretamente entre:

- `feat`
- `fix`
- `docs`
- `style`

Não utilize outros tipos.

Não classifique como `fix` uma implementação inicial que ainda não passou por QA.

Não classifique como `style` uma alteração que mudou comportamento.

Não classifique como `docs` quando JavaScript ou CSS também foram alterados.

Não invente número de teste, área, produto ou descrição.

Quando houver informações insuficientes, liste a pendência antes de gerar a mensagem.

---

## Regras de decisão

### Usar feat

Quando:

- o teste está sendo criado pela primeira vez;
- a V1 ou V2 foi implementada;
- uma funcionalidade nova foi adicionada;
- o desenvolvimento inicial foi concluído;
- não se trata de correção apontada pelo QA.

### Usar fix

Quando:

- houve erro apontado pelo QA;
- houve regressão;
- houve bug funcional;
- houve bug visual;
- houve bug em desktop;
- houve bug em mobile;
- houve bug em SPA;
- houve bug em evento, GTM ou analytics;
- houve correção após o desenvolvimento inicial.

### Usar docs

Quando:

- somente arquivos Markdown foram alterados;
- houve alteração em README;
- houve alteração em `infos-teste.md`;
- houve atualização de regras;
- houve atualização de documentação técnica.

### Usar style

Quando:

- somente formatação foi alterada;
- somente lint foi alterado;
- somente Prettier foi alterado;
- não houve mudança funcional.

---

## Formato obrigatório da resposta

### 1. Tipo escolhido

Informe apenas:

```text
feat
```

ou:

```text
fix
```

ou:

```text
docs
```

ou:

```text
style
```

### 2. Justificativa

Explique em até três linhas por que o tipo foi escolhido.

### 3. Commit recomendado

Entregue somente uma mensagem final neste formato:

```text
tipo: número do teste - área ou produto - descrição
```

Exemplo:

```text
feat: 2270 - Planos Celular - Finalizado
```

### 4. Alternativa mais específica

Quando houver informação suficiente, gere uma segunda opção mais descritiva.

Exemplo:

```text
feat: 2270 - Planos Celular - Remove opção de ajuda do CEP e amplia campo
```

### 5. Comando Git

Gere o comando completo:

```bash
git commit -m "mensagem do commit"
```

---

## Regras obrigatórias

- Utilizar somente `feat`, `fix`, `docs` ou `style`.
- Não gerar mensagem genérica como `ajustes`.
- Não utilizar texto excessivamente longo.
- Não inventar dados.
- Incluir o número do teste quando existir.
- Incluir a área ou produto quando existir.
- Diferenciar desenvolvimento inicial de correção de QA.
- Diferenciar alteração funcional de alteração de formatação.
- Diferenciar código de documentação.
- Gerar uma única mensagem principal.
- Gerar no máximo uma alternativa.
- Não utilizar ponto final no commit.

---

## Material para geração

### Número do teste

[COLE AQUI]

### Nome do teste

[COLE AQUI]

### Área ou produto

[COLE AQUI]

### Arquivos alterados

[COLE AQUI]

### O que foi feito

[COLE AQUI]

### Fase do desenvolvimento

[COLE AQUI]

### O QA apontou erro?

[SIM OU NÃO]

### Houve mudança funcional?

[SIM OU NÃO]

### Houve alteração apenas de documentação?

[SIM OU NÃO]

### Houve alteração apenas de formatação?

[SIM OU NÃO]

### Observações

[COLE AQUI]
