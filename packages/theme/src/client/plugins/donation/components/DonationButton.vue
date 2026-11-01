<script setup lang="ts">
import { computed } from 'vue'
import { CustomDonationConfig } from '..'

interface DonationButtonProps extends CustomDonationConfig {
  donationPlatform: string
}

const props = defineProps<DonationButtonProps>()

const donationUrl = computed(() =>
  new URL(props.donationId, props.donationBaseUrl).toString()
)

// Intrinsic sizes of the platform button images so the browser can reserve
// space before they load (avoids unsized-image CLS risk).
const size = props.donationButtonSize
</script>

<template>
  <a :href="donationUrl" target="_blank">
    <img
      :src="donationButtonImage"
      :alt="donationPlatform"
      :style="donationButtonStyle"
      :width="size?.width"
      :height="size?.height"
      loading="lazy"
      decoding="async"
    />
  </a>
</template>
