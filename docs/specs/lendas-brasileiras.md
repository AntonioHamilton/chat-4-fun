# Lendas Brasileiras: spec da iteração 1

Status: rascunho, aguardando aprovação. Nenhum código foi escrito.

## 1. Objetivo

Jogo de cartas online no estilo Magic: The Gathering, com decks da cultura brasileira, para jogar contra o computador ou contra outro jogador.

Nesta iteração o objetivo é validar a casca e a mesa: posicionamento, arrastar e soltar cartas no campo, comprar cartas dos baralhos, vida e mana visíveis, e layout responsivo. As cartas não têm efeito e não há artes geradas.

## 2. Escopo

Dentro da iteração 1:
- Casca: página `/lendas-brasileiras` com lobby (escolher modo e deck).
- Modo contra o computador (IA simples, sem combate).
- Modo multiplayer: ver decisão D2.
- Mesa com zonas para cada tipo de carta, vida e mana dos jogadores.
- Arrastar e soltar cartas entre zonas, com alternativa por toque e teclado.
- Comprar cartas do baralho e jogar terrenos.
- Dois decks iniciais: Saci e Capivara.
- Layout responsivo: mobile, tablet e PC.
- Simulador de balanceamento (ver seção 9), com limites explicados na seção 9.

Fora da iteração 1:
- Efeitos de carta, pilha (stack) e habilidades.
- Combate (atacar e bloquear).
- Artes geradas por IA e conceito arts.
- Imposto de comando e troca de comandante.
- Mulligan, cartas de decks de 100 cartas completos (ver D3).
- Nova logo aplicada no site (o prompt sai nesta iteração, a aplicação depois).

## 3. Regras base

Inspiradas no Magic, com nomes e cartas próprios. Não copiamos cartas do Magic no jogo publicado.

| Tipo (pt-BR) | Conceito (como no Magic) | Zona ao jogar |
|---|---|---|
| Criatura | Tem poder e resistência, pode atacar e bloquear | Campo de batalha |
| Encantamento | Permanente que fica em jogo, jogado em tempo de feitiço | Campo (suporte) |
| Artefato | Permanente incolor ou colorido, objeto mágico | Campo (suporte) |
| Terreno | Permanente que gera mana; um terreno por turno | Zona de terrenos |
| Instantâneo | Não permanente, pode ser jogado a qualquer momento | Vai ao cemitério após uso |
| Feitiço | Não permanente, só no seu turno com a pilha vazia | Vai ao cemitério após uso |
| Comandante | Criatura lendária única por deck, começa na zona de comando | Zona de comando, depois campo |

Regras gerais:
- Vida inicial: 40 por jogador (D3 pode mudar isso).
- Mana: 5 cores (ver seção 4) e incolor. Cada terreno gera 1 mana da sua cor.
- Turno simplificado: Compra, Principal 1, Combate (desativado na iteração 1), Principal 2, Fim.
- Um terreno por turno.
- Biblioteca vazia ao comprar: derrota (regra mínima para testar a partida).

## 4. Cores e elementos

Mapeamento proposto (ajustável):

| Cor | Elemento | Papel no deck de exemplo |
|---|---|---|
| Verde | Mata | Saci (proposta) |
| Azul | Rio | Capivara (proposta) |
| Preto | Noite e sombra | Saci (proposta) |
| Vermelho | Fogo e Boitatá | Reserva |
| Branco | Sol e Lua | Capivara (proposta) |

## 5. Decks iniciais

- Saci: mata e noite. Tema de travessuras e armadilhas (sem efeito na iteração 1).
- Capivara: rio e sol. Tema de calma, cooperação e resistência.

Cada deck tem um comandante. Lista de cartas da iteração 1 (D3 define o tamanho).

## 6. Formato da carta

