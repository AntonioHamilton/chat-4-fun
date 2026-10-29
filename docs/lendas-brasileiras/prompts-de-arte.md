# Prompts de arte: Lendas Brasileiras

Prompts para as logos e para a concept art do jogo. Os prompts estão em inglês, para colar direto no Meta AI ou no Gemini. Mantenha o bloco de estilo igual em todas as imagens, para elas combinarem.

## Diretrizes

- Público: adulto. É um jogo de cartas de estrategistas que batalham entre si. Não é infantil, mas evite gore gratuito.
- Tipografia padrão do jogo: MedievalSharp (Google Fonts), com letras douradas em gradiente. É a fonte do título "Lendas Brasileiras" na tela inicial, e vale para tudo que for do jogo: logos, títulos e cartas.
- Logo do site segue o padrão das logos de Guess Country, Flag Quiz e Chat 4 Fun: mascote de desenho com contorno branco de adesivo, fundo azul-marinho escuro.
- Os geradores costumam colocar marca d'água (o Gemini faz isso). Se aparecer, peça de novo com "no watermark".

## 1. Logo do site (capivara jogando cartas)

Prompt:

```
cute cartoon capybara mascot casting magic with a fan of glowing enchanted cards in both paws, cards covered in arcane runes and glowing sigils, floating magic sparks around the cards, sticker style, thick white outline around the whole character, bold clean dark outlines, friendly confident smile, rosy cheeks, small dark navy vest with golden details, dark navy night background with faint glowing arcane sigils and faded Brazilian folklore motifs (a crescent moon, a small Saci Pererê silhouette, river waves, tupi-inspired geometric patterns, fireflies), flat vector cartoon look with soft shading, centered composition, no text, no watermark
```

Referências visuais que devem ser seguidas (anexar ao pedir): as logos de Guess Country, Flag Quiz e Chat 4 Fun. Pedir "same character style as the attached reference logos".

## 2. Logo do jogo (título dentro do jogo)

Prompt:

```
emblem icon, no text, no letters, semi-realistic hand-painted digital illustration in medieval fantasy concept art style, visible loose brushstrokes, bold saturated colors, dramatic lighting, central motif: a fiery Boitatá serpent (Brazilian folklore fire serpent) coiled around a crest, glowing red and orange flames with golden embers, arcane runes and magic sparks, a small Saci Pererê red cap resting on top of the crest, ornate gold medieval fantasy frame, bold readable silhouette, centered, solid flat #00FF00 chroma green background with no gradient and no shadow on the background, emblem fully separated from the background, no watermark
```

## 3. Concept art (estilo de arte do jogo)

Bloco de estilo, fixo em todas as artes do jogo:

```
semi-realistic hand-painted digital illustration, visible loose brushstrokes and textured edges, bold saturated colors with strong contrast, dramatic natural lighting, soft blurred background with depth of field, medieval fantasy with Brazilian folklore touches, adult tone, concept art for a strategy trading card game, clean readable silhouette, no text, no watermark
```

Referência usada: ilustração de cavaleira ruiva com armadura de placas, capa amarela, bandeiras vermelhas ao vento e campo verde ao fundo. Traço solto, sombras chapadas e pinceladas visíveis.

Para cartas, use o bloco de estilo mais o personagem ou cenário:

```
[bloco de estilo], full-body concept art of a Saci Pererê, one-legged trickster strategist with a red cap, holding a smoking pipe, standing in a dark forest clearing at night with fireflies, vertical card art composition 2:3
```

```
[bloco de estilo], full-body concept art of a capybara knight in plate armor with a wooden shield and a river banner, standing on a riverbank at sunrise, vertical card art composition 2:3
```

Para terrenos, troque o personagem por um cenário (ex: "a sunny riverbank with tall grass", "a dark forest clearing under moonlight"), em formato horizontal 16:9 para fundos.

## 5. Fundos do lobby (passam em loop, 16:9)

Use o bloco de estilo do item 3, mais o cenário. A área central deve ficar com pouco detalhe, porque o nome, os botões e o emblema ficam por cima.

Base:

```
[bloco de estilo], wide 16:9 cinematic landscape, empty central area with less detail so UI text stays readable, soft vignette on the edges
```

Cena 1 (Boitatá):

```
[base], a night forest in Brazil, a giant fiery serpent Boitatá gliding between ancient trees, glowing embers and fireflies, a full moon behind distant mountains, mist on the ground, deep blue and violet tones with orange firelight
```

Cena 2 (castelo do rio):

```
[base], a ruined medieval stone castle on a cliff above a wide tropical river at dusk, red banners torn by the wind, floating arcane runes and magic light over the water, a distant silhouette of Iara on a rock, purple sky with golden sunset light
```

Cena 3 (mesa dos estrategistas):

```
[base], a stone war room in a forest clearing at night, a large round table with a glowing map and floating magic cards, a campfire, torches, a small red cap left on a stone, golden light, deep green and gold tones
```

Os três fundos entram no loop em `src/LendasBrasileiras/Constants/lobby.ts`, na ordem em que estão aqui.

## Observações

- Os prompts são um ponto de partida. Não gerei as imagens, então ajuste conforme o resultado.
- Se o gerador ignorar a tipografia pedida, peça de novo citando "MedievalSharp-style gothic display font" ou envie uma captura do título atual como referência.
