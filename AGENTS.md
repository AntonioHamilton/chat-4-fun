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

- **Duda, celular (390 px):** toca e arrasta mal. Fluxos: lobby, tocar carta e usar o menu (jogar, cemitério, ampliar), toque longo para ampliar, Próxima fase. Erros típicos: toque duplo, arrasto curto que vira clique, tocar na vez do computador. Verificar sem overflow horizontal a 320 e 390 px.
- **Rafa, PC com mouse (1280 px):** arrasta tudo. Fluxos: arrastar mão para Terrenos/Campo/Cemitério, virar terreno, vida +/-, histórico lateral. Erros típicos: soltar carta em zona errada, arrastar duas vezes o terreno, soltar fora das zonas, arrastar carta do oponente.
- **Léo, teclado e leitor de tela (820 px):** só Tab, Enter e Esc. Fluxos: Tab até a carta, Enter abre o menu, escolher destino, Esc fecha, Próxima fase. Erros típicos: Tab saindo do menu, foco perdido ao fechar, ordem de foco.

Todas rodam contra o computador. Automatizado: `npm run test:lendas`. Manual: `npm run dev`, abrir `/lendas-brasileiras` e repetir os fluxos acima; casos já achados estão em "Regressão".

## Regressão: testes que quebram a aplicação

Suíte do motor e da IA: `npm run test:lendas`. Testes marcados `todo` documentam bugs ainda abertos (falham hoje sem quebrar a suíte); ao corrigir o bug, tire o `todo`.

Lendas Brasileiras, validação de 25/10/2026 (testado em iframes de 320, 390, 820 e 1280 px no Chrome; sem overflow horizontal em nenhum):

1. [baixa] Motor aceita jogada depois do fim da partida. Com `winner` definido, `moveCard` ainda move carta e `adjustLife` ainda muda a vida (na UI, menu da carta e botões +/- da vida seguem ativos após "Partida encerrada"). Reproduzir: jogar até a biblioteca esvaziar (clicar Comprar na sua vez) e então mover carta para o Cemitério ou clicar +. Teste: `src/LendasBrasileiras/Utils/engine/regression.test.ts` ("rejects moveCard after the match is over", "keeps life unchanged after the match is over").
2. [baixa] `tappedLands` guarda terreno que já saiu da zona de terrenos, e o contador "Terrenos livres/total" pode ficar negativo. Reproduzir: jogar terreno, virar para gerar mana, mover para Cemitério pelo menu: aparece "Terrenos -1/0". Teste: `regression.test.ts` ("drops a tapped land from tappedLands...").
3. [média, só tela] Menu da carta (`CardMenu`) tem `aria-modal` mas não prende o foco: Tab sai do menu e vai para os links do rodapé; Esc só fecha com o foco dentro do menu; ao fechar, o foco vai para o `body` e não volta à carta. Reproduzir: Tab até uma carta da sua mão, Enter, Tab 7 vezes (foco chega em "← Portfolio"), Esc (menu continua aberto). Sem teste automatizado (não há framework de UI no projeto).
4. [baixa, só tela] Ordem do Tab começa nas cartas do computador (mão dele, zona de comando) antes das suas; leitor de tela passa por ~10 cartas do oponente antes de chegar às suas. Reproduzir: abrir mesa contra o computador e apertar Tab 4 vezes após "Próxima fase".
5. [baixa, decisão a confirmar] A mão do computador aparece virada para cima (nomes e custos visíveis). A spec seção 11 não pede mão oculta; confirmar se é intencional.
6. [baixa, só tela] Cartas de terreno branco (ex: "Mirante do Sol", "Savana Clara") têm o rótulo "Terreno" claro sobre fundo bege, contraste fraco. Reproduzir: deck Capivara, olhar a mão a 1280 px.

Cobertura automática adicional (sem bugs): `src/LendasBrasileiras/Utils/engine/ai.test.ts` (IA passa fora do seu turno, joga partida inteira contra si mesma até alguém perder, não mexe nas zonas do oponente).

Conferido sem bug: escolher deck, jogar terreno (segundo terreno recusado), virar terreno e pool, mover para Cemitério pelo menu, comprar, ajustar vida, passar fase, IA joga sozinha (terreno, feitiço, criatura, encantamento), humano bloqueado no turno da IA (botões desabilitados), fim de partida por biblioteca vazia ("Vitória de Computador"), arrastar com mouse para zona válida e inválida.

## O que não fazer

- Não adicionar features, refatorar ou tratar erros além do pedido.
- Não apagar arquivos, sobrescrever dados, resetar configs ou fazer push/merge/PR sem confirmação do usuário.
- Não matar processos por nome (`taskkill /IM node.exe`): finalize apenas o PID que você mesmo iniciou.
- Não commitar `.env`, `.env.local` nem chaves/tokens.
- Não mexer no backend de produção (Render) sem ok do usuário.
