<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import type { SharingComponentProps } from '..'
import SharingButton from './SharingButton.vue'

const defaultConfigs = {
  wrapperCssClass: 'pl-4 py-4',
  titleCssClass: 'text-sm/[32px] font-semibold mb-2',
  buttonCssClass: 'flex flex-wrap space-x-1',
  title: 'Share',
  networks: ['email', 'facebook', 'twitter', 'telegram', 'reddit', 'linkedin', 'whatsapp', 'pinterest', 'tumblr', 'vk'],
  buttonSize: 18,
  iconSize: 20,
  iconStyle: 'solid',
  displayMode: 'both',
}

const props = defineProps<SharingComponentProps>()

const { theme } = useData()
const pluginConfig = computed(() => theme.value.sharing || false)

const wrapperCssClass = computed(() =>
  pluginConfig.value && typeof pluginConfig.value.wrapperCssClass === 'string'
    ? pluginConfig.value.wrapperCssClass
    : defaultConfigs.wrapperCssClass,
)
const title = computed(() =>
  pluginConfig.value && typeof pluginConfig.value.title === 'string'
    ? pluginConfig.value.title
    : defaultConfigs.title,
)
const titleCssClass = computed(() =>
  pluginConfig.value && typeof pluginConfig.value.titleCssClass === 'string'
    ? pluginConfig.value.titleCssClass
    : defaultConfigs.titleCssClass,
)
const buttonCssClass = computed(() =>
  pluginConfig.value && typeof pluginConfig.value.buttonCssClass === 'string'
    ? pluginConfig.value.buttonCssClass
    : defaultConfigs.buttonCssClass,
)
const networks = computed(() =>
  pluginConfig.value && Array.isArray(pluginConfig.value.networks)
    ? pluginConfig.value.networks
    : defaultConfigs.networks,
)
const buttonSize = computed(() =>
  pluginConfig.value && Number.isInteger(pluginConfig.value.buttonSize) && pluginConfig.value.buttonSize > 0
    ? pluginConfig.value.buttonSize
    : defaultConfigs.buttonSize,
)
const iconSize = computed(() =>
  pluginConfig.value && Number.isInteger(pluginConfig.value.iconSize) && pluginConfig.value.iconSize > 0
    ? pluginConfig.value.iconSize
    : defaultConfigs.iconSize,
)
const iconStyle = computed(() =>
  pluginConfig.value && typeof pluginConfig.value.iconStyle === 'string'
    ? pluginConfig.value.iconStyle
    : defaultConfigs.iconStyle,
)
const displayMode = computed(() =>
  pluginConfig.value && typeof pluginConfig.value.displayMode === 'string'
    ? pluginConfig.value.displayMode
    : defaultConfigs.displayMode,
)

</script>

<template>
  <div :class="wrapperCssClass">
    <p :class="titleCssClass">
      {{ title }}
    </p>
    <div :class="buttonCssClass">
      <template v-for="network in networks" :key="network">
        <SharingButton :url="props.url" :text="props.text" :network="network" :button-size="buttonSize"
          :icon-size="iconSize" :icon-style="iconStyle" :display-mode="displayMode" />
      </template>
    </div>
  </div>
</template>
