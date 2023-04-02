<template lang="pug">
  .page(@click="click")
    form
      vue-form-generator(:schema="schema", :model="model", :options="formOptions", tag="details")
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      model: {
        id: 1,
        name: 'John Doe',
        password: 'J0hnD03!x4',
        skills: ['Javascript', 'VueJS'],
        email: 'john.doe@gmail.com',
        status: true
      },
      schema: {
        groups: [
          {
            legend: 'User Details',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'ID (disabled text field)',
                model: 'id',
                readonly: true,
                disabled: true
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Name',
                model: 'name',
                id: 'user_name',
                placeholder: 'Your name',
                featured: true,
                required: true
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'E-mail',
                model: 'email',
                placeholder: 'User\'s e-mail address',
                validator: 'email',
              },
              {
                type: 'input',
                inputType: 'password',
                label: 'Password',
                model: 'password',
                min: 6,
                required: true,
                hint: 'Minimum 6 characters',
                validator: 'string'
              }
            ]
          },
          {
            legend: 'Skills & Status',
            fields: [
              {
                type: 'select',
                label: 'Skills',
                model: 'skills',
                values: ['Javascript', 'VueJS', 'CSS3', 'HTML5']
              },
              {
                type: 'checkbox',
                label: 'Status',
                model: 'status',
                default: true
              }
            ]
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      },
    };
  },
  methods: {
    click() {
      this.schema.groups[0].fields.push({
        type: 'input',
        inputType: 'text',
        label: 'Name',
        model: 'name',
        id: 'user_name',
        placeholder: 'Your name',
        featured: true,
        required: true
      });
    }
  },

  mounted () {
    this.$store.commit('meta/SET_PAGE_TITLE', 'TEST');
  },
}
</script>

<style lang="sass">

</style>
