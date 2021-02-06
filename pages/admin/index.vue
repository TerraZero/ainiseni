<template lang="pug">
  .page(@click="click")
    h1
      | HALLO
</template>

<script>
export default {
  layout: 'admin',

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
}
</script>

<style lang="sass">

</style>
