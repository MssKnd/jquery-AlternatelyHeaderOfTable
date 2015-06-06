# Alternately Header of Table
This is jQuery Plug-in.  
[Demo](https://dl.dropboxusercontent.com/u/7495257/AlternatelyHeaderOfTable/index.html)  
Instruction(Japanese)  
[Qiita](http://qiita.com/OUIEA/items/2bf51a393a46773cea48)  
## How to Use
```html
<table>
  <tbody class="header">
    <tr>
     ...
    </tr>
  </tbody>
  <tbody>
    <tr>
      ...
    </tr>
  </tbody>
  <tbody class="header">
    <tr>
      ...
    </tr>
  </tbody>
  <tbody>
    <tr>
      ...
    </tr>
  </tbody>
</table>
```

```js
$("table tbody.header").AlternatelyHeaderOfTable();
```