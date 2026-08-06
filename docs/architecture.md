# Arquitetura

## Objetivo

O CRO AI Toolkit é um conjunto de ferramentas independentes que auxiliam o desenvolvimento de testes A/B.

Cada ferramenta resolve um problema específico do fluxo de trabalho.

As ferramentas devem ser desacopladas para permitir evolução independente.

---

# Estrutura

Prompt Library
↓
Knowledge Base
↓
Templates
↓
Validators
↓
Generators
↓
Integrations

---

# Componentes

## Prompt Library

Biblioteca de prompts reutilizáveis.

---

## Knowledge Base

Base de conhecimento com padrões, snippets e soluções reutilizáveis.

---

## Templates

Modelos de código.

---

## Validators

Ferramentas responsáveis por validar código.

---

## Generators

Ferramentas responsáveis por gerar documentação, QA, commits e relatórios.

---

## Integrations

Integrações com VS Code, GitHub, ChatGPT, MCP e outras ferramentas.

---

# Filosofia

Cada ferramenta deve:

- resolver apenas um problema;
- possuir documentação própria;
- ser reutilizável;
- evoluir de forma independente;
- possuir versão própria.
