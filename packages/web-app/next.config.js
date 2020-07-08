const path = require('path')
const fs = require('fs')
const _ = require('lodash')

// Tell webpack to compile the "bar" package, necessary if you're using the export statement for example
// https://www.npmjs.com/package/next-transpile-modules
const withTM = require('next-transpile-modules')([
  'bar',
  'a',
  'b',
  'commonjs',
])

module.exports = withTM({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // BTW, webpack already provide accesses to official plugins - plugin list: https://webpack.js.org/plugins/
    // Community plugin list: https://github.com/webpack-contrib/awesome-webpack#webpack-plugins

    if (dev) {
      // hot reload when any 'dist' folder is updated inside monorepo
      const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin')
      const projectRootAbsPath = path.join(__dirname, '../../')
      const dirs = findDirs(projectRootAbsPath, [/dist$/], [/node_modules/, /\./])
      config.plugins.push(new ExtraWatchWebpackPlugin({dirs}))
    }
    return config
  },
})

function findDirs(rootAbsPath, target_regex_array, exclude_regex_array) {
  return getNestedDirs(rootAbsPath, exclude_regex_array)
    .filter(dir => _.some(target_regex_array.map(regex => dir.match(regex))))
}

function getNestedDirs(dir, exclude_regex_array=[]) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach((relativePath) => {
    const shouldExclude = _.some(exclude_regex_array.map(regex => relativePath.match(regex)))
    const absPath = path.join(dir, relativePath)
    const stat = fs.statSync(absPath)
    if (shouldExclude) {
      // do nothing
    } else if (stat && stat.isDirectory()) {
      results.push(absPath)
      results = results.concat(getNestedDirs(absPath, exclude_regex_array))
    } else {
      // this is a file, do nothing
    }
  })
  return results
}
