export type ThemeStaticType = {
  accent: string,
  white: string,
  black: string,
  text01: string,
  text02: string,
  placeholder: string,
  like: string,
  unlike: string
};

export type ThemeColors = {
  accent: string,
  base: string,
  text01: string,
  text02: string,
  placeholder: string,
  white: string
};

export type ThemeVariantType = {
  light: string,
  dark: string
};

export type ThemeType = {
  type: keyof ThemeVariantType,
  colors: ThemeColors
};