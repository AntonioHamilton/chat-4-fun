# Lendas Brasileiras: ajustes 2 (mesa e regras automáticas)

Status: pedido direto do usuário após testar a mesa v2 no celular. Base: `master` (commit a767b88).

## 1. Layout

1. Botão "Passar turno": menor que o atual. Tamanho compatível com os botões da faixa inferior, sem perder o alvo de toque (mín. 44 px de altura).
2. Área do comandante: maior, com a carta do comandante também maior (pilha do comando na faixa inferior e na área do campo do jogador).
3. Exílio com o mesmo tamanho do Cemitério (mesma largura e altura).
4. Mana: sai do bloco da vida e vai para o canto direito da faixa inferior, acima do botão Passar turno (área marcada no rascunho do usuário). Mostra símbolos coloridos com a quantidade de terrenos de cada cor (ícone circular com número). Símbolos definitivos ficam para depois; nesta etapa, círculo colorido com número.

## 2. Vida

5. Remover os botões + e - da vida, dos dois jogadores (faixa do adversário e faixa do jogador).
6. A vida inicial é 40 e não muda por clique. Só exibir.

## 3. Regras automáticas

7. Compra: no início do turno de cada jogador (exceto o primeiro turno da partida, que já começa com 7 cartas), uma carta é comprada sozinha. Remover o botão "Comprar" e o clique na biblioteca.
8. Desvirar: no início do turno de cada jogador, todos os terrenos dele voltam a ficar livres, sem ação do jogador.
9. Mana automática: ao lançar uma carta, o jogo vira os terrenos necessários sozinho para pagar o custo. O jogador não vira terreno manualmente. Remover a ação "Virar para gerar mana" do zoom.
10. Jogar terreno continua manual (é uma decisão do jogador): um terreno por turno.

## 4. Critérios de aceite

- Layout: comandante e carta do comandante maiores que hoje; Exílio e Cemitério com o mesmo tamanho; botão Passar turno menor e com alvo de 44 px.
- Vida: sem +/- em nenhum jogador; valor 40 no início.
- Compra: início de turno do jogador (e da IA) adiciona uma carta à mão; sem botão Comprar.
- Desvirar: ao começar o turno, os terrenos aparecem livres.
- Mana automática: lançar uma carta de custo 2 com dois terrenos livres vira os dois sozinho; sem mana suficiente, não lança e mostra erro.
- Mana fora da vida: símbolos no canto direito acima do Passar turno.

## 5. Verificação

- `npx tsc --noEmit`, `rtk proxy npm run lint`, `npm run test:lendas`, `npx prettier --check`, build numa cópia.
- Testes novos no motor: desvirar no início do turno; compra no início do turno; pagamento automático de custo com terrenos livres; erro sem mana suficiente.
- Visual em 844x390, 1024x768 e 1280x800.
