# Estrutura do repositório de testes CRO

## Organização principal

Os testes são armazenados dentro da pasta `src`, separados por área da empresa.

Estrutura geral:

```text
src/
├── Planos Celular/
├── Planos Claro/
├── PME/
└── Sites/

Dentro de cada área, os testes são separados por ano:

src/
└── Planos Celular/
    └── 2026/

Cada teste possui uma pasta composta pelo número do teste e seu nome:

2270 - Retirar opção - Não sei o CEP

Cada variação fica em uma subpasta própria:

V1/
V2/

Estrutura completa:

src/
└── Planos Celular/
    └── 2026/
        └── 2270 - Nome do teste/
            └── V1/
                ├── V1 - 2270.js
                ├── V1 - 2270.css
                └── infos-teste.md

Regras
JavaScript e CSS devem permanecer separados.
Cada teste deve ser salvo na pasta correta da área.
O ano deve corresponder ao ano de desenvolvimento.
O número do teste deve ser preservado no nome da pasta e dos arquivos.
Cada variante deve possuir sua própria pasta.
O arquivo infos-teste.md deve conter as informações técnicas do teste.
Não misturar arquivos de testes diferentes.
