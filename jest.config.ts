import type { Config } from "jest";

const config: Config = {
  testPathIgnorePatterns: [".*/lib/.*", "lib"],
  transformIgnorePatterns: ["/node_modules/"],
};

export default config;
