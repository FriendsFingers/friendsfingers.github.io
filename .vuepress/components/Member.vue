<template>
    <b-container>
        <b-row class="mt-4">
            <b-col lg="10" offset-lg="1">
                <template v-if="loading">
                    <b-card class="mb-3">
                        <ui--loader :loading="true"></ui--loader>
                    </b-card>
                </template>
                <template v-else-if="account.member">
                    <ui--member-details :account="account" :token="token"></ui--member-details>
                </template>
                <template v-else>
                    <b-card-body>
                        No member found.
                    </b-card-body>
                </template>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import utils from '../mixins/utils.mixin';

  export default {
    name: 'Member',
    mixins: [
      utils,
    ],
    data () {
      return {
        ref: '',
        loading: true,
        token: {
          name: '',
          symbol: '',
          decimals: 18,
          link: '',
          logo: '',
        },
        account: {
          isMember: false,
          memberId: 0,
          tokenBalance: 0,
          member: null,
        },
      };
    },
    computed: {
      dapp: {
        get () {
          return this.$store.getters.dapp;
        },
      },
    },
    mounted () {
      this.ref = this.getParam('ref');

      this.initDapp();
    },
    methods: {
      initDapp () {
        try {
          this.$store.dispatch('initShakaToken');
          this.$store.dispatch('initDao');

          this.ready();
        } catch (e) {
          alert(e);
          this.$router.push({ path: '/' });
        }
      },
      async ready () {
        await this.getTokenData();
        await this.getMember();
      },
      async getTokenData () {
        try {
          this.token.name = await this.ethGetCall(this.dapp.instances.token.name);
          this.token.symbol = await this.ethGetCall(this.dapp.instances.token.symbol);
          this.token.link = this.dapp.network.current.etherscanLink + '/token/' + this.dapp.instances.token.address;
          this.token.logo = this.$withBase('/assets/images/logo/shaka_logo_white.png');
        } catch (e) {
          console.log(e); // eslint-disable-line no-console
          this.loading = false;
          alert('Some error occurred.');
        }
      },
      async getMember () {
        let struct;

        if (this.dapp.web3.isAddress(this.ref)) {
          struct = await this.ethGetCall(this.dapp.instances.dao.getMemberByAddress, this.ref);
        } else {
          struct = await this.ethGetCall(this.dapp.instances.dao.getMemberById, this.ref);
        }

        this.account.member = this.formatStructure(struct);

        if (this.account.member) {
          this.account.tokenBalance = parseFloat(
            this.dapp.web3.fromWei(
              await this.ethGetCall(this.dapp.instances.token.balanceOf, this.account.member.address),
            ),
          ).toFixed(2);

          this.account.memberId = this.account.member.id;
        }

        this.loading = false;
      },
    },
  };
</script>
