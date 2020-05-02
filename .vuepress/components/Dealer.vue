<template>
    <b-container>
        <b-row class="masthead m-4">
            <b-col lg="8" offset-lg="2">
                <h1 class="display-5">
                    <b-img :src="$withBase('/assets/images/logo/shaka_logo_white.png')"
                           rounded="circle"
                           height="64"
                           :alt="$site.title"/>
                    <br>
                    Shaka Tokens Dealer
                </h1>
                <h4 class="text-muted">{{ $page.frontmatter.description }}</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="8" offset-lg="2">
                <ui--token-dealer></ui--token-dealer>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    name: 'Dealer',
  };
</script>
