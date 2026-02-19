<script setup lang="ts">
import { computed } from 'vue'
import type { CustomDonationConfig, DonationPluginConfig } from '..'
import { supportedDonationPlatforms } from '..'
import DonationButton from './DonationButton.vue'

const props = defineProps<{
  donation: DonationPluginConfig
}>()

const donationConfigs = props.donation

const computedDonationConfig = computed(() => {
  const donationConfig: { [key: string]: CustomDonationConfig } = {}

  for (const donationPlatform in donationConfigs) {
    if (donationPlatform === 'custom') {
      continue
    }
    const donationId: string = donationConfigs[donationPlatform as keyof typeof donationConfigs] as string
    donationConfig[donationPlatform] = {
      ...supportedDonationPlatforms[donationPlatform],
      donationId,
    }
  }
  return {
    ...donationConfig,
    ...donationConfigs.custom,
  }
})
</script>

<template>
  <template
    v-for="(donationConfig, donationPlatform) in computedDonationConfig"
    :key="donationConfig?.name"
  >
    <DonationButton
      v-bind="donationConfig"
      :donation-platform="donationPlatform as string"
    />
  </template>
</template>
