# Regras do Projeto Chat 4 Fun

Guia para agentes de IA neste repositório. Para o que o projeto faz e como subir o ambiente, veja o `README.md`.
Escreva e responda no idioma em que o usuário escreve.

## O que é

Site de minijogos feito por diversão, publicado na Vercel. Hoje tem Adivinhe o País (`/guess-the-country`) e Qual a bandeira? (`/flag-quiz`). Os jogos de Adivinhe o País e de Qual a bandeira? usam dados em português e inglês.

## Stack

- Next.js 14 com `pages/` (não App Router), React 18, TypeScript.
- styled-components 6 para estilo, `flag-icons` para bandeiras.
- ESLint e Prettier. Não usar Tailwind nem bibliotecas de gráficos.
- Backend separado em `C:\development\chat-4-fun-backend` (Node, `ws` e `http`), usado pelo modo online do Adivinhe o País.

## Comandos

- Subir o front: `npm run dev` (porta 3000).
- Checks antes de dar uma tarefa por concluída:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Backend (`C:\development\chat-4-fun-backend`): `npm run typecheck` e `npm run dev`. Rode com `PORT=3001` para não colidir com o Next na porta 3000.

Rode os checks do projeto antes de dar uma tarefa por concluída.

## Estrutura

### Pastas

- `src/`: todo o código fonte.
- `src/pages/`: rotas do Next.js.
- Compartilhado, na raiz de `src/`, em pastas específicas:
  - `src/Components/`: componentes usados por mais de um jogo ou área (ex: `CountryFlag/`).
  - `src/Hooks/`: hooks compartilhados (ex: `useCountdown.ts`, `useTranslation.ts`).
  - `src/Utils/`: funções compartilhadas (ex: `countries.ts`, `text.ts`).
  - `src/Constants/`: constantes compartilhadas (ex: `countries.ts`, `countryCodes.ts`).
  - `src/Types/`: tipos compartilhados (ex: `Language.ts`, `Game.ts`).
  - `src/Translations/`: textos em PT_BR e EN_US, um arquivo por jogo.
  - `src/styles/`: styled-components globais e `breakpoints.ts`, `theme.ts`.
- Jogos: `src/GuessCountry/` (Adivinhe o País) e `src/FlagQuiz/` (Qual a bandeira?). Mesma forma em cada um: Components, Hooks, Utils, Types, Constants (ex: `src/GuessCountry/Constants/game.ts`).
- `public/`: arquivos estáticos (imagens, GIFs, ícones).

### Arquitetura fractal

- Cada unidade (site, jogo) repete a mesma forma de pastas. O que é de uma unidade fica dentro dela; o que é usado por mais de uma unidade vai para a raiz de `src/`, na pasta do tipo certo.
- Nunca importar de outra pasta de jogo (ex: `src/FlagQuiz` importando de `src/GuessCountry`). Se dois jogos precisam do mesmo código, mova para a raiz de `src/`.
- Antes de criar um módulo num jogo, confira se ele já existe na raiz e reutilize. Use o alias `@/` nos imports entre pastas (ex: `@/Utils/countries`).
- Ao criar um novo jogo, copie a forma de um existente (ex: `src/FlagQuiz/`) em vez de inventar pastas.

### Padrão de Código

- Use **TypeScript** para arquivos `.ts` e `.tsx`.
- Componentes devem ser **function components** com **arrow functions**.
- Nomes de arquivos de componentes em **PascalCase**.
- Nomes de arquivos utilitários e hooks em **camelCase**.
- Sempre tipar props e funções.
- Use **React Hooks** para lógica de estado.
- Use **custom hooks** para lógica reutilizável (ex: `useFlagQuiz`).

### Estilização

- Use **styled-components** para estilização.
- Arquivos de styled-components devem ser nomeados `styled.ts` dentro da pasta do componente.
- Estilos compartilhados entre componentes ficam em `src/styles/`.
- Use `* as SC` para importar styled-components: `import * as SC from "./styled";`
- Use breakpoints de `src/styles/breakpoints.ts` para responsividade.
- Cores vêm de `src/styles/theme.ts`, não de valores soltos.

### Path Aliases

- Use os path aliases configurados no `tsconfig.json`:
  - `@/*` para `src/*`
  - `@styles/*` para `src/styles/*`
  - `@components/*` para `src/components/*`
- Atenção: a pasta real é `src/Components` (C maiúsculo). Confira o `tsconfig.json` antes de usar o alias de componentes.

### Lint e Formatação

- Use **ESLint** e **Prettier** conforme configurado.
- Não faça commit com erros de lint.
- Use o script `npm run lint` antes de subir código.
- Prettier configurado com: semicolons, double quotes, no trailing comma, tabWidth 2.

### Commits e Versionamento

