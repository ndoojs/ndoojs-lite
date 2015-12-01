// Karma configuration
// Generated on Tue Nov 24 2015 23:07:52 GMT+0800 (CST)

var jsPath = '../js'

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-spies', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      '../node_modules/phantomjs-polyfill/bind-polyfill.js',
      'mock/jquery.mock.js',
      jsPath+'/ndoo_all.js',
      'tool/ndoo_reset.js',
      'unit/*Spec.ls'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*.ls" : "live"
    },

    livePreprocessor: {
      // options passed to the live compiler
      options: {
        bare: true
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.js$/, '.ls');
      }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
