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

  <el-upload
    ref="upload"
    :action="'#'"
    :http-request="ossUpload"
  >
    <el-button
      size="small"
      type="primary"
    >
      上传文件
    </el-button>
    <div
      class="el-upload__tip"
    >
      支持jpg、png、pdf、word格式，大小不超过500M。
    </div>
  </el-upload>

  <el-button
    block
    size="large"
  >
    对话知识库：{{ choice }}
  </el-button>
  <el-form
    ref="formRef"
    inline
    :model="formValue"
    :rules="rules"
  >
    <el-form-item
      label=""
      prop="user.name"
    >
      <el-input
        v-model:value="formValue.user.name"
        placeholder="起个知识库名吧！"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleClick"
      >
        新增
      </el-button>
    </el-form-item>
  </el-form>
  <div
    v-for="item in items"
    :key="item.value"
  >
    <div class="flex items-center">
      <el-button
        block
        size="large"
        style="width:90%"
        @click="handleValidateClick(item.value)"
      >
        {{ item.value }}
      </el-button>
      <div class="absolute z-10 flex visible right-1">
        <template v-if="item.isEdit" />
        <template v-else>
          <el-popconfirm
            placement="bottom"
            @confirm="handleDelete(item)"
          >
            <template #reference>
              <button class="p-1">
                <svg-icon icon-class="ri:delete-bin-line" />
              </button>
            </template>
            确定删除此文件？
          </el-popconfirm>
        </template>
      </div>
    </div>

    <div
      v-if="item.show"
      class="p-2 flex-1 min-h-0 pb-4 overflow-hidden"
    >
      <filelist
        v-if="item.value"
        :knowledgebaseid="item.value"
      />
    </div>
    <br>
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
import { onMounted, onBeforeMount, ref } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { languageMap, availableModels, localStorageKey, availableModelsForPlus, availableModelsForPalm } from '@/utils/constant'
import { useRouter } from 'vue-router'
import { idStore } from '../store/modules/knowledgeBaseId/knowledgeBaseId'
// import { ElMessage } from 'element-plus'
import { chat } from '@/api/chat'
import { uploadFile, deleteKb, getKbsList } from '@/api/knowledge'

import type { UploadInstance } from 'element-plus'

const upload = ref<UploadInstance>()
const url = ref('')

const input = ref('')
const output = ref('')
const router = useRouter()
const loading = ref(false)
const history = ref<any>([])

const items = ref<any>([])
const choice = ref('')
const store = idStore()

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
        history: [['-', '-']]
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

// const beforeUpload = (file: any) => {
//   console.log('file', file)
//   const fileData = new FormData()
//   fileData.append('file', file)

//   // 这里可以设置知识库id
//   fileData.append('knowledge_base_id', 'kb1')

//   return fileData
// }

async function ossUpload (option: any) {
  try {
    const fetchFileAPIOnce = async () => {
      const res = await uploadFile(option.file, 'bread')
      output.value = res.data.response ? res.data.response : res.data.response.text
    }
    await fetchFileAPIOnce()
  } catch (error: any) {
    if (error.message === 'canceled') {
      return
    }
  } finally {
    loading.value = false
  }
  console.log('option', option.file)
}

// const handleSuccess = async (response: any) => {
//   console.log('response', response)
//   const { msg } = await uploadFile(response.file, 'bread')
//   // 展示上传结果
//   console.log(msg)
// }

onMounted(async () => {
  choice.value = store.knowledgeid
  // const res = await getKbsList()
  // res.data.data.forEach((item: any) => {
  //   items.value.push({
  //     value: item,
  //     show: false
  //   })
  // })
})
const formValue = ref({
  user: {
    name: ''
  }
})
const rules = {
  user: {
    name: {
      required: true,
      message: '请输入名称',
      trigger: 'blur'
    }
  }
}
const handleValidateClick = (item: any) => {
  choice.value = item
  // store.knowledgeid = choice.value
  items.value.forEach((res: { value: any; show: boolean }) => {
    if (res.value === item) { res.show = !res.show }
  }

  )
}
const handleClick = () => {
  if (formValue.value.user.name.trim() !== '') {
    items.value.push({
      value: formValue.value.user.name.trim(),
      show: false
    })
  }
}
async function handleDelete (item: any) {
  await deleteKb(item.value)
  const res = await getKbsList()
  items.value = []
  res.data.data.forEach((item: any) => {
    items.value.push({
      value: item,
      show: false
    })
  })
}
</script>

<style lang='stylus'>
#setting
  height 100%
  overflow-y auto
</style>
