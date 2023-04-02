<template lang="pug">
  .page(@click="click")
    Logo
</template>

<script>
import Logo from '~/components/logo/Logo';

export default {
  components: {
    Logo
  },
  data() {
    return {
      lay: 'default',
    };
  },
  methods: {
    click() {
      this.lay = 'sidebar';
    }
  },
  layout: (ctx) => {
    return ctx.lay;
  }
}
</script>

<style lang="sass">

</style>
