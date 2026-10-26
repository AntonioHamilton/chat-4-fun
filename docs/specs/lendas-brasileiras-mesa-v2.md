# Lendas Brasileiras: mesa v2 (melhorias de layout e interação)

Status: rascunho, aguardando aprovação. Nenhum código foi escrito.
Base: spec da iteração 1 (`docs/specs/lendas-brasileiras.md`) e o MVP em `master` (commit de merge da `feat/lendas-brasileiras`).

## 1. Objetivo

Trocar a mesa atual (duas áreas empilhadas, sem ponto de vista) por uma mesa vista de quem joga: campo do adversário em cima, campo do jogador embaixo, mão em leque na parte inferior, como em jogos de cartas de celular (ex: Hearthstone).

## 2. Mudanças pedidas e proposta

| # | Pedido | Proposta | Critério de aceite | Como você confere |
|---|---|---|---|---|
| 1 | Mesa do jogador como se estivesse jogando contra alguém; já ver o campo desde o começo | Mesa sempre no formato "eu embaixo, adversário em cima" desde a primeira tela de partida | Ao iniciar partida, o campo do adversário aparece no topo e o do jogador embaixo, sem rolar | Abrir partida e conferir sem rolar |
| 2 | Quando o computador (ou o outro jogador) joga | **A confirmar (ver D1).** Proposta: faixa de aviso com a última ação ("Computador jogou X"), carta aparece no campo com animação de entrada | Toda ação do outro lado aparece na faixa e fica visível por 1,5 s | Assistir uma partida contra o computador |
| 3 | Mão na parte inferior, em leque, como se estivesse segurando | Leque de cartas com rotação e sobreposição na faixa inferior | Mão em leque centralizado embaixo; carta com toque ou clique sobe e fica legível | Ver a mão em celular e PC |
| 4 | Deck de compra na parte inferior (ver imagem de referência, "deck de cabeça pra baixo") | Pilha de verso (cartas viradas para baixo) à direita embaixo, com contador. Toque/clique compra | Deck fica fixo embaixo à direita; contador atualiza ao comprar | Comprar algumas cartas e ver o contador |
| 5 | Vida embaixo junto com a foto do comandante (estilo Hearthstone) | Retrato do comandante embaixo à esquerda, com contador de vida grande sobreposto | Vida e comandante ficam juntos na faixa inferior; vida do adversário em cima | Mudar vida com + e - e ver o número |
| 6 | Passar turno como botão fixo | Botão "Passar turno" fixo no canto inferior direito, sempre visível | Botão nunca sai da tela, em nenhum tamanho | Rolar/girar o celular e conferir |
| 7 | Celular na horizontal | Layout só em paisagem. Em retrato, uma tela "Gire o celular" bloqueia a mesa | Em retrato no celular aparece o aviso; em paisagem a mesa aparece inteira | Girar o celular |
| 8 | Cemitério e exílio à esquerda, fixos embaixo | Duas pilhas à esquerda, na faixa inferior, cada uma com contador e clique para ver o conteúdo | Pilhas fixas embaixo à esquerda; clique abre lista | Enviar cartas e abrir a lista |
| 9 | Área de terrenos muito grande, reduzir para caber uma carta | Terrenos viram uma pilha com contador e marcador de terreno virado (contagem livre/total) | Área de terrenos com largura de uma carta | Jogar vários terrenos e conferir o tamanho |
| 10 | Rascunho da ideia (imagem de referência) | Layout de referência: campo adversário, campo de batalha, terrenos e suporte embaixo, cemitério/exílio à esquerda, passar turno e deck à direita | Layout confere com o rascunho | Comparar a tela com o rascunho |
| 10.1 | Rascunho de onde as manas ficam (símbolos a fazer depois) | Barra de mana na faixa inferior, perto da vida. Símbolos definitivos ficam para depois; nesta etapa, texto com número | Mana visível na faixa inferior | Virar terrenos e ver o contador |
| 11 | Carta ampliada ao clicar | Clique em carta da mão, campo ou pilha amplia a carta no centro | Clique abre carta grande; fecha com clique fora ou Esc | Clicar em carta da mão |
| 12 | Carta ampliada com "Jogar em campo" embaixo | Botão "Colocar em campo" na parte inferior da carta ampliada (quando for jogável) | Botão aparece só em carta jogável e chama a ação do motor | Ampliar carta da mão e jogar |
| 13 | Mover para cemitério e exílio só como efeito de outras cartas; efeitos devem dar ênfase ao que fazer | **A confirmar (ver D2).** Proposta: remover "Mover para cemitério/exílio" do menu do jogador. Essas ações ficam só para efeitos (pós-MVP) | Menu da carta não lista cemitério nem exílio | Abrir o menu de uma carta |

## 3. Ideias para depois do MVP (só anotadas)

1. Terreno muda o fundo do campo. O tipo de terreno com mais cartas define o fundo; em empate, vale o do último jogador.
2. Instantâneos e encantamentos, quando ativados, aparecem com animação de uso.
3. Animação quando um comandante entra em campo.
4. No início da partida, os comandantes aparecem com animação e uma frase provocando o inimigo.

Referências visuais citadas: mesa de cartas com cenário de fundo (Magic), mão em leque (Hearthstone) e número de vida sobre o retrato do herói.

## 4. Fases propostas

Cada fase é um estágio com critério de aceite e passo para você conferir.

| Fase | O que entrega | Critério de aceite | Como você confere |
|---|---|---|---|
| V1 | Layout de mesa fixo: campo adversário, campo do jogador, faixa inferior (mão em leque, deck, vida com comandante, mana, cemitério/exílio à esquerda, passar turno fixo), paisagem obrigatória no celular | Itens 1, 3 a 10.1 e 7 atendidos | Abrir a partida em celular (paisagem), PC e tablet |
| V2 | Interação: carta ampliada ao clicar com "Colocar em campo" embaixo; menu da carta sem cemitério e exílio (se D2 aprovado) | Itens 11, 12 e 13 atendidos | Ampliar cartas e usar o menu |
| V3 | Faixa de ação do adversário e animação de entrada de carta | Item 2 atendido (se D1 aprovado) | Assistir uma partida |
| V4 | Atualizar testes: regressão de layout e de menu; personas do `tester` com paisagem e retrato | Suíte passa; personas em paisagem e retrato | `npm run test:lendas` e repetir as personas |

Checks antes de cada fase ser dada como concluída: `npm run lint`, `npx tsc --noEmit`, `npm run test:lendas`, `npm run build`.

## 5. Decisões

Aprovadas pelo usuário:
- D1 (item 2): quando o computador joga, só a carta entra no campo com animação. Sem faixa de texto.
- D2 (item 13): "Mover para cemitério" e "Mover para exílio" saem do menu do jogador. Essas ações ficam só para efeitos de outras cartas (pós-MVP).
- D3 (item 7): em retrato, aparece o aviso "gire o celular" e a mesa só aparece em paisagem.

## 6. Riscos

- Girar a tela: o navegador não força orientação na maioria dos celulares (iPhone não permite). O aviso "gire o celular" é o caminho seguro.
- Layout em paisagem em celular baixo: 390 px de altura em paisagem deixa pouco espaço. Teste em 844 x 390 px (iPhone 14) e 740 x 360 px.
- Arrastar fora da mão e do campo no celular (pendência já aberta): o novo layout move mais zonas para a faixa inferior, então o gesto precisa ser conferido de novo.
