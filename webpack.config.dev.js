const postcssPresetEnv = require("postcss-preset-env");
const tailwindCss = require("tailwindcss");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    inline: true,
  },

  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  entry: {
    app: ["react-hot-loader/patch", "./src/client/app.tsx"],
    observer: ["./src/client/observer.ts"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../priv/static/js"),
    publicPath: "http://localhost:8080/",
  },
  module: {
    rules: [
      {
        test: /\.[jt]s(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1, sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                tailwindCss("./tailwind.config.js"),
                postcssPresetEnv(),
              ],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
