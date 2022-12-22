import Vue from "vue";
import App from "./App.vue";
import { createPinia, PiniaVuePlugin } from 'pinia'
import { VBTogglePlugin } from 'bootstrap-vue'

Vue.use(PiniaVuePlugin)
	.use(VBTogglePlugin);

const pinia = createPinia();

new Vue({
	render: (h) => h(App),
	pinia
}).$mount("#app")
