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
    <script src="js/app.js"></script>
    <script>ndoo.init()</script>
  </body>
</html>
```

参见 docs/example/index.html