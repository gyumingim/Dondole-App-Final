// src/styled.d.ts
import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      white: string;
      textDark: string;
      textLight: string;
    };
    fonts: {
      regular: string;
      medium: string;
      bold: string;
    };
    fontSizes: {
      title: number;
      subtitle: number;
      body: number;
      small: number;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    borderRadius: {
      sm: number;
      md: number;
    };
  }
}
