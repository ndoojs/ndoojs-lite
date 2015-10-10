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
- [event](#event)
  - [ndoo.on](#event_on)
  - [ndoo.trigger](#event_trigger)
  - [ndoo.off](#event_off)

<a name="event"/>
## event

<a name="event_on"/>
### ndoo.on(string:event, function:callback)
侦听指定事件 

Example:

```javascript
ndoo.on('test', function() {
  console.log('test event');
});
```

<a name="event_trigger"/>
### ndoo.trigger(string:event [, data...])
触发指定事件

Example:

```javascript
ndoo.trigger('test');
// output 'test event'
```

<a name="event_off"/>
### ndoo.off(string:event)
移除指定事件

Example:

```javascript
ndoo.off('test');
```

