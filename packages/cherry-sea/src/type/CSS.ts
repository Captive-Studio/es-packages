export type CSSColor = string;

/**
 * A CSS size (width or height or padding, etc).
 * It can be in px, em, rem, ...
 */
export type CSSSize = string;

/**
 * A CSSVariables dictionary
 */
export interface CSSVariables {
  [key: string]: string;
}
