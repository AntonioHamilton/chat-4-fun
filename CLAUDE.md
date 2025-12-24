# Regras do Projeto Chat 4 Fun

## 1. Instruções Gerais

- **Comunicação:** Seja direto, claro e conciso.
- **Limitações:** Se não souber de algo ou não entender, diga diretamente e peça por mais informações.
- **Detalhes:** Forneça explicações detalhadas apenas se solicitado.
- **Foco:** Responda com o mínimo necessário para o entendimento e execução.
- **Conteúdo:** Nunca invente informações ou estruturas inexistentes.
- **Encerramento:** Não use frases de encerramento.

## 2. Instruções para Código

- **Comentários:** Não inclua comentários no código.
- **Idioma:** Variáveis, funções, classes, tipagens e outros elementos de código devem ser em inglês.
- **Modificações:** Não altere trechos de código ou arquivos que não foram explicitamente solicitados para modificação.
- **Exemplos:** Sempre que possível, forneça exemplos prontos para uso.

## 3. Estrutura do Projeto

### Estrutura de Pastas

- `src/`: Todo o código fonte.
- `src/pages/`: Páginas do Next.js (rotas).
- `src/Components/`: Componentes reutilizáveis compartilhados.
- `src/GymClicker/`: Componentes e hooks específicos do jogo Gym Clicker.
- `src/styles/`: Arquivos de styled-components globais.
- `public/`: Arquivos estáticos (imagens, GIFs, etc).

### Padrão de Código

- Use **TypeScript** para arquivos `.ts` e `.tsx`.
- Componentes devem ser **function components** com **arrow functions**.
- Nomes de arquivos de componentes em **PascalCase**.
- Nomes de arquivos utilitários e hooks em **camelCase**.
- Sempre tipar props e funções.
- Use **React Hooks** para lógica de estado.
- Use **custom hooks** para lógica reutilizável (ex: `useGymClicker`).

### Estilização

- Use **styled-components** para estilização.
- Arquivos de styled-components devem ser nomeados `styled.ts` dentro da pasta do componente.
- Estilos globais em `src/styles/`.
- Use `* as SC` para importar styled-components: `import * as SC from "./styled";`
- Use breakpoints de `src/styles/breakpoints.ts` para responsividade.

### Path Aliases

- Use os path aliases configurados no `tsconfig.json`:
  - `@/*` para `src/*`
  - `@styles/*` para `src/styles/*`
  - `@components/*` para `src/components/*`

### Lint e Formatação

- Use **ESLint** e **Prettier** conforme configurado.
- Não faça commit com erros de lint.
- Use o script `npm run lint` antes de subir código.
- Prettier configurado com: semicolons, double quotes, no trailing comma, tabWidth 2.

### Commits e Versionamento

- Siga o padrão de commits semânticos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
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

## 4. Padrões Específicos do Projeto

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
