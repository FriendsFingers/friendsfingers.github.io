<template>
    <b-container>
        <b-row class="mt-4">
            <b-col lg="10" offset-lg="1">
                <template v-if="loading">
                    <b-card class="mb-3">
                        <ui--loader :loading="true"></ui--loader>
                    </b-card>
                </template>
                <template v-else>
                    <template v-if="dapp.metamask.address">
                        <template v-if="!loadingData">
                            <template v-if="account.member">
                                <ui--member-details :account="account" :token="token"></ui--member-details>
                            </template>
                            <template v-else>
                                <b-card header="Your account" class="mb-3">
                                    <b>Account:</b>
                                    <b-link :href="`${dapp.network.current.etherscanLink}/address/${dapp.metamask.address}`">
                                            target="_blank">{{ dapp.metamask.address}}
                                    </b-link>
                                </b-card>
                                <b-card header="FriendsFingers DAO" class="mb-3">
                                    <b-btn variant="primary"
                                           size="lg"
                                           :disabled="makingTransaction"
                                           @click="join">
                                        Join DAO
                                    </b-btn>

                                    <br>

                                    <b-alert show v-if="trx.hash" variant="success" class="mt-3">
                                        Last transaction:
                                        <b-link :href="trx.link" target="_blank">{{ trx.hash }}</b-link>
                                    </b-alert>
                                </b-card>
                            </template>
                        </template>
                        <template v-else>
                            <ui--loader :loading="true"></ui--loader>
                        </template>
                    </template>
                    <template v-else>
                        <b-card header="Your account" class="mb-3">
                            <b-alert v-if="!dapp.metamask.installed || dapp.metamask.netId !== dapp.network.current.id"
                                     variant="warning" show>
                                <template v-if="!dapp.metamask.installed">
                                    Install
                                    <b-link href="https://metamask.io/" target="_blank">MetaMask</b-link>
                                    <template v-if="isMobile()">or a mobile Web3 browser</template>
                                    to view your dashboard.
                                </template>
                                <template v-else-if="dapp.metamask.netId !== dapp.network.current.id">
                                    You are on the wrong Network.<br>
                                    Please switch your Ethereum Provider on <b>{{ dapp.network.current.name }}</b>.
                                </template>
                            </b-alert>
                            <p v-else class="card-text">
                                <b-btn variant="primary"
                                       size="lg"
                                       :disabled="!dapp.metamask.installed || dapp.metamask.netId !== dapp.network.current.id"
                                       @click="enable">
                                    Connect
                                </b-btn>
                            </p>
                        </b-card>
                    </template>
                </template>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import utils from '../mixins/utils.mixin';

  export default {
    name: 'Dashboard',
    mixins: [
      utils,
    ],
    data () {
      return {
        loading: true,
        loadingData: false,
        makingTransaction: false,
        trx: {
          hash: '',
          link: '',
        },
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
          document.location.href = this.$withBase('/');
        }
      },
      async ready () {
        await this.getTokenData();
        await this.getAccountData();

        this.loading = false;
      },
      async enable () {
        this.$store.dispatch('connect');
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
      async getAccountData () {
        this.loadingData = true;
        try {
          this.account.isMember = await this.ethGetCall(this.dapp.instances.dao.isMember, this.dapp.metamask.address);

          if (this.account.isMember) {
            const struct = await this.ethGetCall(
              this.dapp.instances.dao.getMemberByAddress, this.dapp.metamask.address,
            );
            this.account.member = this.formatStructure(struct);
            this.account.memberId = this.account.member.id;
          }

          this.account.tokenBalance = parseFloat(
            this.dapp.web3.fromWei(
              await this.ethGetCall(this.dapp.instances.token.balanceOf, this.dapp.metamask.address),
            ),
          ).toFixed(2);

          this.loadingData = false;
        } catch (e) {
          console.log(e); // eslint-disable-line no-console
          this.loadingData = false;
          alert('Some error occurred.');
        }
      },
      join () {
        try {
          this.makingTransaction = true;

          this.dapp.instances.dao.join(
            {
              from: this.dapp.metamask.address,
              to: this.dapp.instances.dao.address,
            },
            (err, trxHash) => {
              if (!err) {
                this.trx.hash = trxHash;
                this.trx.link = this.dapp.network.current.etherscanLink + '/tx/' + this.trx.hash;
              } else {
                alert('Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!');
              }
              this.makingTransaction = false;
            },
          );
        } catch (e) {
          console.log(e); // eslint-disable-line no-console
          this.makingTransaction = false;
          alert('Cannot connect. Please verify that you have MetaMask installed and unlocked.');
        }
      },
    },
  };
</script>
