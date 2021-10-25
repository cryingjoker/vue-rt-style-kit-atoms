/**
 * Скрипт подключает необходимые для CSS, Stylus загрузчиков либы и переменные
 * @see https://cli.vuejs.org/guide/css.html#referencing-assets
 */
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  stylus: {
    use: [
      require('nib')(),
      require(resolve('./plugins/index.cjs'))(),
    ],
    import: [
      '~nib/lib/nib/index.styl',
      resolve('./config.styl')
    ],
  }
}
