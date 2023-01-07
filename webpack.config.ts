import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  module: {
    rules: [
      {
        test: /.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: "/node_modules/",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: ["url-loader?limit=100000"],
        exclude: "/node_modules/",
      },
      {
        test: /\.tsx?$/i,
        use: "ts-loader",
        exclude: "/node_modules/",
        resolve: {
          extensions: [".ts", ".tsx", ".jsx", ".js"],
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin({ test: /.css$/i })],
    removeEmptyChunks: true,
  },
  devtool: "inline-source-map",
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
    },
    preferRelative: true,
    extensions: [".ts", ".tsx", ".jsx", ".js"],
  },
  entry: path.resolve(__dirname, "./src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "[name].js",
    library: "jalaali-react-date-picker",
    libraryTarget: "umd",
    clean: true,
  },
  ignoreWarnings: [() => false],
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      title: "jalaali-react-date-picker",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/styles",
          to: "styles",
        },
        {
          from: "src/custom.d.ts",
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  externals: {
    react: "commonjs react",
  },
};

export default config;
