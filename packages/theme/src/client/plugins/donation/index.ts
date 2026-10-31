export declare interface DonationPluginConfig {
  buymeacoffee?: string
  kofi?: string
  paypal?: string
  custom?: {
    [key: string]: CustomDonationConfig
  }
}

export declare interface CustomDonationBaseConfig {
  donationBaseUrl: string
  donationButtonImage: string
  donationButtonStyle?: Record<string, string>
}

export declare interface CustomDonationConfig extends CustomDonationBaseConfig {
  donationId: string
}

export const supportedDonationPlatforms: {
  [key: string]: CustomDonationBaseConfig
} = {
  buymeacoffee: {
    donationBaseUrl: 'https://buymeacoffee.com',
    donationButtonImage:
      'https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png',
    donationButtonStyle: {
      height: '60px !important',
      width: '217px !important'
    }
  },
  kofi: {
    donationBaseUrl: 'https://ko-fi.com',
    donationButtonImage:
      'https://storage.ko-fi.com/cdn/brandasset/kofi_bg_tag_white.png',
    donationButtonStyle: {
      height: '60px !important'
    }
  },
  paypal: {
    donationBaseUrl: 'https://paypal.me',
    donationButtonImage:
      'https://paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'
  }
}
