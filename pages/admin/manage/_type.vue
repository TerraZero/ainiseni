<template lang="pug">
  .page
    el-form(:model="form")
      el-form-item(label="Name")
        el-input(v-model="form.name")
      el-form-item(label="Key")
        el-input(v-model="form.key")
      el-form-item(label="Type")
        el-select(v-model="form.type")
          el-option(label="Text", value="text")
      el-row
        el-button(type="primary", @click="submit", plain)
          | Create Field
</template>

<script>
export default {
  layout: 'admin',

  async asyncData({ params, $axios }) {
    const response = await $axios.get('/api/data/' + params.type);

    return {
      type: params.type,
      title: 'Add field to ' + params.type,
      table: response.data.content,
      loading: false,
    };
  },

  data() {
    return {
      form: {
        name: '',
        key: '',
        type: '',
      }
    };
  },

  methods: {

    async submit() {
      console.log('submit');
      try {
        const response = await this.$axios.$post('/api/data/schema/add', {
          type: 'field',
          from: this.type,
          field: this.form,
        });
        if (response.meta.status !== 200) {
          this.$notify.error({
            title: 'Error ' + response.meta.error.code,
            message: response.meta.error.message,
          });
        } else {
          this.$notify({
            title: 'Success',
            message: 'Create field successful',
            type: 'success',
          });
        }
      } catch (e) {
        console.log(e);
      }
    },

  },

  mounted () {
    this.$store.commit('meta/SET_PAGE_TITLE', this.title);
  },

}

</script>

<style lang="sass">

</style>
