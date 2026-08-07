# Regras de commit

## feat

Utilizado quando um novo teste ou uma nova funcionalidade é adicionada.

Exemplo:

```text
feat: 2270 - Planos Celular - Finalizado

fix

Utilizado quando o QA aponta um erro e o código é corrigido.

Exemplo:

fix: 2270 - Planos Celular - Corrige largura do campo CEP
docs

Utilizado quando somente arquivos de documentação são alterados.

Exemplo:

docs: 2270 - Planos Celular - Atualiza informações do teste
style

Utilizado para alterações de formatação, Prettier, lint ou espaçamento sem mudança funcional.

Exemplo:

style: ajusta configuração do prettier
Regras gerais
O commit deve indicar o tipo da alteração.
Para testes, incluir o número do teste.
Incluir a área ou produto quando aplicável.
A descrição deve indicar claramente o que foi realizado.
Não usar fix para desenvolvimento inicial.
Não usar style quando houver mudança de comportamento.

Commit:

```text
docs: adiciona regras de commit
