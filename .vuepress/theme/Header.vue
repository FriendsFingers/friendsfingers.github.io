<template>
    <b-navbar toggleable="md" variant="light" fixed="top" :sticky="true" class="main-navbar">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">
            <b-img :src="$withBase('/assets/images/logo/friendsfingers.svg')"
                   rounded="circle"
                   height="24"
                   :alt="$site.title"/>
            {{ $site.title }}
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item href="https://app.friendsfingers.com/dao" target="_blank">DAO</b-nav-item>
                <b-nav-item href="https://app.friendsfingers.com/dealer" target="_blank">Dealer</b-nav-item>
                <b-nav-item href="https://app.friendsfingers.com/faucet" target="_blank">Faucet</b-nav-item>

                <b-nav-item disabled class="d-none d-md-block">|</b-nav-item>

                <b-nav-item href="https://medium.com/friendsfingers" target="_blank">Blog</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="$withBase('/whitepaper')">Whitepaper</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
  import utils from '../mixins/utils.mixin';

  export default {
    name: 'Header',
    mixins: [
      utils,
    ],
    data () {
      return {
        query: '',
      };
    },
    computed: {
      dapp: {
        get () {
          return this.$store.getters.dapp;
        },
      },
    },
    created () {
      this.$validator.extend('eth_address', {
        getMessage: field => 'Insert a valid Ethereum address.',
        validate: value => this.dapp.web3.isAddress(value),
      });

      setTimeout(() => {
        if (!this.dapp.metamask.installed) {
          this.makeToast(
            'No Ethereum Provider',
            `Please install MetaMask ${(this.isMobile()) ? 'or a mobile Web3 browser' : ''} to use DApp.`, // eslint-disable-line max-len
            'warning',
          );
        } else if (this.dapp.metamask.netId !== this.dapp.network.current.id) {
          this.makeToast(
            'Wrong Network',
            `You are on the wrong Network. Please switch your Ethereum Provider on ${this.dapp.network.current.name}.`,
            'warning',
          );
        }
      }, 2000);
    },
    methods: {
      search () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            window.location.href = this.$withBase(`/member/?ref=${this.query}`);
          }
        }).catch((e) => {
          console.log(e); // eslint-disable-line no-console
        });
      },
      disconnect () {
        this.$store.dispatch('disconnect');
      },
    },
  };
</script>
