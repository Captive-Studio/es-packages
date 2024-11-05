export interface Typeface {
  /**
   * List of font family to use
   */
  fontFamily: Array<string>;
  /**
   * Letter spacing
   */
  letterSpacing: number | string | undefined;
}
export function Typeface(properties: Partial<Typeface>): Typeface {
  return {
    fontFamily: [],
    letterSpacing: undefined,
    ...properties,
  };
}
