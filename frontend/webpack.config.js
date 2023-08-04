module.exports = {
  module: {
    rules: [
      // ... 다른 룰 ...
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/, // 노드 모듈은 제외하거나 필요에 따라 조정
        use: [
          {
            loader: "file-loader",
            options: {
              //   outputPath: "static/media/",
              //   publicPath:"/"
              //   esModule: false,
              limit: 500,
            },
          },
        ],
      },
    ],
  },
};
