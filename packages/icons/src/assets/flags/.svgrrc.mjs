const MARK = '\0'

const scopedText = (name, value) => {
  if (name === 'id') return MARK + value
  if ((name === 'href' || name === 'xlinkHref') && value.startsWith('#')) return '#' + MARK + value.slice(1)
  if (value.includes('url(#')) return value.replaceAll('url(#', 'url(#' + MARK)

  return undefined
}

const scopeIds = ({ types }) => ({
  visitor: {
    JSXAttribute(path) {
      const { name, value } = path.node
      if (!types.isJSXIdentifier(name) || !types.isStringLiteral(value)) return

      const text = scopedText(name.name, value.value)
      if (text === undefined) return

      const pieces = text.split(MARK)
      const quasis = pieces.map((raw, index) => types.templateElement({ raw, cooked: raw }, index === pieces.length - 1))
      const expressions = pieces.slice(1).map(() => types.identifier('uid'))
      path.node.value = types.jsxExpressionContainer(types.templateLiteral(quasis, expressions))
    },
  },
})

const template = (variables, { tpl }) => tpl`
${variables.imports};
import { useId } from 'react';
${variables.interfaces};
const ${variables.componentName} = (${variables.props}) => {
  const uid = useId();
  return ${variables.jsx};
};
${variables.exports};
`

export default {
  template,
  jsx: { babelConfig: { plugins: [scopeIds] } },
}