- Siga o padrão de commits semânticos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- Mensagens de commit no idioma do projeto (português).
- Use **husky** para hooks de pré-commit (já configurado com pretty-quick).

### Gerenciamento de Estado

- Use **React Hooks** (`useState`, `useEffect`, `useCallback`, etc) para estado local.
- Use **custom hooks** para lógica complexa e reutilizável.
- Para estado global, considere Context API se necessário.
- Evite prop-drilling excessivo.

### Acessibilidade (a11y)

- Utilize HTML semântico.
- Elementos interativos devem ser acessíveis via teclado.
- Imagens devem ter o atributo `alt` (preenchido ou vazio se decorativo).
- Use atributos ARIA quando necessário.

## Regras de Conteúdo e Código

- **Comunicação:** Seja direto, claro e conciso.
- **Limitações:** Se não souber de algo ou não entender, diga diretamente e peça por mais informações.
- **Detalhes:** Forneça explicações detalhadas apenas se solicitado.
- **Foco:** Responda com o mínimo necessário para o entendimento e execução.
- **Conteúdo:** Nunca invente informações ou estruturas inexistentes.
- **Encerramento:** Não use frases de encerramento.
- **Comentários:** Não inclua comentários no código.
- **Idioma do código:** Variáveis, funções, classes, tipagens e outros elementos de código devem ser em inglês.
- **Modificações:** Não altere trechos de código ou arquivos que não foram explicitamente solicitados para modificação.
- **Exemplos:** Sempre que possível, forneça exemplos prontos para uso.
- Não adicione features, refatorações nem tratamento de erro além do pedido.

## Padrões Específicos do Projeto

### Componentes

- Componentes devem exportar apenas o componente principal.
- Props devem ser tipadas com `type` ou `interface`.
- Use destructuring para props.
- Exemplo de estrutura:

```typescript
import * as SC from "./styled";

type ComponentProps = { prop1: string; prop2: number };

export const Component = ({ prop1, prop2 }: ComponentProps) => {
	return <SC.Container>...</SC.Container>;
};
```

### Hooks Customizados

- Hooks devem começar com `use`.
- Retornar objetos com valores e setters quando necessário.
- Usar `useCallback` e `useMemo` quando apropriado para performance.
- Exemplo:

```typescript
export const useCustomHook = () => {
	const [state, setState] = useState(0);

	const handler = useCallback(() => {
		// logic
	}, [dependencies]);

	return { state, setState, handler };
};
```

### Styled Components

- Nomear componentes styled com PascalCase.
- Agrupar imports: `import * as SC from "./styled";`
- Usar breakpoints para responsividade.
- Exemplo:

```typescript
export const Container = styled.div`
	display: flex;

	@media (max-width: ${breakpoints.md}) {
		flex-direction: column;
	}
`;
```

### Next.js

- Usar `pages/` para rotas (não App Router).
- Componentes de página devem ser default exports.
- Usar `next/image` para otimização de imagens.
- Usar `next/link` para navegação.

### Local Storage

- Quando usar localStorage, sempre tratar erros de acesso.
- Salvar estado do jogo em formato JSON.
- Carregar estado na inicialização quando apropriado.

## Personas de teste (Lendas Brasileiras)

Mesa v2: campo do adversário em cima, campo do jogador no meio, faixa inferior (comandante com vida (só exibição), cemitério e exílio à esquerda, mão em leque, biblioteca, terrenos livres por cor e Passar turno à direita). Em retrato até 480 px aparece só o aviso "Gire o celular" (inclusive no lobby). Clicar em carta abre a carta ampliada com o botão de ação ("Jogar terreno", "Colocar em campo"); não existe menu de carta. Regras automáticas: compra e desvirar terrenos no início do turno de cada jogador (exceto o primeiro turno da partida), mana paga virando terrenos livres ao lançar a carta.

- **Duda, celular em paisagem (844x390, toque):** toca e arrasta mal. Fluxos: lobby, tocar carta da mão e usar "Colocar em campo" / "Jogar terreno" na carta ampliada, tocar Cemitério e Exílio para ver a lista, abrir e fechar o histórico pelo ícone à esquerda, Passar turno e ver a IA jogar, girar para retrato (aviso). Erros típicos: toque duplo, tocar na vez do computador, tocar carta sem mana ("Mana insuficiente"), girar o celular no meio da partida. Verificar sem overflow horizontal ou vertical a 844x390, e o aviso em 390x844, 480x800 (aviso) e 481x800 (mesa).
- **Rafa, PC com mouse (1280x800, também 1024x768):** arrasta tudo. Fluxos: arrastar mão para Terrenos/Campo, clicar carta para ampliar, histórico sobreposto, lançar carta sem mana suficiente, Passar turno. Erros típicos: soltar carta fora das zonas, segundo terreno no turno, arrastar carta para o campo do oponente, clicar em Menu sem querer (volta ao lobby), clicar fora da carta ampliada e do histórico.
- **Léo, teclado e leitor de tela (1024x768):** só Tab, Enter e Esc. Fluxos: Tab até a carta da mão, Enter abre a carta ampliada, Tab entre "Colocar em campo" e "Fechar" (foco preso), Esc fecha e devolve o foco à carta, abrir histórico e listas de Cemitério/Exílio pelo teclado, Passar turno. Erros típicos: Tab saindo da carta ampliada, foco perdido ao fechar, ordem de foco, botão sem rótulo.

