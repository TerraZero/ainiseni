<template lang="pug">
  .page
    el-table(v-loading="loading", stripe=true, :data="toPropArray(response.routes)")
      el-table-column(prop="name", label="Route")
      el-table-column(prop="value", label="Pattern")
    el-table(v-loading="loading", stripe=true, :data="toPropArray(response.meta)")
      el-table-column(prop="name", label="Meta")
      el-table-column(prop="value", label="Value")
    el-table(v-loading="loading", stripe=true, :data="toArray(response.fields)")
      el-table-column(prop="name", label="Field")
      el-table-column(label="Attributes", v-slot="row")
        el-table(stripe=true, :data="toPropArray(row.row)")
          el-table-column(prop="name", label="Property")
          el-table-column(prop="value", label="Value")
</template>

<script>
export default {
  layout: 'admin',

  async asyncData({ params, $axios }) {
    const response = await $axios.get('/api/data/' + params.type + '/schema');

    return {
      title: 'Schema ' + params.type,
      response: response.data.content,
      loading: false,
    };
  },

  data() {
    return {
      loading: true,
    };
  },

  methods: {

    toArray(object) {
      if (Array.isArray(object)) return object;
      const array = [];
      for (const field in object) {
        array.push(object[field]);
      }
      return array;
    },

    toPropArray(object) {
      if (Array.isArray(object)) return object;
      const array = [];
      for (const name in object) {
        let value = object[name];

        switch (typeof value) {
          case 'boolean':
            value = value === true ? 'true' : 'false';
            break;
          case 'object':
            value = JSON.stringify(value);
            break;
        }

        array.push({ name, value });
      }
      return array;
    },

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
