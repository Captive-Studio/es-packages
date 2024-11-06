import type { CSSVariables, Theme } from './type.js';

export function toCSSStyle(theme: Theme, prefix = ''): string {
  const cssVars = toCSSVariables(theme, prefix);
  const cssRules = Object.entries(cssVars)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');
  return `:root {\n${cssRules}\n}\n`;
}

export function toCSSVariables(theme: Theme, prefix = ''): CSSVariables {
  return {
    ...toCSSVariablesObject(theme.typeface, `${prefix}-typeface`),
    ...toCSSVariablesObject(theme.color, `${prefix}-color`),
    ...toCSSVariablesObject(theme.spacing, `${prefix}-space`),
  };
}

function toCSSVariablesObject(obj: object, prefix = ''): CSSVariables {
  function getObjectEntries(input: object, entryPrefix = ''): Array<[string, string]> {
    return Object.entries(input).flatMap(([key, value]) => {
      if (value != null && typeof value === 'object' && !Array.isArray(value)) {
        // Appel récursif pour les objets imbriqués
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return getObjectEntries(value, `${entryPrefix}-${key}`);
      }
      // Formate le nom de la variable CSS
      const cssVarName = `${prefix}-${toDashCase(key.replaceAll('_', '-'))}`;
      return [[cssVarName, Array.isArray(value) ? value.join(', ') : String(value)]];
    });
  }

  return Object.fromEntries(getObjectEntries(obj, prefix));
}

function toDashCase(str: string) {
  return str.replaceAll(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
