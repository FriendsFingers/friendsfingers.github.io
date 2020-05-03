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
                            <font-awesome-icon class="purple" :icon="['fab', 'ethereum']"/>
                            <b-link :href="tokenLink" class="text-light" target="_blank">
                                Shaka Token
                            </b-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <font-awesome-icon class="purple" :icon="['fab', 'ethereum']"/>
                            <b-link :href="daoLink" class="text-light" target="_blank">
                                DAO
                            </b-link>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
                <b-col lg="4" class="text-center">
                    <div class="mt-4">
                        <ui--social-links></ui--social-links>
                    </div>
                    <b-list-group flush class="mt-4">
                        <b-list-group-item>
                            <small>&copy; 2020 🤙 FriendsFingers</small>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
                <b-col lg="4">
                    <b-list-group flush class="mt-4">
                        <b-list-group-item>
                            <b-link :to="$withBase('/privacy')" class="text-light">
                                Privacy
                            </b-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <b-link :to="$withBase('/terms')" class="text-light">
                                Terms and Conditions
                            </b-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <b-link :to="$withBase('/faq')" class="text-light">
                                FAQ
                            </b-link>
                        </b-list-group-item>
                    </b-list-group>
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
