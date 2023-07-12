<template>
  <div>
    <!-- 内容创作 -->
    <el-divider border-style="dashed">
      内容创作
    </el-divider>
    <el-button-group>
      <el-button
        type="primary"
        @click="makeTitle"
      >
        拟标题
      </el-button>
      <el-button
        type="primary"
        @click="outline"
      >
        大纲
      </el-button>
      <el-button
        type="primary"
        @click="inspire"
      >
        灵感
      </el-button>
      <el-button
        type="primary"
        @click="summarize"
      >
        摘要
      </el-button>
    </el-button-group>
    <el-divider border-style="dashed">
      内容修改
    </el-divider>
    <!-- 内容修改 -->
    <el-row justify="center">
      <el-button-group>
        <el-button
          type="primary"
          @click="polish"
        >
          润色
        </el-button>
        <el-button
          type="primary"
          @click="continueWriting"
        >
          续写
        </el-button>
        <el-button
          type="primary"
          @click="expand"
        >
          扩展内容
        </el-button>
      </el-button-group>
    </el-row>
    <el-row style="margin-top:10px">
      <el-button
        type="primary"
        @click="translate"
      >
        翻译成
      </el-button>
      <el-select
        v-model="translateLanguage"
        placeholder="选择翻译语言"
        @change="handleTranslateLangChange"
      >
        <el-option
          v-for="item in translatelangList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-row>
    <el-divider border-style="dashed">
      内部知识检索
    </el-divider>
    <!-- 知识检索 -->
    <el-input
      v-model="searchText"
      placeholder="输入想要从内部知识库检索的内容"
    >
      <template #append>
        <el-button icon="el-icon-search" />
      </template>
    </el-input>
    <!-- 结果预览 -->
    <el-divider
      border-style="dashed"
    />
    <div
      style="width: 100%"
    >
      <el-progress
        v-if="loading"
        :percentage="50"
        indeterminate
        :duration="5"
        status="warning"
      />
    </div>
    <el-input
      v-model="previewText"
      type="textarea"
      :autosize="{ minRows: 5, maxRows: 20}"
      placeholder="结果预览"
    />
    <el-row
      justify="center"
      style="margin-top: 10px;"
    >
      <el-button-group>
        <el-button
          type="primary"
          @click="handleInsertClicked"
        >
          插入到文档
        </el-button>
        <el-button
          type="primary"
          @click="handleCopyClicked"
        >
          复制到剪切板
        </el-button>
        <el-button
          type="primary"
          @click="settings"
        >
          设置
        </el-button>
      </el-button-group>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import API from '@/api'
import {
  localStorageKey,
  buildInPrompt
} from '@/utils/constant'

const {
  replyLanguage: replyLanguageKey,
  localLanguage: localLanguageKey,
  translateLang: translateLanguageKey,
  apiKey: apiKeyKey,
  temperature: temperatureKey,
  maxTokens: maxTokensKey,
  model: modelKey,
  basePath: basePathKey,
  insertType: insertTypeKey
} = localStorageKey

// 变量定义
const apiKey = ref('')
const localLanguage = ref('en')
const replyLanguage = ref('English')
const translateLanguage = ref('English')
const temperature = ref(0.7)
const maxTokens = ref(800)
const model = ref('gpt-3.5-turbo')
const basePath = ref('')
const previewText = ref('')
const loading = ref(false)
const router = useRouter()
const historyDialog = ref<any[]>([])
const errorIssue = ref(false)
const insertType = ref('replace')

const translatelangList = [
  {
    label: '英语',
    value: 'English'
  },
  {
    label: '中文',
    value: 'Chinese'
  }
]

// 切换回复语言的回调函数
function handleTranslateLangChange (val: string) {
  translateLanguage.value = val
  localStorage.setItem(translateLanguageKey, val)
}

