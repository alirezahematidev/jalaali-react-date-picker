import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as path from "path";
import TerserPlugin from "terser-webpack-plugin";
import * as webpack from "webpack";
import pkg from "./package.json";

const config: webpack.Configuration = {
  name: pkg.name,
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["css-loader"],
        exclude: "/node_modules/",
        oneOf: [
          {
            test: /.css$/,
            exclude: "/node_modules/",
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: ["url-loader?limit=100000"],
        exclude: "/node_modules/",
        oneOf: [
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            exclude: "/node_modules/",
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
        resolve: {
          extensions: [".ts", ".tsx", ".jsx", ".js"],
        },
        oneOf: [
          {
            test: /\.tsx?$/,
            exclude: "/node_modules/",
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
        resolve: {
          extensions: [".js", ".jsx", ".mjs", ".mjsx"],
        },
        oneOf: [
          {
            test: /\.jsx?$/,
            exclude: "/node_modules/",
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: "/node_modules/",
        parallel: true,
        terserOptions: {
          sourceMap: true,
        },
      }),
    ],
    usedExports: true,
  },

  devtool: "source-map",
  resolve: {
    modules: [
      path.resolve(__dirname, "./node_modules"),
      path.resolve(__dirname, "lib"),
    ],
    alias: {
      src: false,
      components: path.resolve(__dirname, "./src/components"),
      [pkg.name]: process.cwd(),
    },
    preferRelative: true,
    extensions: [".ts", ".tsx", ".jsx", ".js"],
  },
  entry: {
    main: path.resolve(__dirname, "./src/index"),
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "[name].js",
    library: pkg.name,
    libraryTarget: "umd",
    globalObject: "this",
    clean: true,
    publicPath: "",
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, "./node_modules"),
      path.resolve(__dirname, "./lib"),
    ],
  },
  ignoreWarnings: [() => false],
  mode: "production",
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version}`),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: pkg.name,
      minify: "auto",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/styles",
          to: "styles",
        },
        {
          from: "src/assets",
          to: "assets",
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  externals: ["react", "react-dom", "moment-jalaali", "moment"],
};

export default config;
