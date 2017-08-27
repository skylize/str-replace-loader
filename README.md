
# str-replace-loader

A simple webpack 2 compatible loader to pass a file through `String.prototype.replace` for string or regular expression replacement.

---
##### Options

`match` : {String} or {RegExp}, the first parameter to `String.replace()`.

`replace` : {String} or {Function}, the second parameter to `String.replace()`

##### Note
This loader intentionally does no internal processing of options. No bells and whistles, no magic, no random parameters. Just `String.prototype.replace()` piped into your loader chain as transparently as possible. Pass in the same values for options as you would pass as parameters into `String.replace`.

For example, if using regex and need a flag, append it to the expression yourself as part of your valid regex such as `/IgnOre-Case/i`.

See [MDN String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) and [webpack Loaders](https://webpack.js.org/concepts/loaders/) for  more info.

##### Examples:
```javascript

module.exports = {

  modules: {
    rules: [


      /*********************************************************
       * Example 1: Replace blue with hotpink in all css files *
       *  using webpack 1 style inline query.                  *
       *                                                       *
       * Inlining works only if both parameters are strings    *
       *********************************************************/

      {
        test: /\.css$/,
        use: "style!css!replace?match=blue&replace=hotpink"
      },



      /*************************************************************
       * Example 2: Bump version number in a manifest file using   *
       *  both regex match and replacement function.               *
       *                                                           *
       * Need to use webpack 2+ syntax with options object to pass *
       *  native js. (This syntax also works for strings.)         *
       ************************************************************/

      {
        test: /manifest\.json$/,
        //
        use: [
          'file-loader?name=manifest.json',
          'json-loader',
          {
            loader: 'replace-loader',
            options: {
              // example result: `"version": "3.23.5"`
              match: /"version":\s*"(\d+)\.(\d+)\.(\d+)"/g ,
              // use replace function instead of string
              replace: (match, major, minor, patch)=>
                `"version": "${major}.${minor}.${ +patch++ }"`
            }
          }
        ],
      }


    ],
  }
}
```
