<template>
  <div id="setting">
    <el-row
      class="view-title"
      align="middle"
      justify="center"
      style="font-size: 20px;color: black;"
    >
      {{ $t('settings') }}
    </el-row>
    <el-row
      class="setting-list"
      style="margin-top: 20px;"
    >
      <el-col
        :span="20"
        :offset="2"
      />
      <el-row
        style="width: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;"
      >
        <el-button
          type="primary"
          round
          plain
          style="margin-bottom: 5px;width: 100%;"
          @click="backToHome"
        >
          {{ $t('backToHome') }}
        </el-button>
        <el-form
          label-position="left"
          size="default"
          label-width="50%"
        >
          <el-form-item>
            <template #label>
              <span>
                {{ $t('settingChooseLanguage') }}
              </span>
            </template>
            <el-select
              v-model="currentUILanguage"
              size="small"
              :placeholder="$t('settingChooseLanguage')"
              @change="handleLocalLanguageChange"
            >
              <el-option
                v-for="item in languageList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <template #label>
              <span>
                {{ $t('apiKey') }}
              </span>
            </template>
            <el-input
              v-model="apiKey"
              :placeholder="$t('apiKeyDescription')"
              size="small"
              @blur="handleApiKeyChange"
            />
          </el-form-item>
          <el-form-item>
            <template #label>
              <span>
                {{ $t('settingBasePath') }}
              </span>
            </template>
            <el-input
              v-model="basePath"
              :placeholder="$t('settingBasePath')"
              size="small"
              @blur="handleBasePathChange"
            />
          </el-form-item>
          <el-form-item>
            <template #label>
              <span>
                {{ $t('settingTemperature') }}
              </span>
            </template>
            <el-input-number
              v-model="temperature"
              :min="0"
              :max="2"
              :step="0.1"
              size="small"
              @change="handleTemperatureChange"
            />
          </el-form-item>
          <el-form-item>
            <template #label>
              <span>
                {{ $t('settingMaxTokens') }}
              </span>
            </template>
            <el-input-number
              v-model="maxTokens"
              :min="1"
              :step="1"
              size="small"
              @change="handleMaxTokensChange"
            />
          </el-form-item>
        </el-form>
      </el-row>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { localStorageKey } from '@/utils/constant'
import { useRouter } from 'vue-router'

const { locale } = useI18n()
const router = useRouter()
const languageList = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: '简体中文',
    value: 'zh-cn'
  }
]

const currentUILanguage = ref('zh-cn')

const apiKey = ref('')
const temperature = ref(0.7)
const maxTokens = ref(800)
const basePath = ref('')

// const { locale } = useI18n()

onBeforeMount(() => {
  initData()
})

function initData () {
  currentUILanguage.value = localStorage.getItem(localStorageKey.localLanguage) || 'zh-cn'
  apiKey.value = localStorage.getItem(localStorageKey.apiKey) || ''
  temperature.value = forceNumber(localStorage.getItem(localStorageKey.temperature))
  maxTokens.value = forceNumber(localStorage.getItem(localStorageKey.maxTokens))
  basePath.value = localStorage.getItem(localStorageKey.basePath) || ''
}

function handleLocalLanguageChange (val: string) {
  locale.value = val
  localStorage.setItem(localStorageKey.localLanguage, val)
}

function handleApiKeyChange () {
  localStorage.setItem(localStorageKey.apiKey, apiKey.value)
}

function handleBasePathChange () {
  localStorage.setItem(localStorageKey.basePath, basePath.value)
}

function handleTemperatureChange () {
  localStorage.setItem(localStorageKey.temperature, temperature.value.toString())
}

function handleMaxTokensChange () {
  localStorage.setItem(localStorageKey.maxTokens, maxTokens.value.toString())
}

function backToHome () {
  router.push('/')
}

function forceNumber (val: any) {
  return isNaN(Number(val)) ? 0 : Number(val)
}

</script>

<style lang='stylus'>
#setting
  height 100%
  overflow-y auto
</style>
