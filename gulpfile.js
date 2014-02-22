var path = require("path")
  , gulp = require("gulp")
  , open = require("open")
  , express = require("express")
  , livereload_server = require("tiny-lr")
  , livereload_gulp = require("gulp-livereload")
  , livereload_connect = require("connect-livereload");

/* config parameters */
var config = {
  serve: {
    port: 9000,
    dir: path.join(__dirname, "app/")
  },
  livereload: {
    port: 35733,
    path: "app/**"
  }
};

/*
 Utilities related to starting/running our own livereload server,
 and when files change (via gulp.watch) triggering the appropriate reload event
 */
var watcher = (function () {
  var liveReloadServer = null;
  return {
    start: function () {
      if (liveReloadServer)
        return;
      liveReloadServer = livereload_server();
      liveReloadServer.listen(config.livereload.port);
    },
    notify: function (event) {
      gulp.src(event.path, {read: false})
        .pipe(livereload_gulp(liveReloadServer));
    }
  };
})();

/*
 Utilities related to creating a simple Express server
 We use connect-livereload middleware to automatically inject
 the livereload <script> tag
 */
var server = (function () {
  var expressApp = null;
  return {
    start: function () {
      expressApp = express();
      expressApp.use(express.logger("dev"))
      expressApp.use(livereload_connect({port: config.livereload.port}));
      expressApp.use(express.static(config.serve.dir));
      expressApp.listen(config.serve.port);
    }
  };
})();

//gulp task which autobuilds changed files
//and then triggers a livereload
gulp.task("watch", function () {
  watcher.start();
  //when HTML files change, reload them
  gulp.watch(config.livereload.path, watcher.notify);
})

//a simple task to serve the directory on localhost:9000
//this automatically injects the livereload code (yay!)
gulp.task("serve", function () {
  server.start();
});


//launches in the browser
gulp.task("browse", function () {
  open("http://localhost:" + config.serve.port);
});

//by default, we transform everything and live-serve it
gulp.task("default", ["watch", "serve", "browse"]);
