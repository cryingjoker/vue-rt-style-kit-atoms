const fs = require('fs')
const path = require('path')
const stylus = require('stylus')

const utils = stylus.utils

module.exports = function() {
  return function(style) {
    style.define('getCalc', function(a, b, c, d) {
      const x1 = a.val
      const y1 = b.val
      const x2 = c.val
      const y2 = d.val
      const deltax = x2 - x1
      const deltay = y2 - y1
      a = deltax
      b = deltay
      c = deltax * y1 - deltay * x1
      let res = '(' + b + '* 100vw'
      if (c > 0) {
        res = res + '+ '
      } else {
        res = res + '- '
      }
      c = Math.abs(c)
      res = res + c + 'px'
      res = res + ')/' + a
      return utils.parseString('calc(' + res + ')')
    })
  
    style.define('callconstiable', function(name) {
      const val = options[name.val]
      switch (typeof val) {
        case 'boolean':
          return new nodes.Boolean(val)
        case 'number':
          return new nodes.Unit(val)
        case 'string':
        default:
          return new nodes.String(val)
      }
    })
    
    style.define('readJsonKeys', function(jsonPath) {
      const filepath = path.join(jsonPath.filename, jsonPath.val)
      const content = fs.readFileSync(filepath)
      return Object.keys(JSON.parse(content.toString()))
    })
    
    style.define('replace', function(a,b,c) {
      return a.val.replace(b.val, c.val)
    })
    
    style.define('search', function(a,b) {
      if(!a.val)
        return - 1
      return a.val.search(b.val)
    })
    
    style.define('parseInt', function(a){
      if(a.val){
        return parseInt(a.val)
      }
    })
  }
}