Campos de dados (um objeto por carta, em `Constants/cards.ts`):
- `id`: slug único, ex: `saci-trancador-de-trilhas`.
- `name`: nome em pt-BR.
- `type`: um dos tipos da seção 3.
- `cost`: custo de mana por cor, ex: `{ green: 2, black: 1 }`.
- `power` / `toughness`: só para criatura e comandante.
- `flavor`: texto de ambientação, opcional. Sem regras de texto.
- `art`: caminho da arte ou `null` (placeholder com a cor do tipo).

Layout visual da carta: moldura com nome, custo no canto, tipo na faixa central, área de arte, caixa de texto (vazia na iteração 1) e, para criatura, poder/resistência no canto inferior.

## 7. Estilo de arte

Análise das três imagens de referência:

1. Homem de chapéu largo e lenço vermelho: pintura digital semi-realista, sombras em blocos, luz quente e alta saturação em ocre e vermelho. Personagem com figurino de tecido e cinto de couro.
2. Figura cega com cajado e faixas: ilustração chapada com sombras escuras em formas simples. Fundo verde-petróleo, roupas gastas e rasgadas, faixas de tecido.
3. Figura com máscara de crânio de veado: pintura com pincelada visível, textura granulada no fundo, paleta de azul-acinzentado contra ocre e dourado. Figurino que mistura elementos asiáticos e rurais.

Padrões comuns que vamos manter:
- Personagem de corpo inteiro, centralizado, em formato vertical (2:3).
- Roupas gastas, rasgadas, com tecido e couro. Nada de armadura brilhante.
- Paleta terrosa (ocre, marrom, cru) com um contraste frio (azul-petróleo ou verde) no fundo.
- Um acento quente forte (vermelho, dourado) para chamar o olho.
- Sombras em formas simples, sem gradiente de plástico.
- Textura de pincel ou grão no fundo.
- Elementos de folclore brasileiro como traço da roupa ou do adereço, não como cenário.

Bloco base para todas as artes (prompt em inglês, que funciona melhor na maioria dos geradores):

```
Semi-realistic digital painting with visible brush texture and flat cel-like shadow shapes. Full-body character centered, vertical 2:3 composition. Worn, torn textile clothing and leather straps, subtle Brazilian folk motifs (STYLE_ELEMENT). Earthy palette of ochre, burnt sienna, deep brown and cream, against a muted petrol-blue or deep green textured background with grain. One warm accent in red or gold. Simple dramatic lighting. No text, no border, no watermark, no logos.
```

Prompt de carta, com o bloco base e o personagem:

```
[BLOCO BASE], {NOME DO PERSONAGEM}: {papel e objeto na mão}. Tipo: {criatura|encantamento|...}. Mood: {mood}.
```

Negativo (quando o gerador aceitar): `anime glossy eyes, neon, cyberpunk, photorealistic, 3D plastic render, text, logo, watermark, frame, Magic the Gathering style`.

## 8. Prompt da logo (capivara)

Referência: a logo atual do site (`public/images/logo.webp`) tem uma capivara chibi em estilo adesivo, com contorno branco, fones dourados e controle na mão, e o texto "CHAT 4 FUN" em dourado 3D com contorno escuro, à direita da mascote.

Prompt proposto (inglês):

```
Chibi cartoon capybara mascot, sitting, round cute face with rosy cheeks, holding a small fan of three playing cards instead of a controller, wearing a golden straw hat with a red band. Flat vector sticker style with soft shading, thick white die-cut outline around the whole mascot. To the right, bold rounded 3D text "LENDAS BRASILEIRAS" in gold metallic letters with dark brown outline, stacked in two lines, same layout as the "CHAT 4 FUN" logo. Plain white background, centered composition, no extra decoration, no watermark.
```

Versão em português do resultado: capivara chibi com chapéu de palha dourado e faixa vermelha, segurando três cartas em leque, estilo adesivo com contorno branco, texto "LENDAS BRASILEIRAS" em dourado 3D à direita, em duas linhas.

## 9. Testes de balanceamento

