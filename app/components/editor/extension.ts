import { defineBasicExtension } from 'prosekit/basic'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineHeading } from 'prosekit/extensions/heading'

export function defineExtension() {

  return union([
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Please type your comment text！ ' }),
    // defineBaseKeymap(),
    // defineDoc(),
    // defineText(),
    // defineParagraph(),
    // defineHeading(),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>

function defineNode(arg0: { name: string; }) {
  throw new Error('Function not implemented.');
}
