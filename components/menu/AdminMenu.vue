<template lang="pug">
  el-menu.admin-menu(router=true, background-color="#18203e", text-color="#919bae")
    el-submenu(index="/admin/schema")
      template(slot="title")
        | Schema
      el-menu-item(index="/admin/schema/content")
        | Content
      el-menu-item(index="/admin/schema/user")
        | User
    el-submenu(index="/admin/content")
      template(slot="title")
        | Content
      el-menu-item(index="/admin/content/content")
        | Content
      el-menu-item(index="/admin/content/user")
        | User
    el-submenu(index="/admin/manage")
      template(slot="title")
        | Manage
      el-menu-item(index="/admin/manage/content")
        | Content
      el-menu-item(index="/admin/manage/user")
        | User
</template>

<style lang="sass">
.admin-menu
  min-height: 100vh
</style>
