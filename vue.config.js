const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> a0f1917e28b427186037271adbe2150e5ca63d64
