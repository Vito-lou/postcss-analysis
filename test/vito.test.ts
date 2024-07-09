// @ts-ignore type definitions for nanodelay@1 are wrong.
import { delay } from 'nanodelay'
import { restoreAll, spyOn } from 'nanospy'
import { resolve as pathResolve } from 'path'
import { test } from 'uvu'
import { equal, instance, is, match, not, throws, type } from 'uvu/assert'

import CssSyntaxError from '../lib/css-syntax-error.js'
import LazyResult from '../lib/lazy-result.js'
import NoWorkResult from '../lib/no-work-result.js'
import postcss, {
  Document,
  Node,
  parse,
  Parser,
  Plugin,
  PluginCreator,
  Result,
  Root,
  Stringifier
} from '../lib/postcss.js'
import Processor from '../lib/processor.js'
import Rule from '../lib/rule.js'

let processor = new Processor()

test.after.each(() => {
  restoreAll()
})

test('uses custom syntax for document', async () => {
  let customParser: Parser<Document> = () => {
    return new Document({
      nodes: [
        new Root({
          nodes: [new Rule({ selector: 'a' })],
          raws: {
            after: '\n\n\n',
            codeBefore: '<html>\n<head>\n<style id="id1">'
          }
        }),
        new Root({
          nodes: [new Rule({ selector: 'b' })],
          raws: {
            after: '\n',
            codeAfter: '</style>\n</head>',
            codeBefore: '</style>\n<style id="id2">'
          }
        })
      ]
    })
  }

  let customStringifier: Stringifier = (doc, builder) => {
    if (doc.type === 'document') {
      for (let root of doc.nodes) {
        if (root.raws.codeBefore) {
          builder(root.raws.codeBefore, root)
        }

        builder(root.toString(), root)

        if (root.raws.codeAfter) {
          builder(root.raws.codeAfter, root)
        }
      }
    }
  }

  let processor = new Processor([() => {}])
  let result = await processor.process('a{}', {
    from: undefined,
    syntax: {
      parse: customParser,
      stringify: customStringifier
    }
  })
  is(
    result.css,
    '<html>\n<head>\n<style id="id1">' +
      'a {}\n\n\n' +
      '</style>\n<style id="id2">' +
      'b {}\n' +
      '</style>\n</head>'
  )
})

test('stringifies css', () => {
  let result = new LazyResult(processor, 'a {}', {})
  is(`${result}`, result.css)
})
test.run()
