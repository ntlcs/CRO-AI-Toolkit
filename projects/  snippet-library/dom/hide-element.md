# Hide Element

## Objetivo

Ocultar um elemento preservando o restante do comportamento da página.

---

## Quando utilizar

- Testes A/B
- Fake door
- Remoção visual
- Simplificação da interface

---

## Não utilizar

- Quando o elemento precisar continuar acessível.
- Quando ocultar quebrar o layout.
- Quando o elemento possuir comportamento obrigatório.

---

## Riscos

- Espaço residual.
- Quebra do flex.
- Quebra do grid.
- Perda de analytics caso o elemento seja removido.

---

## Estratégias

### CSS

Utilizar quando somente o visual precisa mudar.

### JavaScript

Utilizar quando for necessário alterar comportamento.

---

## Checklist

- Desktop
- Mobile
- Resize
- SPA
- Analytics
- GTM

---

## Testes utilizados

- 2270
