<template>
    <b-row class="m-0">
        <b-col lg="10" offset-lg="1" class="text-center p-0">
            <div class="mt-4">
                <ui--social-links></ui--social-links>
            </div>
            <ul class="list-inline mt-2">
                <li class="list-inline-item">
                    <b-badge :variant="dapp.network.current.color">{{ dapp.network.current.name }}</b-badge>
                </li>
                <li class="list-inline-item">
                    <font-awesome-icon class="purple" :icon="['fab', 'ethereum']"/>
                    <b-link :href="tokenLink"
                            target="_blank">
                        <small>Shaka Token</small>
                    </b-link>
                    <font-awesome-icon class="purple" :icon="['fab', 'ethereum']"/>
                    <b-link :href="daoLink"
                            target="_blank">
                        <small>DAO</small>
                    </b-link>
                </li>
            </ul>
            <ul class="list-inline mt-2">
                <li class="list-inline-item">
                    <small>
                        &copy; 2020 🤙 FriendsFingers
                    </small>
                </li>
            </ul>
            <ul class="list-inline mt-2">
                <li class="list-inline-item">
                    <b-link :to="$withBase('/privacy')">
                        <small>Privacy</small>
                    </b-link>
                </li>
                <li class="list-inline-item">
                    <b-link :to="$withBase('/terms')">
                        <small>Terms and Conditions</small>
                    </b-link>
                </li>
                <li class="list-inline-item">
                    <b-link :to="$withBase('/faq')">
                        <small>FAQ</small>
                    </b-link>
                </li>
            </ul>
        </b-col>
    </b-row>
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
