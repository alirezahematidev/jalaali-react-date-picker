/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Every time fonts icon changed, you should resolve types. this script doing
 * that automatically
 */
const fs = require("fs");
const path = require("path");

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

// @ts-ignore
const config = require("../../../public/assets/fonts/icomoon/selection.json");

const icons = {};
const types = [];

config.icons = config.icons.map((icon) => ({
  ...icon,
  code: icon.properties.code,
  name: icon.properties.name,
}));

config.icons = config.icons.sort(({ name: a }, { name: b }) => a - b);

config.icons.forEach(({ name, code }) => {
  icons[name] = Number(code).toString(16);
});

config.icons.forEach(({ name }) => {
  types.push(`${name}`);
});

fs.writeFileSync(
  resolvePath("./iconsContent.ts"),
  `// Auto generate
  export const iconsContent = ${JSON.stringify(icons)}`,
);
fs.writeFileSync(
  resolvePath("./iconNames.ts"),
  `// Auto generate
  export type IconsNames = ${types.map((name) => `"${name}"`).join("\n|")}
  `,
);