// 在组件挂载之前执行的逻辑
onBeforeMount(async () => {
  // 从本地存储中获取设置的值，如果不存在则使用默认值
  replyLanguage.value = localStorage.getItem(replyLanguageKey) || 'English'
  localLanguage.value = localStorage.getItem(localLanguageKey) || 'en'
  apiKey.value = localStorage.getItem(apiKeyKey) || ''
  temperature.value = Number(localStorage.getItem(temperatureKey)) || 0.7
  maxTokens.value = Number(localStorage.getItem(maxTokensKey)) || 800
  model.value = localStorage.getItem(modelKey) || 'gpt-3.5-turbo'
  basePath.value = localStorage.getItem(basePathKey) || ''
  insertType.value = localStorage.getItem(insertTypeKey) || 'replace'
})

const getSelectedText = async () => {
  return Word.run(async (context) => {
    const range = context.document.getSelection()
    range.load('text')
    await context.sync()
    return range.text
  })
}

// 模板方法，用于生成对话的系统消息和用户消息
async function template (taskType: keyof typeof buildInPrompt) {
  // 获取选中的文本
  const selectedText = await getSelectedText()
  if (selectedText === '') {
    ElMessage.warning('未选中任何文本')
    return
  }
  loading.value = true
  // 根据任务类型生成系统消息和用户消息
  if (taskType === 'translate') {
    replyLanguage.value = translateLanguage.value
  }
  const systemMessage = buildInPrompt[taskType].system(replyLanguage.value)
  const userMessage = buildInPrompt[taskType].user(selectedText, replyLanguage.value)

  if (!apiKey.value) {
    ElMessage.error('Set API Key or Access Token first')
    return
  }

  // 创建配置对象
  const config = API.official.setConfig(apiKey.value, basePath.value)

  // 构建对话历史
  historyDialog.value = [
    { role: 'system', content: systemMessage },
    { role: 'user', content: userMessage }
  ]

  try {
    // 调用API方法进行聊天交互
    await API.official.createChatCompletionStream(
      config,
      historyDialog.value,
      previewText,
      historyDialog,
      errorIssue,
      loading,
      maxTokens.value,
      temperature.value,
      model.value
    )
  } catch (error) {
    previewText.value = String(error)
    errorIssue.value = true
    console.error(error)
  }

  if (errorIssue.value) {
    ElMessage.error('Something is wrong')
  }
}

// 检查API Key是否存在的方法
function checkApiKey () {
  if (!apiKey.value) {
    ElMessage.error('Set API Key or Access Token first')
    return false
  }
  return true
}

// 调用模板方法进行续写
async function makeTitle () {
  if (!checkApiKey()) return
  template('maketitle')
}

// 调用模板方法进行大纲撰写
async function outline () {
  if (!checkApiKey()) return
  template('outline')
}

// 调用模板方法列出可能用到的素材
async function inspire () {
  if (!checkApiKey()) return
  template('inspire')
}

// 调用模板方法进行摘要生成
async function summarize () {
  if (!checkApiKey()) return
  template('summary')
}

// 调用模板方法进行文稿润色
async function polish () {
  if (!checkApiKey()) return
  template('polish')
}

// 调用模板方法进行翻译
async function translate () {
  if (!checkApiKey()) return
  template('translate')
}

// 调用模板方法进行续写
async function continueWriting () {
  if (!checkApiKey()) return
  template('continuewriting')
}

// 调用模板方法进行续写
async function expand () {
  if (!checkApiKey()) return
  template('expand')
}

async function handleInsertClicked () {
  API.common.insertResult(previewText, 'end')
}

async function handleCopyClicked () {
  if (previewText.value === '') {
    ElMessage.warning('结果为空，未复制到剪切板')
  } else {
    try {
      await navigator.clipboard.writeText(previewText.value)
      ElMessage.success('已复制到剪切板')
    } catch (error) {
      ElMessage.error('复制失败')
      console.error(error)
    }
  }
}

// 跳转到设置页面
async function settings () {
  router.push('/settings')
}
</script>
