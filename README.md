## 简介

使用 FastAPI 对接语言模型的 Word 插件。它允许你基于你在文档中写的内容生成文本。你可以使用它来翻译、总结、润色或者从零开始写一篇文章。

![src\assets\1.gif](src/assets/1.gif)

## 功能

- 支持本地模型
- 支持OpenAI官方API和Azure OpenAI API
- 内置用于翻译、总结、润色和学术写作的提示
- 支持多种语言
- 可以自定义提示并保存以供将来使用
- 允许用户设置temperature和max tokens
- 支持代理

## 后端服务

可以使用[LangChainChatChat](https://github.com/chatchat-space/Langchain-Chatchat)作为后端服务，它是一个基于fastAPI的服务，可以使用本地模型或者Azure OpenAI API。

教程参考[启动API服务](https://github.com/chatchat-space/Langchain-Chatchat/blob/master/docs/%E5%90%AF%E5%8A%A8API%E6%9C%8D%E5%8A%A1.md)。
