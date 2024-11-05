/* eslint-disable @typescript-eslint/naming-convention */
export type CSSColor = string;

export interface ColorPalette {
  50: CSSColor;
  100: CSSColor;
  200: CSSColor;
  300: CSSColor;
  400: CSSColor;
  500: CSSColor;
  600: CSSColor;
  700: CSSColor;
  800: CSSColor;
  900: CSSColor;
  // 950: CSSColor;
}
export function ColorPalette(properties: ColorPalette): ColorPalette {
  return properties;
}
