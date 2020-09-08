const path = require("path")
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const isDev = process.env.NODE_ENV === 'development'

const config={
  target:'web',
  entry:path.join(__dirname,'./src/index.js'),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname,'dist')
  },
  plugins: [
    new VueLoaderPlugin(),

    new webpack.DefinePlugin(
      {
        'process.env':{
            NODE_ENV:isDev ? '"development"' : '"production"'
        }
      }
    ),
    new HTMLPlugin(),

  ],
  module: {
    rules: [
      {
        test:/\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.jsx$/,
        use:[
          'babel-loader',
        ]
      },
      {
        test: /\.styl/,
        use:[
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              sourceMap:true,
            }
          },
          'stylus-loader',
        ]
      },
      {
        test:/\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit:1024,
            name:'[name].[ext]'
          }
        }]
      }
    ]
  }
}


if(isDev){
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port:'8000',
    host:'0.0.0.0',
    overlay:{
      errors:true,
    },
    hot:true,
   /* historyFallback:{

    },*/
    //可以自动打开浏览器
    /*open:true,*/
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
