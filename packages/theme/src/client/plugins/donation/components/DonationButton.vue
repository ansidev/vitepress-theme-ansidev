<script setup lang="ts">
import { computed } from 'vue'
import { CustomDonationConfig } from '..'

interface DonationButtonProps extends CustomDonationConfig {
  donationPlatform: string
}

const props = defineProps<DonationButtonProps>()

const donationUrl = computed(() => new URL(props.donationId, props.donationBaseUrl).toString())
</script>

<template>
  <a :href="donationUrl" target="_blank">
    <img
      :src="donationButtonImage"
      :alt="donationPlatform"
      :style="donationButtonStyle"
    />
  </a>
</template>
