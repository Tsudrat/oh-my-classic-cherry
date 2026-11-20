export default {
  meta: { name: 'i18n' },
  rules: {
    'no-template-in-t': {
      meta: {
        type: 'problem',
        docs: { description: '不建议在 t() 函数中使用模板字符串' },
        messages: { noTemplateInT: '不建议在 t() 函数中使用模板字符串，这样会导致渲染结果不可预料' }
      },
      create(context) {
        return {
          CallExpression(node) {
            const { callee, arguments: args } = node
            const isTFunction =
              (callee.type === 'Identifier' && callee.name === 't') ||
              (callee.type === 'MemberExpression' &&
                callee.property.type === 'Identifier' &&
                callee.property.name === 't')
            if (isTFunction && args[0]?.type === 'TemplateLiteral') {
              context.report({ node: args[0], messageId: 'noTemplateInT' })
            }
          }
        }
      }
    }
  }
}
