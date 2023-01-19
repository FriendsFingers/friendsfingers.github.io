<template>
    <b-navbar toggleable="md" type="light" variant="light" fixed="top" :sticky="true" class="main-navbar">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">
            <b-img :src="$withBase('/assets/images/logo/friendsfingers.svg')"
                   rounded="circle"
                   height="24"
                   :alt="$site.title"/>
            {{ $site.title }}
        </b-navbar-brand>

        <b-badge variant="warning">beta</b-badge>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item :to="$withBase('/dao')">DAO</b-nav-item>
                <!--<b-nav-item :to="$withBase('/dealer')">Dealer</b-nav-item>-->
                <b-nav-item :to="$withBase('/faucet')">Faucet</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item href="https://medium.com/friendsfingers" target="_blank">Blog</b-nav-item>
                <b-nav-item :to="$withBase('/whitepaper')">Whitepaper</b-nav-item>
                <b-nav-item disabled class="d-none d-md-block">|</b-nav-item>
                <b-nav-item v-if="dapp.metamask.address === ''" :to="$withBase('/dashboard')">Connect</b-nav-item>
                <b-nav-item-dropdown v-else :text="dapp.metamask.address | truncate(10)" right>
                    <b-dropdown-item :to="$withBase('/dashboard')">Dashboard</b-dropdown-item>
                    <!--<b-dropdown-item @click="disconnect()">Disconnect</b-dropdown-item>-->
                </b-nav-item-dropdown>

                <b-nav-form @submit.prevent="search" class="ml-2 d-none d-lg-block d-xl-block">
                    <b-form-input id="query"
                                  name="query"
                                  size="sm"
                                  class="mt-1"
                                  v-validate="{ required: true, eth_address: true }"
                                  v-model="query"
                                  data-vv-as="Query"
                                  :class="{'is-invalid': errors.has('query')}"
                                  placeholder="0x123456789...">
                    </b-form-input>
                    <b-button variant="link" class="mt-1 text-dark" type="submit" size="sm">
                        <font-awesome-icon icon="search"/>
                    </b-button>
                </b-nav-form>
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
