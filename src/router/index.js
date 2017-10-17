import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import main from '@/components/main'
import home from '@/components/home'
import edit from '@/components/edit'
import list from '@/components/list'
import other from '@/components/other'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'main',
            component: main,
            children: [
                { path: '/edit', name: 'edit', component: edit },
                { path: '/list', name: 'list', component: list },
                { path: '/other', name: 'other', component: other },
                { path: '/', name: 'home', component: home }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login
        }
    ]
})