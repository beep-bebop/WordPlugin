import { IStringKeyMap } from '../types'

export const languageMap: IStringKeyMap = {
  en: 'English',
  'zh-cn': '简体中文'
  // 'zh-tw': '繁體中文'
}

// Openai API 可用的模型
// export const availableModels: IStringKeyMap = {
//   'gpt-3.5': 'gpt-3.5-turbo',
//   'gpt-3.5-0613': 'gpt-3.5-turbo-0613',
//   'gpt-3.5-16k': 'gpt-3.5-turbo-16k',
//   'gpt-3.5-16k-0613': 'gpt-3.5-turbo-16k-0613',
//   'text-davinci-003': 'text-davinci-003'
// }

export enum localStorageKey {
  // common
  api = 'api',
  localLanguage = 'localLanguage',
  replyLanguage = 'replyLanguage',
  translateLanguage = 'translateLanguage',
  insertType = 'insertType',
  // official api
  apiKey = 'apiKey',
  model = 'model',
  temperature = 'temperature',
  maxTokens = 'maxTokens',
  basePath = 'basePath',
}

export const buildInPrompt = {
  maketitle: {
    system: (language: string) => `Act as a title generator for written pieces, Reply in ${language}`,
    user: (text: string, language: string) => `
    I will provide you with the topic or key words or content of an article, 
    and you will generate five candidate titles. 
    Please keep the title concise and under 20 words, 
    and ensure that the meaning is maintained. Reply in ${language}.     
    Please begin by editing the following text: ${text}`
  },
  outline: {
    system: (language: string) => `As a writing  assistant, Reply in ${language}`,
    user: (text: string, language: string) => `Please provide an outline based on the provided keywords, concepts, or content, 
    numbering it in the order of primary and secondary headings.
    Reply in ${language} Please begin by the following text: ${text}`
  },
  inspire: {
    system: (language: string) => `As a writing  assistant, Reply in ${language}`,
    user: (text: string, language: string) => `Generate a list of facts, statistics and related works related to ${text}. 
    Respond in ${language}.`
  },
  summary: {
    system: (language: string) => `As a summarization assistant, Reply in ${language}`,
    user: (text: string, language: string) => `Summarize the following text into 100 words,
    making it easy to read and comprehend. The summary should be concise, clear,
    and capture the main points of the text. Avoid using complex sentence structures or technical jargon.
    Respond in ${language}. Please begin by editing the following text: ${text}`
  },
  polish: {
    system: (language: string) => `As a writing improvement assistant, Reply in ${language}`,
    user: (text: string, language: string) => `Improve the spelling, grammar, clarity, concision,
    and overall readability of the text provided, while breaking down long sentences, reducing repetition,
    and providing suggestions for improvement.
    Please provide only the corrected ${language} version of the text and avoid including explanations.
    Please begin by editing the following text: ${text}`
  },
  continueWriting: {
    system: (language: string) => `As a writing assistant, Reply in ${language}`,
    user: (text: string, language: string) => `Continue writing an article in ${language} that begins with the following text: ${text}.
    please keep the meaning coherent.
    `
  },
  expand: {
    system: (language: string) => `As a writing assistant, Reply in ${language}`,
    user: (text: string, language: string) => `"Please enrich the following content by expanding it through the addition of explanations, 
    examples, evidence, or data, while maintaining the original meaning of the content.
    please begin by the following ${text}, respond in ${language}`
  },
  translate: {
    system: (language: string) => `Act as an ${language} translator, spelling corrector and improver.`,
    user: (text: string, language: string) => `I will speak to you in any language and you will detect the language,
    translate it and answer in the corrected and improved version of my text, in ${language}.
    I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, 
    upper level ${language} words and sentences.
    Keep the meaning same, but make them more literary.
    I want you to only reply the correction, the improvements and nothing else, do not write explanations.
    Reply in ${language}.
    My first sentence is: ${text}`
  }
}
