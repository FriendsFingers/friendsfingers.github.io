<template>
    <b-row>
        <b-col v-if="trx.hash" md="12" class="mb-2">
            <b-alert show variant="success" class="mt-3">
                Last transaction:
                <b-link :href="trx.link" target="_blank">{{ trx.hash }}</b-link>
            </b-alert>
        </b-col>

        <b-col md="8" class="mb-4">
            <b-card no-body class="text-center">
                <b-card-body>
                    <ui--member-image :member="account.member"></ui--member-image>
                </b-card-body>
            </b-card>
        </b-col>

        <b-col md="4" class="mb-4">
            <b-card no-body>
                <b-card-header>
                    Member #{{ account.member.id }}

                    <div class="float-right">
                        <b-badge v-if="account.member.approved"
                                 v-b-tooltip.hover
                                 title="Verified"
                                 variant="success"
                                 pill
                                 class="p-1">
                            <font-awesome-icon icon="check-circle"></font-awesome-icon>
                        </b-badge>
                        <!--
                        <b-badge v-else
                                 v-b-tooltip.hover
                                 title="Not approved"
                                 variant="danger"
                                 pill
                                 class="p-1">
                            <font-awesome-icon icon="exclamation-circle"></font-awesome-icon>
                        </b-badge>
                        -->
                    </div>
                </b-card-header>

                <b-list-group flush>
                    <b-list-group-item>
                        Address:
                        <b-link :href="`${dapp.network.current.etherscanLink}/address/${account.member.address}`"
                                target="_blank">
                            {{ account.member.address | truncate(10) }}
                        </b-link>
                    </b-list-group-item>
                    <b-list-group-item>
                        Balance: <b>{{ account.tokenBalance }} {{ token.symbol }}</b>
                    </b-list-group-item>
                    <b-list-group-item>
                        Staked: <b>{{ account.member.stakedTokens }} {{ token.symbol }}</b>
                    </b-list-group-item>
                    <b-list-group-item>
                        Used: <b>{{ account.member.usedTokens }} {{ token.symbol }}</b>
                    </b-list-group-item>
                </b-list-group>

                <b-card-footer>
                    <small>Since: {{ account.member.creationDate | formatLocaleDate }}</small>
                </b-card-footer>
            </b-card>

            <b-card v-if="account.member.address === dapp.metamask.address"
                    :header="`Stake ${token.symbol}`"
                    class="mt-4">
                <b-form @submit.prevent="stake">
                    <b-input-group>
                        <b-form-input
                                id="stakeAmount"
                                name="stakeAmount"
                                :disabled="makingTransaction"
                                v-model.trim="stakeAmount"
                                v-validate="{ required: true, numeric: true, min_value: 1, max_value: account.tokenBalance }"
                                data-vv-as="stake amount"
                                :class="{'is-invalid': errors.has('stakeAmount')}">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="makingTransaction" type="submit" variant="primary">Stake</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <small v-show="errors.has('stakeAmount')" class="text-danger">
                        {{ errors.first('stakeAmount') }}
                    </small>
                </b-form>
            </b-card>

            <b-card v-if="account.member.address === dapp.metamask.address"
                    :header="`Unstake ${token.symbol}`"
                    class="mt-4">
                <b-form @submit.prevent="unstake">
                    <b-input-group>
                        <b-form-input
                                id="unstakeAmount"
                                name="unstakeAmount"
                                :disabled="makingTransaction"
                                v-model.trim="unstakeAmount"
                                v-validate="{ required: true, numeric: true, min_value: 1, max_value: account.member.stakedTokens }"
                                data-vv-as="unstake amount"
                                :class="{'is-invalid': errors.has('unstakeAmount')}">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="makingTransaction" type="submit" variant="primary">Unstake</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <small v-show="errors.has('unstakeAmount')" class="text-danger">
                        {{ errors.first('unstakeAmount') }}
                    </small>
                </b-form>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
  export default {
    name: 'MemberDetails',
    props: [
      'account',
      'token',
    ],
    data () {
      return {
        makingTransaction: false,
        stakeAmount: '',
        unstakeAmount: '',
        trx: {
          hash: '',
          link: '',
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
    methods: {
      stake () {
        this.$validator.validate('stakeAmount').then((result) => {
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

              this.dapp.instances.token.transferAndCall(
                this.dapp.instances.dao.address,
                this.dapp.web3.toWei(this.stakeAmount),
                {
                  from: this.dapp.metamask.address,
                  to: this.token.address,
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
      unstake () {
        this.$validator.validate('unstakeAmount').then((result) => {
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

              this.dapp.instances.dao.unstake(
                this.dapp.web3.toWei(this.unstakeAmount),
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
