<template lang="pug">
.logo(:class="modifierd", @click="doState()")
  .logo__letter(v-for="letter, index in name", :style="getLetterStyle(letter, index)")
    | {{ letter }}
</template>

<script>
export default {
  data() {
    return {
      classes: [],
      name: 'INSANE II',
      chaosOrder: [3, 2, 5, 0, 7, 6, 4, 8, 1],
    };
  },

  computed: {
    modifierd() {
      return this.classes.map((v) => 'logo--' + v);
    },
  },

  methods: {
    getLetterStyle(letter, index) {
      if (this.classes.indexOf('order') === -1) {
        return {
          left: (100 / this.name.length * this.chaosOrder[index]) + '%',
          width: (100 / this.name.length) + '%',
        };
      } else {
        return {
          left: (100 / this.name.length * index) + '%',
          width: (100 / this.name.length) + '%',
        };
      }
    },
    doState() {
      if (this.classes.indexOf('init') === -1) {
        this.doInit();
      } else if (this.classes.indexOf('order') === -1) {
        this.doOrder();
      }
    },
    doInit() {
      this.classes.push('init');
    },
    doOrder() {
      this.classes.push('order');
    },
  },
}
</script>

<style lang="sass">
.logo
  width: 100vw
  height: 100vh
  font-size: 300px
  position: relative
  background: black
  color: white

  &__letter
    display: flex
    position: absolute
    justify-content: center
    height: 100%
    align-items: center
    opacity: 0

    @for $i from 1 through 9
      &:nth-child(#{$i})
        transition: all 1s ($i * .4s) ease-in-out

  &--init &__letter
    opacity: 1

  &--order &__letter

    @for $i from 1 through 9
      @if $i % 2 == 0
        &:nth-child(#{$i})
          transition: all 1s ($i * .2s) ease-in-out
      @else
        &:nth-child(#{$i})
          transition: all 1s ($i * .1s) ease-in-out

</style>