Todas rodam contra o computador. Automatizado (motor e IA): `npm run test:lendas`. Manual: com o `npm run dev` rodando, abrir `/lendas-brasileiras` (dá para simular as telas com um iframe de WxH na mesma origem) e repetir os fluxos acima; casos já achados estão em "Regressão".

## Regressão: testes que quebram a aplicação

Suíte do motor e da IA: `npm run test:lendas`. Testes marcados `todo` documentam bugs ainda abertos (falham hoje sem quebrar a suíte); ao corrigir o bug, tire o `todo`. Hoje não há `todo` na suíte.

### Corrigidos (histórico)

- Motor aceitava jogada depois do fim da partida (`moveCard`, `adjustLife`): corrigido. Teste: `src/LendasBrasileiras/Utils/engine/regression.test.ts` ("rejects moveCard after the match is over"). `adjustLife` foi removido nos ajustes 2 (vida só exibição), junto com o teste "keeps life unchanged...".
- `tappedLands` guardava terreno que saiu da zona de terrenos (contador negativo): corrigido. Teste: `regression.test.ts` ("drops a tapped land from tappedLands...", agora tapando o terreno ao lançar uma carta, já que `tapLand` foi removido). Na mesa v2 o jogador não move carta para o cemitério.
- Menu da carta sem trap de foco: removido, menu apagado (a carta ampliada prende o foco, Esc fecha e devolve o foco à carta; conferido por teclado em 26/10/2026).

### Abertos (tela, sem teste automatizado: não há framework de UI)

Casos de mão sem limite (comprar sem parar) e de botões de vida (habilitados após o fim, alvo de 24 px) deixaram de existir nos ajustes 2: não há mais botão Comprar nem +/- na vida.

Validação da mesa v2 de 26/10/2026 (iframes 844x390, 1024x768, 1280x800 e retrato 390x844/480x800/481x800/320x568 no Chrome; sem overflow em nenhum; Lendas v2 no commit 7d19a5c):

1. [baixa] Botão "Menu" (topo esquerdo) volta ao lobby na hora, sem confirmar e perdendo a partida. Reproduzir: iniciar partida, clicar Menu.
2. [baixa] Em retrato (até 480 px) o aviso "Gire o celular" cobre também o lobby, sem botão de voltar ao portfólio. Reproduzir: abrir `/lendas-brasileiras` em 390x844. Confirmar se é intencional (D3 só pede a mesa).
3. [baixa] Painel do histórico (fundo 72% opaco) deixa o texto misturado com as cartas atrás em 844x390. Reproduzir: abrir o histórico no meio da partida.
4. [baixa, só tela] Cartas de terreno branco (ex: "Mirante do Sol") com rótulo claro sobre fundo bege, contraste fraco (caso antigo; não reconferido).

Cobertura automática adicional (sem bugs): `src/LendasBrasileiras/Utils/engine/ai.test.ts` (IA passa fora do seu turno, joga partida inteira contra si mesma até alguém perder, não mexe nas zonas do oponente).

Conferido sem bug na mesa v2: campo do adversário em cima sem rolar nas três telas, comprar, jogar terreno (segundo terreno recusado: "Já jogou um terreno neste turno"), virar terreno e mana, criatura em campo pela carta ampliada, "Mana insuficiente" sem fechar a carta, lista de Cemitério e Exílio, histórico (ícone, Esc e clique fora fecham), Passar turno passa a vez inteira (Principal 1, 2, Fim) e a IA joga com animação de entrada (0,4 s) em criatura, artefato e comandante, vida do oponente desabilitada, fim por biblioteca vazia ("Vitória de Computador"), arrastar com mouse para zona válida/inválida/campo do oponente, foco preso e devolvido na carta ampliada, menu antigo da carta ausente.

## O que não fazer

- Não adicionar features, refatorar ou tratar erros além do pedido.
- Não apagar arquivos, sobrescrever dados, resetar configs ou fazer push/merge/PR sem confirmação do usuário.
- Não matar processos por nome (`taskkill /IM node.exe`): finalize apenas o PID que você mesmo iniciou.
- Não commitar `.env`, `.env.local` nem chaves/tokens.
- Não mexer no backend de produção (Render) sem ok do usuário.
