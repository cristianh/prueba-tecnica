import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import Formulario from './components/Formulario.vue'
import FormularioBusqueda from './components/FormularioBusqueda.vue'
import Lista from './components/Lista.vue'
import ListaItems from './components/ListaItems.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.component('formulario', Formulario)
Vue.component('formularioBusqueda', FormularioBusqueda)
Vue.component('lista', Lista)
Vue.component('listaItems', ListaItems)

Vue.config.productionTip = false



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')