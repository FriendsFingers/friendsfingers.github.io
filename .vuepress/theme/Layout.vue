<template>
    <div :class="`body ${bodyClass}`">
        <site-header />
        <transition name="fade" mode="out-in">
            <component v-if="page" :is="page" :key="page"/>
        </transition>
        <site-footer />
    </div>
</template>
<script>
  import SiteHeader from './Header.vue';
  import SiteFooter from './Footer.vue';

  export default {
    components: {
      SiteHeader,
      SiteFooter,
    },
    computed: {
      page () {
        return this.$page.frontmatter.component || null;
      },
      bodyClass () {
        return this.page.toLowerCase();
      },
    },
  };
</script>
<style src="../scss/main.scss" lang="scss"/>
