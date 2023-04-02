import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator/dist/vfg-core.js';
import MyVueFormGenerator from './formGenerator.vue';

VueFormGenerator.component = MyVueFormGenerator;
Vue.use(VueFormGenerator);