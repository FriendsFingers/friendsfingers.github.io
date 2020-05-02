<template>
    <b-row>
        <b-col lg="12">
            <b-card header="Select your preferred Token" class="mt-4">
                <b-form-select v-model="faucet.selectedToken" @change="initData">
                    <option v-for="faucetToken in faucet.tokens" :value="faucetToken">
                        {{ `${faucetToken.name} (${faucetToken.symbol})` }}
                    </option>
                </b-form-select>
                <b-form-text id="input-live-help" class="mt-2">
                    View
                    <b-img style="vertical-align: top;" :src="token.logo" height="16" :alt="token.name"/>
                    {{ token.name }} on <b-link :href="token.link" target="_blank">Etherscan</b-link>
                </b-form-text>
            </b-card>
            <b-card :title="`${token.name} Faucet status`" id="faucet-box" class="mt-4 bg-purple">
                <template v-if="loading">
                    <ui--loader :loading="true" color="#ffffff"></ui--loader>
                </template>
                <template v-else>
                    <p class="card-text">
                        Daily rate: {{ faucet.dailyRate }} {{ token.symbol }}.<br>
                        Referral rate: {{ faucet.referralRate }} {{ token.symbol }}.<br>

                        We've already distributed <b>{{ faucet.distributedTokens }} {{ token.symbol }}</b>.
                        Remaining tokens <b>{{ faucet.remainingTokens }} {{ token.symbol }}</b>.<br>

                        <b-progress :value="faucet.percentage"
                                    variant="warning"
                                    striped
                                    :animated="true"
                                    class="my-2"/>

                        <b-alert show>
                            <small>
                                <template v-if="account.isMember">
                                    You will earn
                                    <b>{{ faucet.dailyRate * account.dailyBonus }} {{ token.symbol }}</b>
                                    per day and
                                    <b>{{ faucet.referralRate * account.referralBonus }} {{ token.symbol }}</b>
                                    for each time your friends will use the faucet.
                                </template>
                                <template v-else>
                                    You can earn up to
                                    <b>{{ faucet.dailyRate * 4 }} {{ token.symbol }}</b>
                                    per day and up to
                                    <b>{{ faucet.referralRate * 4 }} {{ token.symbol }}</b>
                                    for each time your friends will use the faucet.
                                </template>
                                <b-link href="https://medium.com/friendsfingers/get-shaka-tokens-join-dao-and-earn-more-3b96c0f39d0c"
                                        target="_blank" v-b-tooltip.hover title="How to earn more?">
                                    <font-awesome-icon icon="info-circle"/>
                                </b-link>
                            </small>
                        </b-alert>
                    </p>
                </template>
            </b-card>
            <b-card v-if="!loading" header="Your account" class="mt-4">
                <template v-if="dapp.metamask.address">
                    <template v-if="!makingTransaction && !loadingData">
                        <b>Account:</b>
                        <b-link :href="`${dapp.network.current.etherscanLink}/address/${account.address}`"
                                target="_blank">{{ account.address }}
                        </b-link>
                        <br>

                        <template v-if="account.referral !== zeroAddress">
                            <b>You have been invited by:</b>
                            <b-link :href="`${dapp.network.current.etherscanLink}/address/${account.referral}`"
                                    target="_blank">{{ account.referral }}
                            </b-link>
                            <br>
                        </template>

                        You have earned <b>{{ account.receivedTokens }} {{ token.symbol }}</b> by using faucet.<br>

                        You have earned <b>{{ account.earnedByReferral }} {{ token.symbol }}</b>
                        from your <b>{{ account.referredAddresses.length }}</b> referred addresses.<br>

                        <template v-if="account.lastUpdate !== 0">
                            <small>
                                Last Update: <b>{{ account.lastUpdate | formatLocaleDate }}</b>,
                                you can claim again on <b>{{ account.nextClaimTime | formatLocaleDate }}</b>
                            </small>
                        </template>

                        <template v-if="referral.link && account.receivedTokens === 0">
                            <br>
                            <h5>
                                Your referral:
                                <b-link :href="referral.link" target="_blank">{{ referral.name }}</b-link>
                            </h5>
                        </template>

                        <b-form v-on:submit.prevent="getTokens" class="mt-3" v-if="!makingTransaction">
                            <b-form-group id="referral-group"
                                          label="Referral Address:"
                                          label-for="referral"
                                          v-if="account.receivedTokens === 0 && referral.address !== ''"
                                          description="Your referral address">
                                <b-form-input id="referral"
                                              name="referral"
                                              type="text"
                                              size="lg"
                                              v-validate="'not_yourself|eth_address'"
                                              v-model="referral.address"
                                              readonly
                                              data-vv-as="Referral Address"
                                              :class="{'is-invalid': errors.has('referral')}"
                                              placeholder="0x12312312...">
                                </b-form-input>
                                <small v-show="errors.has('referral')" class="text-danger">
                                    {{ errors.first('referral') }}
                                </small>
                            </b-form-group>

                            <b-alert v-if="!account.isMember" show variant="danger" class="mt-3">
                                You must
                                <b-link :to="$withBase('/dashboard')">
                                    join DAO
                                </b-link>
                                to start earning tokens.
                            </b-alert>
                            <template v-else>
                                <b-btn type="submit"
                                       variant="primary"
                                       :disabled="errors.has('referral') || account.nextClaimTime > Date.now()"
                                       size="lg">
                                    Get Tokens
                                </b-btn>
                                <br>
                                <small class="text-muted mt-3">
                                    Note: you just need to pay Gas to get your tokens
                                    <b-link href="https://kb.myetherwallet.com/en/transactions/what-is-gas/"
                                            target="_blank" v-b-tooltip.hover title="What is Gas?">
                                        <font-awesome-icon icon="info-circle"/>
                                    </b-link>
                                </small>

                                <b-alert show v-if="trx.hash" variant="success" class="mt-3">
                                    Last transaction:
                                    <b-link :href="trx.link" target="_blank">{{ trx.hash }}</b-link>
                                </b-alert>
                            </template>
                        </b-form>
                        <hr class="my-4">
                        <h4>Earn more Tokens with your referral link</h4>
                        <b-form-group id="my-link-group"
                                      label="Your referral link is:"
                                      label-for="my-link">
                            <b-form-input id="my-link"
                                          name="my-link"
                                          type="text"
                                          size="lg"
                                          readonly
                                          v-model="account.share.link">
                            </b-form-input>
                        </b-form-group>
                        <p class="share-link">
                            <b-btn :href="account.share.twitter" target="_blank" class="twitter">
                                <font-awesome-icon :icon="['fab', 'twitter']"/>
                            </b-btn>
                            <b-btn :href="account.share.facebook" target="_blank" class="facebook">
                                <font-awesome-icon :icon="['fab', 'facebook-f']"/>
                            </b-btn>
                            <b-btn :href="account.share.telegram" target="_blank" class="telegram">
                                <font-awesome-icon :icon="['fab', 'telegram-plane']"/>
                            </b-btn>
                            <b-btn :href="account.share.whatsapp" target="_blank" class="whatsapp">
                                <font-awesome-icon :icon="['fab', 'whatsapp']"/>
                            </b-btn>
                        </p>
                        <p class="lead">
                            Share with your friends and earn Tokens
                        </p>
                    </template>
                    <template v-else>
                        <ui--loader :loading="true"></ui--loader>
                    </template>
                </template>
                <template v-else>
                    <b-alert show
                             v-if="!dapp.metamask.installed || dapp.metamask.netId !== dapp.network.current.id"
                             variant="warning">
                        <template v-if="!dapp.metamask.installed">
                            Install
                            <b-link href="https://metamask.io/" target="_blank">MetaMask</b-link>
                            <template v-if="isMobile()">or a mobile Web3 browser</template>
                            to get your Tokens.
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
                </template>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
  import utils from '../../mixins/utils.mixin';

  import faucets from '../../content/faucets';
  import friends from '../../content/friends';

  export default {
    name: 'TokenFaucet',
    mixins: [
      utils,
    ],
    data () {
      return {
        loading: true,
        loadingData: false,
        makingTransaction: false,
        referralAddress: '',
        trx: {
          hash: '',
          link: '',
        },
        referral: {
          name: '',
          link: '',
          address: '',
        },
        token: {
          name: '',
          symbol: '',
          decimals: 18,
          link: '',
          logo: '',
        },
        faucet: {
          selectedToken: null,
          tokens: faucets[process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? 'prod' : 'dev'],
        },
        account: {
          isMember: false,
          memberId: 0,
          dailyBonus: 0,
          referralBonus: 0,
          address: '',
          referral: '',
          referredAddresses: [],
          share: {
            link: '',
          },
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
      const referral = friends[this.getParam('friend')];

      if (referral) {
        this.referral = referral;
      } else {
        this.referral.address = this.getParam('referral') || '';
      }

      this.initDapp();
    },
    methods: {
      initDapp () {
        try {
          this.$store.dispatch('loadERC20');
          this.$store.dispatch('initFaucet');
          this.$store.dispatch('initDao');

          this.ready();
        } catch (e) {
          alert(e);
          this.$router.push({ path: '/' });
        }
      },
      async ready () {
        this.faucet.selectedToken = this.faucet.tokens[0];

        await this.initData();

        this.$validator.extend('eth_address', {
          getMessage: field => 'Insert a valid Ethereum address.',
          validate: value => this.dapp.web3.isAddress(value),
        });

        this.$validator.extend('not_yourself', {
          getMessage: field => 'You can\'t refer yourself.',
          validate: value => value.toLowerCase() !== this.dapp.metamask.address.toLowerCase(),
        });
      },
      async enable () {
        this.$store.dispatch('connect');
      },
      async initData () {
        this.loading = true;
        this.loadingData = true;

        await this.loadERC20Data();
        await this.getFaucetData();
        await this.getAccountData();

        this.loading = false;
      },
      async loadERC20Data () {
        try {
          this.token.name = this.faucet.selectedToken.name;
          this.token.symbol = this.faucet.selectedToken.symbol;
          this.token.decimals = this.faucet.selectedToken.decimals;
          this.token.address = this.faucet.selectedToken.address;
          this.token.link = this.dapp.network.current.etherscanLink + '/token/' + this.token.address;
          this.token.logo = this.$withBase(`/assets/images/faucet/token/${this.faucet.selectedToken.logo}`);
        } catch (e) {
          console.log(e); // eslint-disable-line no-console
          this.loading = false;
          alert('Some error occurred.');
        }
      },
      async getFaucetData () {
        try {
          this.faucet.isEnabled = await this.ethGetCall(this.dapp.instances.faucet.isEnabled, this.token.address);
          this.faucet.dailyRate = parseFloat(
            this.dapp.web3.fromWei(await this.ethGetCall(this.dapp.instances.faucet.getDailyRate, this.token.address)),
          );
          this.faucet.referralRate = parseFloat(
            this.dapp.web3.fromWei(
              await this.ethGetCall(this.dapp.instances.faucet.getReferralRate, this.token.address),
            ),
          );
          this.faucet.remainingTokens = parseFloat(
            this.dapp.web3.fromWei(
              await this.ethGetCall(this.dapp.instances.faucet.remainingTokens, this.token.address),
            ),
          );
          this.faucet.distributedTokens = parseFloat(
            this.dapp.web3.fromWei(
              await this.ethGetCall(this.dapp.instances.faucet.totalDistributedTokens, this.token.address),
            ),
          );

          this.faucet.max = this.faucet.distributedTokens + this.faucet.remainingTokens;

          this.faucet.percentage = 100 * this.faucet.distributedTokens / this.faucet.max;
        } catch (e) {
          console.log(e); // eslint-disable-line no-console
          this.loading = false;
          alert('Some error occurred.');
        }
      },
      async getAccountData () {
        try {
          if (this.dapp.metamask.address) {
            this.account.isMember = await this.ethGetCall(this.dapp.instances.dao.isMember, this.dapp.metamask.address);

            if (this.account.isMember) {
              const struct = await this.ethGetCall(
                this.dapp.instances.dao.getMemberByAddress, this.dapp.metamask.address,
              );
              this.account.member = this.formatStructure(struct);
              this.account.memberId = this.account.member.id;

              this.account.dailyBonus = 1;
              if (this.account.member.stakedTokens > 0) {
                this.account.dailyBonus *= 2;
              }
              if (this.account.member.usedTokens > 0) {
                this.account.dailyBonus *= 2;
              }

              this.account.referralBonus = 1;
              if (this.account.member.stakedTokens > 0) {
                this.account.referralBonus *= 2;
              }
              if (this.account.member.usedTokens > 0) {
                this.account.referralBonus *= 2;
              }
            } else {
              this.account.referralBonus = 0;
            }

            this.account.address = this.dapp.metamask.address;
            this.account.referral = await this.ethGetCall(this.dapp.instances.faucet.getReferral, this.account.address);
            this.account.referredAddresses = await this.ethGetCall(
              this.dapp.instances.faucet.getReferredAddresses, this.account.address,
            );
            this.account.receivedTokens = parseFloat(
              this.dapp.web3.fromWei(
                await this.ethGetCall(
                  this.dapp.instances.faucet.receivedTokens, this.account.address, this.token.address,
                ),
              ),
            );
            this.account.earnedByReferral = parseFloat(
              this.dapp.web3.fromWei(
                await this.ethGetCall(
                  this.dapp.instances.faucet.earnedByReferral, this.account.address, this.token.address,
                ),
              ),
            );
            this.account.lastUpdate = (
              await this.ethGetCall(this.dapp.instances.faucet.lastUpdate, this.account.address, this.token.address)
            ).valueOf() * 1000;
            this.account.nextClaimTime = (
              await this.ethGetCall(this.dapp.instances.faucet.nextClaimTime, this.account.address, this.token.address)
            ).valueOf() * 1000;

            this.account.share.link = window.location.origin + this.$withBase(
              `/faucet?referral=${this.account.address}`,
            );

            this.account.share.facebook = `https://www.facebook.com/sharer.php?u=${this.account.share.link}&quote=Earn FREE Tokens using FriendsFingers Faucets. Join DAO and earn more.`; // eslint-disable-line max-len
            this.account.share.twitter = `https://twitter.com/intent/tweet?url=${this.account.share.link}&hashtags=ethereum,blockchain,erc20,airdrop&text=Earn FREE Tokens using @FriendsFingers Faucets. Join DAO and earn more.`; // eslint-disable-line max-len
            this.account.share.telegram = `https://t.me/share/url?url=${this.account.share.link}&text=Earn FREE Tokens using @FriendsFingers Faucets. Join DAO and earn more.`; // eslint-disable-line max-len
            this.account.share.whatsapp = `https://wa.me/?text=Earn FREE Tokens using FriendsFingers Faucets. Join DAO and earn more. ${this.account.share.link}`; // eslint-disable-line max-len
          }
          this.loadingData = false;
        } catch (e) {
          console.log(e); // eslint-disable-line no-console
          this.loadingData = false;
          alert('Some error occurred.');
        }
      },
      getTokens () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.makingTransaction = true;

            this.dapp.instances.faucet.getTokensWithReferral(
              this.token.address,
              this.referral.address,
              {
                from: this.account.address,
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
