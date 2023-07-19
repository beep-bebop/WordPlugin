import { Ref } from 'vue'

export const insertResult = (
  result: Ref<string>,
  insertType: Ref<string>
) => {
  const paragraph = result.value.split('\n')
  Word.run(async (context) => {
    const range = context.document.getSelection()
    range.insertText(paragraph[0], insertType.value === 'replace' ? 'Replace' : 'End')
    for (let i = paragraph.length - 1; i > 0; i--) {
      range.insertParagraph(paragraph[i], 'After')
    }
    await context.sync()
  })
}

// export default {
//   insertResult
// }
