import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import main from '@/components/main'
import home from '@/components/home'
import edit from '@/components/edit'
import list from '@/components/list'
import other from '@/components/other'
import login from '@/components/login'
import tree from '@/components/tree'
import test from '@/components/test/index'
import nextTick from '@/components/test/nextTick'

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
        },
        {
            path: '/tree',
            name: 'tree',
            component: tree
        },
        {
            path: '/test',
            name: 'test',
            component: test,
            children: [
                {path: '/test/nextTick', name: 'nextTick', component: nextTick}
            ]
        }
    ]
})