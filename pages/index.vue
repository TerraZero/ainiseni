<template lang="pug">
  .page(@click="click")
    h1
      | HALLO
</template>

<script>
export default {
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
