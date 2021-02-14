const path = require('path');

const { useBabelRc, addBabelPlugins,  override, fixBabelImports, addDecoratorsLegacy, addLessLoader, addWebpackAlias, addWebpackPlugin, disableEsLint, overrideDevServer } = require('customize-cra');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const threadLoader = require('thread-loader');
const chalk = require('chalk');
const isEnvProduction = process.env.NODE_ENV === "production";

const addPlugins = () => config => {
    
    config.plugins.push (
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'public/*')]
      })
    )

    return config
}

const useSMP = () => config => new SpeedMeasurePlugin().wrap(config);

const addCompression = () => config => {
  if (isEnvProduction) {
    config.plugins.push(
      // gzip压缩
      new CompressionWebpackPlugin({
        test: /\.(css|js)$/,
        // 只处理比1kb大的资源
        threshold: 1024,
        // 只处理压缩率低于90%的文件
        minRatio: 0.9
      })
    );
  }

  return config;
};

const happyPack = () => config => {
  config.module.rules.push({
    test: /\.js$/,
    include: path.resolve('src'),
    use: [
      'thread-loader',
    ],
  })

  config.module.rules.push({
    test: /\.js$/,
    include: path.resolve('src'),
    use: [
      'thread-loader',
    ],
  })

  return config
}

const terserPlugin = () => config => {
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
      }),
    ]
  }

  return config
}

// 查看打包后各包大小
const addAnalyzer = () => config => {
    config.plugins.push(new BundleAnalyzerPlugin());
    return config;
};

const sourceMap = () => config => {
  config.devtool =
      config.mode === 'development' ? 'eval' : false;

  //     // config.optimization = {...config.optimization, minimize: false  }

  // only for debug in test env
  // config.devtool = 'eval-source-map';
  return config;
};

module.exports = override(
  // fixBabelImports('import', {
  //   libraryName: 'antd-mobile',
  //   style: 'css',
  // }),
  sourceMap(),
  addDecoratorsLegacy(),
  addLessLoader(),
  addWebpackAlias({
    '@': path.join(__dirname, 'src'),
    '@/js': path.join(__dirname, 'src/js'),
    '@/js/component': path.join(__dirname, 'src/js/component'),
  }),
  addWebpackPlugin(new ProgressBarPlugin({
    complete: "█",
    format: `${chalk.green('Building')} [ ${chalk.green(':bar')} ] ':msg:' ${chalk.bold('(:percent)')}`,
    clear: true
  })
));
