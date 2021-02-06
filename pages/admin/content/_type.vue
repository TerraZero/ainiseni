<template lang="pug">
  .page
    el-table(v-loading="loading", stripe=true, :data="table")
      el-table-column(prop="id", label="ID")
      el-table-column(prop="title", label="Title")
      el-table-column(label="Operation")
        template(v-slot:default="row")
          el-dropdown(split-button, type="primary", trigger="click", @click="operation('view', row.row)")
            | View
            el-dropdown-menu(slot="dropdown")
              el-dropdown-item(@click.native="operation('edit', row.row)") Edit
              el-dropdown-item(@click.native="operation('delete', row.row)") Delete
</template>

<script>
export default {
  layout: 'admin',

  async asyncData({ params, $axios }) {
    const response = await $axios.get('/api/data/' + params.type);

    return {
      title: 'Content ' + params.type,
      table: response.data.content,
      loading: false,
    };
  },

  data() {
    return {
      loading: true,
    };
  },

  methods: {

    operation(op, row) {
      console.log(op, row.type + ':', row.title + '[' + row.id + ']');
    },

  },

  mounted () {
    this.$store.commit('meta/SET_PAGE_TITLE', this.title);
  },

}

</script>

<style lang="sass">

</style>
