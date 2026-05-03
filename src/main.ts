import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import {createPinia} from "pinia";
import LoginView from "./views/LoginView.vue";
import './assets/global.css'
import RegisterView from "./views/RegisterView.vue";
import OverviewView from "./views/OverviewView.vue";
import HistoryView from "./views/HistoryView.vue";
import SettingsView from "./views/SettingsView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/overview'},
        {path: '/login', component: LoginView, meta: {guest: true}},
        {path: '/register', component: RegisterView, meta: {guest: true}},
        {path: '/overview', component: OverviewView, meta: {requiresAuth: true}},
        {path: '/history', component: HistoryView, meta: {requiresAuth: true}},
        {path: '/settings', component: SettingsView, meta: {requiresAuth: true}},
    ]
})

router.beforeEach((to) => {
    const token = localStorage.getItem('accessToken')
    if (to.meta.requiresAuth && !token) return '/login'
    if (to.meta.guest && token) return '/overview'
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
