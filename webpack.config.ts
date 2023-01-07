import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  module: {
    rules: [
      {
        test: /.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: ["url-loader?limit=100000"],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin({ test: /.css$/i })],
    removeEmptyChunks: true,
  },
  entry: path.resolve(__dirname, "lib/main.js"),
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "main.js",
    compareBeforeEmit: true,
  },

  ignoreWarnings: [() => false],
  plugins: [new MiniCssExtractPlugin()],
};

export default config;
