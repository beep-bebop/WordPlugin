import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai'
import { Ref } from 'vue'

function setConfig (apiKey: string, basePath?: string): Configuration {
  const config = new Configuration({ apiKey, basePath })
  delete config.baseOptions.headers['User-Agent']
  return config
}

async function createChatCompletionStream (
  config: Configuration,
  messages: any[],
  result: Ref<string>,
  historyDialog: Ref<any[]>,
  errorIssue: Ref<boolean>,
  loading: Ref<boolean>,
  maxTokens?: number,
  temperature?: number,
  model?: string
): Promise<void> {
  const openai = new OpenAIApi(config)
  const requestConfig: CreateChatCompletionRequest = {
    model: model ?? 'gpt-3.5-turbo',
    messages,
    temperature: temperature ?? 0.7,
    max_tokens: maxTokens ?? 800
  }
  let response
  let data
  try {
    response = await openai.createChatCompletion(requestConfig)
    data = response.data
    if (response.status === 200) {
      result.value = data.choices[0].message?.content?.replace(/\\n/g, '\n') ?? ''
      historyDialog.value.push({
        role: 'assistant',
        content: result.value
      })
    } else {
      result.value = response.statusText?.toString() ?? 'error'
      errorIssue.value = true
    }
  } catch (error) {
    result.value = String(error)
    errorIssue.value = true
    console.error(error)
  }
  loading.value = false
}

export default {
  setConfig,
  createChatCompletionStream
}