Como o Magic faz (o que encontrei):
- Commander Brackets (mtg.wiki e ICv2): o balanceamento oficial recente é por lista de cartas e restrições (cartas "Game Changers", combos, turnos extras), não por taxa de vitória. Serve de referência de "faixa de poder", não de medida.
- Análise de taxa de vitória (17Lands, usado por Frank Karsten e pela comunidade): mede taxa de vitória por carta e por deck, mas mistura efeito da carta com efeito do arquétipo. Por isso compara "com a carta" e "sem a carta" quando possível.
- Matemática de mana (Karsten): probabilidade hipergeométrica de ter X terrenos até o turno T. Usada para contar terrenos no deck.

Métricas do simulador (valores de alerta são propostas, não regra do Magic):

| Métrica | Como medir | Alerta se |
|---|---|---|
| Taxa de vitória do deck | vitórias / partidas, média contra todos os outros decks | fora de 45% a 55% |
| Matriz de confronto | taxa de vitória de A contra B | fora de 40% a 60% |
| Vantagem de quem joga primeiro | vitória de quem começa vs de quem compra depois | diferença acima de 5 pontos |
| Duração | mediana de turnos por partida | fora de 6 a 14 turnos (a calibrar) |
| Falta de terreno | % de partidas sem terreno jogado até o turno 4 | acima de 15% |
| Excesso de terreno | % de partidas com 3 ou mais terrenos na mão no turno 7 | acima de 25% |

Limite da iteração 1: sem combate e sem efeitos, o simulador mede só mana, curva de custo e velocidade. Ele não mede poder de verdade. Os alertas de vitória só valem depois da iteração com combate. Isso fica explícito no relatório do simulador.

Decks do Magic para o teste: 4 decks de Commander, listas públicas (ex: EDHREC ou Scryfall). Usados só no simulador local, nunca no jogo publicado, e só para medir curva de custo e mana. Nenhuma carta do Magic entra nos decks do jogo.

Como rodar: script `npm run balance` com N partidas por par (valor inicial: 1.000). Os testes do motor usam `node:test`, sem dependência nova.

## 10. Arquitetura

Forma de pastas, seguindo o AGENTS.md (cada jogo repete a mesma forma):

```
src/LendasBrasileiras/
  Components/    mesa, zona, carta, contador de vida e mana, lobby
  Hooks/         useMatch, useDragCard, useResponsiveLayout
  Utils/
    engine/      regras puras (zonas, compra, mana, turno), sem React
    balance/     simulador e métricas
  Types/         Card, Zone, Match, Player
  Constants/     cards.ts, decks.ts, colors.ts
src/pages/lendas-brasileiras/index.tsx   (default export)
```

Decisões técnicas:
- Motor de regras puro (sem React): o mesmo código roda no navegador, no simulador e, depois, no servidor do multiplayer.
- Arrastar e soltar com eventos de ponteiro (pointer events), não com drag and drop nativo do HTML, porque o nativo não funciona no toque do celular.
- Alternativa acessível: tocar na carta abre um menu com os destinos. Atende o item de teclado do AGENTS.md.
- Breakpoints de `src/styles/breakpoints.ts`. Cores de `src/styles/theme.ts`. Estilos em `styled.ts`.
- Estado da mesa: nada em localStorage além do deck escolhido, com try/catch.
- Multiplayer (se D2 for "agora"): novas mensagens no `chat-4-fun-backend` (WebSocket), testadas em dev com `PORT=3001`. Mudança no backend de produção (Render) só com ok.
- Sem bibliotecas novas. Tudo com o que já está no `package.json`.

## 11. Interface

Lobby:
- Escolher modo: contra o computador ou multiplayer.
- Escolher deck (Saci ou Capivara).
- Botão para jogar.

Mesa (por tamanho de tela):
- Mobile (abaixo de 768px): oponente no topo, campo no meio, mão em carrossel horizontal na parte de baixo. Carta ampliada com toque longo.
- Tablet (768px a 991px): mesa em duas colunas, zonas laterais compactas.
- PC (992px ou mais): mesa completa, com painel lateral de histórico de jogadas.

