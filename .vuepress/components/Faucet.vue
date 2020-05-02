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
                    FriendsFingers Faucet
                </h1>
                <h4 class="text-muted">{{ $page.frontmatter.description }}</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="8" offset-lg="2">
                <ui--token-faucet></ui--token-faucet>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    name: 'Faucet',
  };
</script>
