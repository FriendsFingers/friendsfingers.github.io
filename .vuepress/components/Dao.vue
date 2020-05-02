<template>
    <b-container>
        <b-row class="masthead m-4">
            <b-col lg="8" offset-lg="2">
                <h1 class="display-5">
                    <b-img :src="$withBase('/assets/images/logo/friendsfingers.svg')"
                           rounded="circle"
                           height="64"
                           :alt="$site.title"/>
                    <br>
                    FriendsFingers DAO
                </h1>
                <template v-if="!loading">
                    <b-btn v-if="!account.isMember"
                           :to="$withBase('/dashboard')"
                           variant="primary"
                           size="lg"
                           class="my-2">
                        Join DAO
                    </b-btn>
                    <h4 class="text-muted">
                        <b>{{ dao.membersNumber }}</b> DAO Members<br>
                        <b>{{ dao.totalStakedTokens }} {{ token.symbol }}</b> Staked<br>
                        <template v-if="dao.totalUsedTokens > 0">
                            <b>{{ dao.totalUsedTokens }} {{ token.symbol }}</b> Used
                        </template>
                    </h4>
                </template>
            </b-col>
        </b-row>
        <b-row v-if="!loading">
            <b-col lg="10" offset-lg="1">
                <b-row class="mt-2">
                    <b-col md="2" sm="4" cols="6" v-for="item in memberList" :key="item.id" class="p-2">
                        <b-card no-body>
                            <b-card-body>
                                <b-link :to="{ path: '/member/', query: { ref: item.id } }">
                                    <ui--member-image :member="item"></ui--member-image>
                                </b-link>
                            </b-card-body>

                            <b-card-footer>
                                #{{ item.id }}

                                <div class="float-right">
                                    <b-badge v-if="item.approved"
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
                            </b-card-footer>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row class="my-5" v-if="memberList.length < dao.membersNumber">
                    <b-col md="12" class="text-center">
                        <b-btn variant="outline-primary"
                               size="lg"
                               @click="loadMore">
                            Load more
                        </b-btn>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <template v-else>
            <ui--loader :loading="true"></ui--loader>
        </template>
    </b-container>
</template>

<script>
  import utils from '../mixins/utils.mixin';

  export default {
    name: 'Dao',
    mixins: [
      utils,
    ],
    data () {
      return {
        loading: true,
        pagination: {
          page: 1,
          limit: 12,
        },
        memberList: [],
        token: {
          name: '',
          symbol: '',
          decimals: 18,
          link: '',
          logo: '',
        },
        dao: {
          membersNumber: 0,
          totalStakedTokens: 0,
          totalUsedTokens: 0,
        },
        account: {
          isMember: false,
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
      this.memberId = this.getParam('id');

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
        await this.getDaoData();
        await this.getTokenData();

        this.loading = false;

        await this.getMember(this.dao.membersNumber);
      },
      loadMore () {
        this.pagination.page++;
        this.getMember(this.dao.membersNumber - this.memberList.length);
      },
      async getDaoData () {
        try {
          this.dao.membersNumber = parseInt((await this.ethGetCall(this.dapp.instances.dao.membersNumber)).valueOf());
          this.dao.totalStakedTokens = parseFloat(
            this.dapp.web3.fromWei(
              await this.ethGetCall(this.dapp.instances.dao.totalStakedTokens),
            ),
          );
          this.dao.totalUsedTokens = parseFloat(
            this.dapp.web3.fromWei(
              await this.ethGetCall(this.dapp.instances.dao.totalUsedTokens),
            ),
          );

          if (this.dapp.metamask.address) {
            this.account.isMember = await this.ethGetCall(this.dapp.instances.dao.isMember, this.dapp.metamask.address);
          }
        } catch (e) {
          this.loading = false;
          console.log(e); // eslint-disable-line no-console
          alert('Some error occurred.');
        }
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
      async getMember (memberId) {
        const struct = await this.ethGetCall(this.dapp.instances.dao.getMemberById, memberId);
        const member = this.formatStructure(struct);

        this.memberList.push(member);

        if (
          this.memberList.length % (this.pagination.limit * this.pagination.page) !== 0 &&
          this.memberList.length < this.dao.membersNumber
        ) {
          this.getMember(this.dao.membersNumber - this.memberList.length);
        }
      },
    },
  };
</script>
