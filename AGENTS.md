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

## Regressão: testes que quebram a aplicação

Ainda sem casos registrados. Cada bug corrigido deve entrar aqui com: o que quebra, como reproduzir e qual teste ou conferência cobre.

## O que não fazer

- Não adicionar features, refatorar ou tratar erros além do pedido.
- Não apagar arquivos, sobrescrever dados, resetar configs ou fazer push/merge/PR sem confirmação do usuário.
- Não matar processos por nome (`taskkill /IM node.exe`): finalize apenas o PID que você mesmo iniciou.
- Não commitar `.env`, `.env.local` nem chaves/tokens.
- Não mexer no backend de produção (Render) sem ok do usuário.
