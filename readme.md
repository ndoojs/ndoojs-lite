#ndoojs lite
ndoojs lite是[ndoojs](http://github.com/ndoojs/ndoojs)的前身，最初被应用在移动平台等业务简单、性能要求高的场景。当前版本最小体积约1.5KB(minify and gzip)。

## 示例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <title>index</title>
  </head>
  <body>
    <p>index</p>
    <div id="scriptArea" data-page-id="home/index" class="Ldn"></div>
    <script src="../../lib/jquery-2.1.4.min.js"></script>
    <script src="../../js/ndoo_all.js"></script>
    <script>
      (function() {
        var $, _n;
        $ = this['jQuery'] || this['Zepto'];
        _n = this.ndoo;
        _n.app('home', {
          indexAction: function() {
            return $('#container').html('hello ndoojs!');
          }
        });
        _n.init();
      }).call(this);
    </script>
  </body>
</html>
```

参见 docs/example/index.html

# api 参考
- [main](#main)
  - [ndoo.app](#ndoo_app)
  - [ndoo.init](#ndoo_init)
- [event](#event)
  - [ndoo.on](#event_on)
  - [ndoo.trigger](#event_trigger)
  - [ndoo.off](#event_off)
- [util](#util)
  - [ndoo.stroage](#ndoo_storage)
  - [ndoo.getPk](#ndoo_getpk)
  - [ndoo.hook](#ndoo_hook)
  - [ndoo.delayRun](#ndoo_delayRun)
- [namespace](#namespace)
  - [ndoo.func](#ndoo_func)
  - [ndoo.vars](#ndoo_vars)

<a name="main"></a>
## main

<a name="ndoo_app"></a>
### ndoo.app(string:name, object:controller)
添加一个指定的控制器

Example:

```javascript
ndoo.app('home', {
  indexAction: function() {
    return $('#container').html('hello ndoojs!');
  }
});
```

<a name="ndoo_init"></a>
### ndoo.init([string:id])
初始化

Example:

```javascript
ndoo.init();
```

<a name="event"></a>
## event

<a name="event_on"></a>
### ndoo.on(string:event, function:callback)
侦听指定事件 

Example:

```javascript
ndoo.on('test', function() {
  console.log('test event');
});
```

<a name="event_trigger"></a>
### ndoo.trigger(string:event [, data...])
触发指定事件

Example:

```javascript
ndoo.trigger('test');
// output 'test event'
```

<a name="event_off"></a>
### ndoo.off(string:event)
移除指定事件

Example:

```javascript
ndoo.off('test');
```

<a name="util"></a>
## util

<a name="ndoo_storage"></a>
### ndoo.storage(string:key, any:value, const:option)
带读取控制的变量暂存

Example:

```javascript
// alias _stor
var _stor = ndoo.storage;
// set abc vlaue 1
_stor('abc', 1); // 1
// set abc value 2 failed
_stor('abc', 2); // false
// set abc value 2
_stor('abc', 2, _stor.REWRITE); // 2
// delete abc
_stor('abc', null, _stor.DESTROY); // true
```

<a name="ndoo_getpk"></a>
### ndoo.getPk([string:prefix])
取得一个唯一的主键

Example:

```javascript
ndoo.getPk();
// "1444489955351"
ndoo.getPk('myPrefix_');
// "myPrefix_1444489955352"
```

<a name="ndoo_hook"></a>
### ndoo.hook(string:hookName, function:callback, boolean:isOverwrite) *Deprecated
设置&触发一个勾子(老API不推荐使用，使用on/trigger替代)

```javascript
ndoo.hook('test', function() {
  console.log('test');
});
ndoo.hook('test');
// output 'test'

ndoo.hook('test', function() {
  console.log('test2');
}, true);
ndoo.hook('test')
// output 'test2'
```

<a name="ndoo_delayRun"></a>
### ndoo.delayRun(const:level, function:fn); *Deprecated
添加一个延迟函数（老API不推荐使用，使用on/trigger替代）

```javascript
ndoo.delayRun(ndoo.PAGE_DOM, function() {
  console.log('Dom Content is Loaded');
});
```

<a name="namespace"></a>
## namespace

<a name="ndoo_func"></a>
### ndoo.func
函数名称空间，用来存放一些自定义函数。

```javascript
ndoo.func.add = function (a, b) {
    return a + b;
}

ndoo.func.add(1, 2);
```

<a name="ndoo_vars"></a>
### ndoo.vars
变量名称空间，用来存放一些参数及配置。

```javascript

ndoo.vars.productListUrl = '/product/list';

$.ajax(ndoo.vars.productListUrl, ...);

```