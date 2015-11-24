(function() {
  var fn = function (select) {
    return new (
      Function.bind.apply(
        fn.init,
        [null].concat(
          [].slice.call(arguments, 0)
        )
      )
    );
    // return new fn.init(select);
  }
  fn.init = function (args) {
    if (arguments == '[data-nblock-id]') {
      this.length = 0;
    }
    if (typeof args == 'object' && args.constructor == Function || typeof args  == 'function') {
      args();
    }

    this.data = function(key) {
      if (key === 'pageId') {
        return 'home/index';
      }
    }
    this.bind = function(event, call) {
      if (event == 'load') {
        call()
      }
    }
  }

  fn.extend = function (handler, object) {
    for (var key in object) {
      handler[key] = object[key];
    }
    return handler;
  }

  this.jQuery = this.$ = fn;
}).call(this);

/* vim: se sw=2 ts=2 sts=2 fdm=marker et: */
