<template>
  <div>
    <el-input
      v-model="url"
      clearable
      size="small"
      :placeholder="$t('homeSystemDescription')"
    />
    <el-input
      v-model="input"
      type="textarea"
      :autosize="{ minRows: 6, maxRows: 10 }"
      placeholder="Enter your input hey="
    />
    <el-button
      type="primary"
      @click="template()"
    >
      GET
    </el-button>
    <el-button
      type="primary"
      @click="sendRequest()"
    >
      POST
    </el-button>
    <el-button
      type="primary"
      @click="backToHome()"
    >
      Back
    </el-button>
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
      v-model="output"
      type="textarea"
      :autosize="{ minRows: 6, maxRows: 10 }"
      placeholder="Output will appear here"
      readonly
    />
  </div>
</template>

<!-- <script>
export default {
  data() {
    return {
      input: '',
      output: ''
    }
  },
  methods: {
    sendRequest(method) {
      // Make your GET/POST request here using the input data
      // and update the output data with the response
      this.output = `You made a ${method} request with input: ${this.input}`
    }
  }
}
</script> -->

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { languageMap, availableModels, localStorageKey, availableModelsForPlus, availableModelsForPalm } from '@/utils/constant'
import { useRouter } from 'vue-router'
// import { ElMessage } from 'element-plus'
import { chat } from '@/api/chat'
// import { AxiosProxyConfig } from 'axios'
const url = ref('')
const input = ref('')
const output = ref('')
const router = useRouter()
const loading = ref(false)
const history = ref<any>([])

async function template () {
  // 获取选中的文本
  const selectedText = input.value
  console.log(selectedText)
  loading.value = true
  // 根据任务类型生成系统消息和用户消息

  try {
    const fetchChatAPIOnce = async () => {
      const res = await chat({
        question: selectedText,
        history: history.value
      })
      output.value = res.data.response ? res.data.response : res.data.response.text
    }
    await fetchChatAPIOnce()
  } catch (error: any) {
    if (error.message === 'canceled') {
      return
    }
  } finally {
    loading.value = false
    history.value.push([selectedText, output.value])
  }
}

onBeforeMount(() => {

})

// common
function sendRequest () {
  // Make your GET/POST request here using the input data
  // and update the output data with the response

}

function backToHome () {
  router.push('/')
  history.value = []
}

</script>

<style lang='stylus'>
#setting
  height 100%
  overflow-y auto
</style>
