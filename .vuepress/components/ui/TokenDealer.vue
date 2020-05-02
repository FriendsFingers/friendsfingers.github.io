<template>
    <b-row>
        <b-col lg="12">
            <b-card title="Dealer status" class="mt-4 bg-purple">
                <template v-if="loading">
                    <ui--loader :loading="true" color="#ffffff"></ui--loader>
                </template>
                <template v-else>
                    <p class="card-text">
                        We've already distributed <b>{{ contributions.totalSoldTokens }} {{ token.symbol }}</b>.
                        Remaining tokens <b>{{ dealer.remainingTokens }} {{ token.symbol }}</b>.<br>

                        <b-progress :value="dealer.percentage"
                                    variant="warning"
                                    striped
                                    :animated="true"
                                    class="mt-2"/>

                        <br>
                        <span>
                                Default rate is <strong>{{ dealer.rate }} {{ token.symbol }}/ETH</strong><br>
                                If you have joined our DAO you will have a <strong>+100% bonus</strong>.<br>
                                If you have staked tokens you will have a <strong>+300% bonus</strong>.
                            </span>
                    </p>
                </template>
            </b-card>
        </b-col>
        <b-col v-if="terms.length === 3" lg="12">
            <b-card header="Get Shaka Tokens using your Web3 Wallet" class="mt-4">
                <b-form @submit.prevent="buyTokens">
                    <b-input-group>
                        <b-form-input
                                id="ethAmount"
                                name="ethAmount"
                                :disabled="makingTransaction"
                                v-model.trim="ethAmount"
                                v-validate="{ required: true, decimal: 18, min_value: 0.01 }"
                                data-vv-as="ETH amount"
                                @keyup="getExpectedTokenAmount"
                                :class="{'is-invalid': errors.has('ethAmount')}">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="makingTransaction" type="submit" variant="primary">
                                Send ETH
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <b-form-valid-feedback v-if="dealer.expectedTokenAmount > 0" :state="true">
                        You'll receive {{ dealer.expectedTokenAmount }} {{ token.symbol }}<br>
                        <span v-if="dapp.metamask.address" class="text-info">
                                Note: this rate is relative to address <b>{{ dapp.metamask.address }}</b>
                            </span>
                        <span v-else class="text-info">
                                Note: <b-link :to="$withBase('/dashboard')">connect</b-link> to have
                                rate calculated basing on your address
                            </span>
                    </b-form-valid-feedback>
                    <b-form-text v-else>
                        Insert the amount of ETH you want to send and we will calculate your rate.
                    </b-form-text>
                    <small v-show="errors.has('ethAmount')" class="text-danger">
                        {{ errors.first('ethAmount') }}
                    </small>
                </b-form>

                <b-alert show v-if="trx.hash" variant="success" class="mt-3">
                    Last transaction:
                    <b-link :href="trx.link" target="_blank">{{ trx.hash }}</b-link>
                </b-alert>
            </b-card>

            <b-card header="Or use your preferred wallet" no-body class="mt-4">
                <b-media>
                    <b-img slot="aside" fluid-grow :src="dealer.qrcode" :alt="dealer.address"/>
                    <h4 class="card-title my-3">Send ETH to the following address</h4>
                    <h6 class="card-subtitle text-muted address">{{ dealer.address }}</h6>
                    <b-link class="text-muted"
                            :href="dapp.network.current.etherscanLink + '/address/' + dealer.address"
                            target="_blank">
                        <small>View on Etherscan</small>
                    </b-link>
                </b-media>

                <b-alert show variant="warning" class="mb-0">
                    NOTE: Do not send ETH from exchange like Coinbase, Bittrex, Bitfinex or similar.
                    They don’t give you full access to your wallet so sending ETH from one of these
                    means for you losing your tokens and we won’t be able to help you to recover them.
                </b-alert>
            </b-card>
        </b-col>
        <b-col lg="12">
            <b-card border-variant="info"
                    header-bg-variant="info"
                    header-text-variant="white"
                    header="Accept Terms and Conditions"
                    class="mt-4">
                <b-form-group>
                    <b-form-checkbox-group v-model="terms">
                        <b-form-checkbox value="citizens" :disabled="terms.includes('citizens')">
                            Confirm that you are NOT a U.S. or Chinese citizen, resident or entity
                            (each a "U.S. or Chinese Person") nor are you purchasing Tokens or signing
                            on behalf of a U.S. or Chinese Person
                        </b-form-checkbox>
                        <b-form-checkbox value="country" :disabled="terms.includes('country')">
                            Confirm that you are legitimate to purchase Tokens and you are compliant
                            with active regulation in your country of residence
                        </b-form-checkbox>
                        <b-form-checkbox value="global" :disabled="terms.includes('global')">
                            Confirm that you have read, understood and agreed the FriendsFingers'
                            Terms and Conditions expressed in our
                            <b-link href="https://www.friendsfingers.com/whitepaper" target="_blank">
                                Whitepaper
                            </b-link>
                            and Official links below. Confirm also that you have read, understood and agreed
                            the FriendsFingers'
                            <b-link href="https://www.friendsfingers.com/terms" target="_blank">
                                Terms of Use
                            </b-link>
                            and
                            <b-link href="https://www.friendsfingers.com/privacy" target="_blank">
                                Privacy Policy
                            </b-link>
                        </b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
  import utils from '../../mixins/utils.mixin';

  export default {
    name: 'TokenDealer',
    mixins: [
      utils,
    ],
    data () {
      return {
        loading: true,
        makingTransaction: false,
        terms: [],
        ethAmount: '',
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
        dealer: {
          address: '',
          qrcode: '',
          rate: 0,
          expectedTokenAmount: 0,
          remainingTokens: 0,
        },
        contributions: {
          totalSoldTokens: 0,
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
      this.initDealer();
    },
    methods: {
      initDealer () {
        try {
          this.$store.dispatch('initShakaToken');
          this.$store.dispatch('initDealer');
          this.$store.dispatch('initContributions');

          this.ready();
        } catch (e) {
          alert(e);
          this.$router.push({ path: '/' });
        }
      },
      async ready () {
        await this.getTokenData();
        await this.getDealerData();

        this.loading = false;
      },
      async getTokenData () {
        try {
          this.token.name = await this.ethGetCall(this.dapp.instances.token.name);
          this.token.symbol = await this.ethGetCall(this.dapp.instances.token.symbol);
          this.token.link = this.dapp.network.current.etherscanLink + '/token/' + this.dapp.instances.token.address;
          this.token.logo = this.$withBase('/assets/images/logo/shaka_logo_white.png');
        } catch (e) {
          this.loading = false;
          console.log(e); // eslint-disable-line no-console
          alert('Some error occurred.');
        }
      },
      async getDealerData () {
        try {
          this.dealer.address = this.dapp.instances.dealer.address;
          this.dealer.qrcode = await this.generateQRCode(this.dealer.address);
          this.dealer.rate = parseFloat(await this.ethGetCall(this.dapp.instances.dealer.rate));

          this.dealer.remainingTokens = parseFloat(
            this.dapp.web3.fromWei(await this.ethGetCall(this.dapp.instances.token.balanceOf, this.dealer.address)),
          );

          this.contributions.totalSoldTokens = parseFloat(
            this.dapp.web3.fromWei(await this.ethGetCall(this.dapp.instances.contributions.totalSoldTokens)),
          );

          this.dealer.max = this.contributions.totalSoldTokens + this.dealer.remainingTokens;

          this.dealer.percentage = 100 * this.contributions.totalSoldTokens / this.dealer.max;
        } catch (e) {
          this.loading = false;
          console.log(e); // eslint-disable-line no-console
          alert('Some error occurred.');
        }
      },
      async getExpectedTokenAmount () {
        this.dealer.expectedTokenAmount = parseFloat(
          this.dapp.web3.fromWei(
            await this.ethGetCall(
              this.dapp.instances.dealer.expectedTokenAmount,
              this.dapp.metamask.address,
              this.dapp.web3.toWei(this.ethAmount),
            ),
          ),
        );
      },
      buyTokens () {
        this.$validator.validate('ethAmount').then((result) => {
          if (result) {
            if (!this.dapp.metamask.installed) {
              alert('Please verify that you have MetaMask installed and unlocked.');
              return;
            }

            if (this.dapp.metamask.netId !== this.dapp.network.current.id) {
              alert(`You are on the wrong Network. Please switch MetaMask on ${this.dapp.network.current.name}.`);
              return;
            }

            try {
              this.makingTransaction = true;

              this.dapp.instances.dealer.buyTokens(
                {
                  value: this.dapp.web3.toWei(this.ethAmount),
                  from: this.dapp.metamask.address,
                  to: this.dapp.instances.dealer.address,
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
              alert('Cannot connect. Please verify that you have MetaMask installed and unlocked.');
            }
          }
        }).catch((e) => {
          console.log(e); // eslint-disable-line no-console
          this.makingTransaction = false;
          alert('Some error occurred.');
        });
      },
    },
  };
</script>
