# Para você — 5 anos 💜

Site comemorativo, vertical, com navegação por seções (scroll travado por seção).

## Como rodar local
Na pasta do projeto:

    python3 -m http.server 8000

Depois acesse http://localhost:8000
(ou abra o `index.html` direto no navegador)

## O que editar — tudo no `CONFIG` (topo do `script.js`)
- `startDate` — data de início do namoro
- `name` — assinatura da carta
- `welcome` — texto de boas-vindas (seção 1)
- `counterPhrase` — frase de efeito abaixo do contador (seção 2)
- `declare` / `surprise` — declaração e chamada da surpresa (seção 5)
- `galleryCaption` — legenda da galeria (seção 4)
- `restaurant.url` — link do restaurante (cole depois)
- `heroPhoto` / `photos` — caminhos das fotos

## Trocar a resposta certa do quiz
No `CONFIG.quizOptions`, mova `correct: true` para a opção desejada
(só pode haver UMA correta). A resposta certa atual é **Árabe** (provisória).
Ajuste também o `quizWinText` se trocar.

## Fotos
Coloque na pasta `images/`:
- `hero.jpg` — foto da seção 2 (vertical, 4:5 fica ideal)
- `foto1.jpg` ... `foto6.jpg` — galeria da seção 4
Enquanto não houver foto, aparece um placeholder elegante.

## Navegação
- Scroll do mouse, setas do teclado (↑ ↓ ← →), barra de espaço
- Seta inferior e os pontinhos laterais também navegam
- O scroll trava em cada seção (snap), não desce tudo de uma vez

## Deploy no Vercel
1. Suba a pasta para um repositório no GitHub
2. vercel.com → Add New → Project → importe o repo
3. Framework Preset: "Other" (site estático) → Deploy
