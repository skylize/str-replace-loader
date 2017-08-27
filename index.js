
var querystring = require('querystring')

module.exports = function strReplaceLoader(source) {
  this.cacheable()

  var query = (typeof this.query === 'string')
    ? querystring.parse(this.query.substring(1))
    : this.query

  if ( !query.match
    || ( typeof query.match !== 'string'
      && !(query.match instanceof RegExp)
    )
  ) throw ('* str-replace-loader * missing or invalid option. `match` must be [String] or [RegExp]')

  if ( !query.replace
    || ( typeof query.replace !== 'string'
      && typeof query.replace !== 'function'
    )
  ) throw ('* str-replace-loader * missing or invalid option. `replace` must be [String] or [Function]')

  return source.toString()
    .replace(query.match, query.replace)
}