Zonas de cada jogador:
- Mão, Biblioteca (com contador), Cemitério, Exílio, Zona de comando (comandante).
- Zona de terrenos, Campo de criaturas, Suporte (encantamentos e artefatos).
- Área de uso (instantâneos e feitiços antes de ir ao cemitério).

Vida e mana:
- Contador de vida com botões de + e -, para ajustar sem efeitos.
- Mana: terrenos mostram a cor. Tocar em um terreno gira (usado) e soma no pool.

## 12. Fases de implementação

Cada fase é um estágio com critério de aceite e um passo para você conferir.

| Fase | O que entrega | Critério de aceite | Como você confere |
|---|---|---|---|
| F1 | Tipos, cartas e decks (sem efeito) | `npm run lint` e `npx tsc --noEmit` passam; Saci e Capivara carregam | abrir o arquivo `Constants/cards.ts` e ver as cartas |
| F2 | Motor: zonas, compra, terreno, mana, turno | testes `node:test` passam: comprar, jogar terreno, gastar mana | `npm run test:lendas` (ou o comando definido) |
| F3 | Mesa responsiva e arrastar/soltar | arrastar carta da mão para o campo em mobile, tablet e PC; alternativa por toque funciona | abrir `/lendas-brasileiras` e testar nos três tamanhos |
| F4 | Modo contra o computador | IA joga terreno e lança criatura sem travar; partida termina quando biblioteca zera | jogar uma partida inteira |
| F5 | Multiplayer (se D2 for agora) | duas abas em salas iguais veem o mesmo estado | abrir duas janelas e jogar |
| F6 | Simulador de balanceamento | `npm run balance` gera tabela com as métricas da seção 9 | olhar o relatório gerado |
| F7 | Prompts de arte e logo no repositório | arquivo `docs/specs/lendas-brasileiras-arte.md` com os prompts | ler e copiar os prompts |

Checks antes de dar cada fase como concluída: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## 13. Riscos

- Sem combate, o balanceamento é só parcial (seção 9).
- Arrastar no toque pode conflitar com rolagem da página. Solução prevista: `touch-action: none` só na área da mão e do campo.
- Gerar 100 cartas por deck é trabalho grande de conteúdo. Por isso D3 começa menor.
- Nome "Comandante": é o nome da mecânica no Magic. A palavra em português e o conceito estão no escopo; se quiser marca própria, o nome pode mudar.
- Uso de listas de decks do Magic para teste: só local, sem publicar.

## 14. Decisões

Aprovadas pelo usuário:
- D1 (plano): aprovado. Implementar em fases, na ordem da seção 12.
- D2 (multiplayer): depois da F4. A F5 entra depois que o modo computador estiver pronto.
- D3 (tamanho dos decks): 100 cartas por deck (formato Commander completo) na F1.
- D4 (testes de regressão): completo, com agente `tester`, depois da F4.

Ainda em aberto:
- D5 (rodadas): interpretei "rodadas" como turnos e partidas de uma série. Confirme se é isso.
- D6 (cores): a tabela da seção 4 pode mudar.

## 15. Fontes da pesquisa

- Commander Brackets (mtg.wiki): https://mtg.wiki/page/Commander_Brackets
- ICv2, sobre a atualização dos brackets: https://icv2.com/articles/news/view/58827/wizards-coast-updates-magic-the-gathering-commander-brackets
- Draftsim, tipos de carta (atualizado em 25/05/2026): https://draftsim.com/mtg-card-types/
- Star City Games, 17Lands como recurso: https://articles.starcitygames.com/magic-the-gathering/select/using-17lands-com-as-a-resource-to-improve-at-limited/
- Frank Karsten (Wikipedia): https://en.wikipedia.org/wiki/Frank_Karsten_(Magic:_The_Gathering_player)

Limite da pesquisa: não encontrei documentação oficial da Wizards sobre como medem poder de carta por taxa de vitória. As fontes acima descrevem o método de forma indireta. Confira antes de citar.
