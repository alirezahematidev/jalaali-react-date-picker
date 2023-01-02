/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

const excludes = `node_modules/(.*)`;

const includes = [resolvePath("./src/core/styles/index.css")];

module.exports = {
  webpack: (config) => {
    config.module.rules[0].include = includes;
    config.module.rules[0].exclude = excludes;

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.css$/i,
      use: {
        loader: ["style-loader", "css-loader"],
      },
    });

    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      use: ["url-loader?limit=100000"],
    });

    return config;
  },

  jest: function (config) {
    config.testPathIgnorePatterns = [".*/dist/.*", "dist"];

    config.transformIgnorePatterns = ["/node_modules/"];

    config.moduleNameMapper = {
      ...config.moduleNameMapper,
    };

    return config;
  },
  paths: function (paths) {
    return paths;
  },
};
