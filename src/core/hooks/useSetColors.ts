import { useEffect } from "react";
import { camelToKebab } from "../../utils/camelToKebab";
import { ColorSchema } from "../types/global.types";

const properties: (keyof ColorSchema)[] = [
  "background",
  "backgroundDisabled",
  "backgroundHovered",
  "primary",
  "textPrimary",
  "border",
  "text",
  "primaryFade",
  "textNegative",
  "dayLabelBackground",
  "highlight",
  "weekend",
  "borderFade",
];

export const useSetColors = (colors?: ColorSchema) => {
  useEffect(() => {
    if (!document) return;

    const root = document.documentElement;

    properties.forEach((key) => {
      const property = camelToKebab(key);

      root.style.removeProperty(`--${property}`);
    });

    if (!colors || Object.keys(colors).length === 0) {
      return;
    }

    Object.keys(colors).forEach((color) => {
      if (!properties.includes(color as keyof ColorSchema)) return;

      const colorProperty = camelToKebab(color);

      root.style.setProperty(
        `--${colorProperty}`,
        colors[color as keyof ColorSchema] || "#000",
      );
    });
  }, [colors]);
};
