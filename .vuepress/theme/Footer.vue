<template>
    <footer class="footer container-fluid mt-5 p-5 bg-dark text-white">
        <b-container>
            <b-row>
                <b-col lg="4">
                    <b-list-group flush class="mt-4">
                        <b-list-group-item>
                            <b-badge :variant="dapp.network.current.color">{{ dapp.network.current.name }}</b-badge>
                        </b-list-group-item>
                        <b-list-group-item>
                            <font-awesome-icon class="peach" :icon="['fab', 'ethereum']"/>
                            <b-link :href="tokenLink" class="text-light" target="_blank">
                                Explore Shaka Contract
                            </b-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <font-awesome-icon class="peach" :icon="['fab', 'ethereum']"/>
                            <b-link :href="daoLink" class="text-light" target="_blank">
                                Explore DAO Contract
                            </b-link>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
                <b-col lg="4">
                    <b-list-group flush class="mt-4">
                        <b-list-group-item>
                            <b-link :to="$withBase('/dao')" class="text-light">
                                DAO
                            </b-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <b-link :to="$withBase('/Dealer')" class="text-light">
                                Dealer
                            </b-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <b-link :to="$withBase('/Faucet')" class="text-light">
                                Faucet
                            </b-link>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
                <b-col lg="4">
                    <b-list-group flush class="mt-4">
                        <b-list-group-item>
                            <b-link :to="$withBase('/privacy')" class="text-light">
                                <small>Privacy</small>
                            </b-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <b-link :to="$withBase('/terms')" class="text-light">
                                <small>Terms and Conditions</small>
                            </b-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <b-link :to="$withBase('/faq')" class="text-light">
                                <small>FAQ</small>
                            </b-link>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="12">
                    <hr>
                    <div class="mt-4 text-center">
                        <ui--social-links></ui--social-links>

                        <small>&copy; 2020 🤙 FriendsFingers</small>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </footer>
</template>

<script>
  export default {
    name: 'Footer',
    computed: {
      dapp: {
        get () {
          return this.$store.getters.dapp;
        },
      },
      tokenLink: {
        get () {
          return `${this.dapp.network.current.etherscanLink}/token/${__TOKEN_ADDRESS__}`;
        },
      },
      daoLink: {
        get () {
          return `${this.dapp.network.current.etherscanLink}/address/${__DAO_ADDESS__}`;
        },
      },
    },
  };
</script>
