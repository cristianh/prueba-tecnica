import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListaItemView from '../components/ItemVista.vue'

import FormularioView from '../components/Formulario.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/item-view/:id',
        name: 'ListaItemView',
        component: ListaItemView
    },
    {
        path: '/formulario',
        name: 'FormularioView',
        component: FormularioView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router