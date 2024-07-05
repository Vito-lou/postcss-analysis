'use strict'

let CssSyntaxError = require('./css-syntax-error')
let Declaration = require('./declaration')
let LazyResult = require('./lazy-result')
let Container = require('./container')
let Processor = require('./processor')
let stringify = require('./stringify')
let fromJSON = require('./fromJSON')
let Document = require('./document')
let Warning = require('./warning')
let Comment = require('./comment')
let AtRule = require('./at-rule')
let Result = require('./result.js')
let Input = require('./input')
let parse = require('./parse')
let list = require('./list')
let Rule = require('./rule')
let Root = require('./root')
let Node = require('./node')

function postcss(...plugins) {
  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0]
  }
  return new Processor(plugins)
}

postcss.plugin = function plugin(name, initializer) {
  let warningPrinted = false
  function creator(...args) {
    // eslint-disable-next-line no-console
    if (console && console.warn && !warningPrinted) {
      warningPrinted = true
      // eslint-disable-next-line no-console
      console.warn(
        name +
        ': postcss.plugin was deprecated. Migration guide:\n' +
        'https://evilmartians.com/chronicles/postcss-8-plugin-migration'
      )
      if (process.env.LANG && process.env.LANG.startsWith('cn')) {
        /* c8 ignore next 7 */
        // eslint-disable-next-line no-console
        console.warn(
          name +
          ': 里面 postcss.plugin 被弃用. 迁移指南:\n' +
          'https://www.w3ctech.com/topic/2226'
        )
      }
    }
    let transformer = initializer(...args)
    transformer.postcssPlugin = name
    transformer.postcssVersion = new Processor().version
    return transformer
  }

  let cache
  Object.defineProperty(creator, 'postcss', {
    get() {
      if (!cache) cache = creator()
      return cache
    }
  })

  creator.process = function (css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts)
  }

  return creator
}

postcss.stringify = stringify
postcss.parse = parse
postcss.fromJSON = fromJSON
postcss.list = list

postcss.comment = defaults => new Comment(defaults)
postcss.atRule = defaults => new AtRule(defaults)
postcss.decl = defaults => new Declaration(defaults)
postcss.rule = defaults => new Rule(defaults)
postcss.root = defaults => new Root(defaults)
postcss.document = defaults => new Document(defaults)

postcss.CssSyntaxError = CssSyntaxError
postcss.Declaration = Declaration
postcss.Container = Container
postcss.Processor = Processor
postcss.Document = Document
postcss.Comment = Comment
postcss.Warning = Warning
postcss.AtRule = AtRule
postcss.Result = Result
postcss.Input = Input
postcss.Rule = Rule
postcss.Root = Root
postcss.Node = Node

LazyResult.registerPostcss(postcss)

//commonjs standard way to export stuff; we can use require('postcss') to use this module
module.exports = postcss
// to support es6 module system.we can use import postcss from 'postcss' to use this module.
// In the ES6 module system, the import statement looks for the default export of a module by default. This design is intended to simplify the usage of default exports, making the code cleaner and more intuitive.
//For example, if you have a module myModule.js and you want other modules to be able to import it using import myModule from 'myModule', you need to set the default export in myModule.js:
//export default function myModule(){}
postcss.default = postcss
