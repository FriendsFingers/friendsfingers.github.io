module.exports = {
  title: 'FriendsFingers',
  description: 'Build your Ethereum based Crowdsale and start your ICO with no setup costs and zero lines of code required. All is Blockchain based through our awesome Smart Contracts.', // eslint-disable-line max-len
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['script', { src: '/assets/js/web3.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/cookie-bar/cookiebar-latest.min.js?forceLang=en&theme=momh&tracking=1&thirdparty=1&always=1&noGeoIp=1&scrolling=1&hideDetailsBtn=1&showPolicyLink=1&remember=30&privacyPage=https%3A%2F%2Fwww.friendsfingers.com%2Fprivacy' }], // eslint-disable-line max-len
  ],
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-111269229-1',
      },
    ],
  ],
  chainWebpack: (config) => {
    const isProd = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

    // TODO remove comment to use prod
    // const isProd = true;

    config.plugin('injections').tap(pluginArgs => pluginArgs.map(definitions => ({
      ...definitions,
      __TOKEN_ADDRESS__: JSON.stringify(isProd ? '0x93a7174dafd31d13400cd9fa01f4e5b5baa00d39' : '0xe58cade1d92e5f5ce8b1bb4489c2196f832d5807'), // eslint-disable-line max-len
      __FAUCET_ADDESS__: JSON.stringify(isProd ? '0x791D406B20A7d93C0945b0D9D7AbF323772397C9' : '0x746edCd06B47c2483F6B34e3F79367E38C068884'), // eslint-disable-line max-len
      __DAO_ADDESS__: JSON.stringify(isProd ? '0xa042c9143c8758d2Ad5A3FCc08dEc39F6964453E' : '0xa4f33f76707ec8E6A9be7B65ef63966190EF1bbB'), // eslint-disable-line max-len
      __TOKEN_DEALER__: JSON.stringify(isProd ? '0xAE24EE5136F23512eab605299022aeEDD0947697' : '0x0845415aC22BBc41de4b11FECd42A2E87217347F'), // eslint-disable-line max-len
      __CONTRIBUTIONS__: JSON.stringify(isProd ? '0xa2B5CEB15354343C6f7A1569ac250cDd9b0634BA' : '0x027A7F28173fb35DE6dea6980716958702bAF826'), // eslint-disable-line max-len
      __DEFAULT_NETWORK__: JSON.stringify(isProd ? 'mainnet' : 'rinkeby'),
      __DEFAULT_NETWORK_NAME__: JSON.stringify(isProd ? 'Main Ethereum Network' : 'Rinkeby Test Network'),
      __INFURA_KEY__: JSON.stringify('bb929003b59342b6a1a0d8ad0f648c08'),
    })));
  },
};
