<template lang="pug">
  el-container.admin
    el-aside.admin__aside
      AdminMenu
    el-container.admin__content
      el-header.admin__header
        h1
          | {{$store.state.meta.pageTitle}}
      el-main.admin__main
        Nuxt
</template>

<script>
import AdminMenu from '~/components/menu/AdminMenu';

export default {
  components: {
    AdminMenu,
  }
}
</script>

<style lang="sass">
.admin

  &__aside,
  &__content
    height: 100vh

  &__header
    display: flex
    align-items: center
    background-color: #b3c0d1
</style>
