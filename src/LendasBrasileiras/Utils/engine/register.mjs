import { register } from "node:module";

const hooks = `
export async function resolve(specifier, context, nextResolve) {
	if (specifier.startsWith("./") || specifier.startsWith("../")) {
		if (!/\\.[a-z]+$/.test(specifier)) {
			try {
				return await nextResolve(specifier + ".ts", context);
			} catch {}
		}
	}
	return nextResolve(specifier, context);
}
`;

register("data:text/javascript," + encodeURIComponent(hooks));
