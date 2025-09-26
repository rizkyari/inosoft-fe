import { createWebHashHistory, createRouter, createWebHistory } from "vue-router";

const ListInspection = () => import('@/pages/ListInspection.vue')
const CreateInspection = () => import('@/pages/CreateInspection.vue')

const routes = [
    { path: '/', redirect: '/inspections' },
    { path: '/inspections', name: 'Inspections', component: ListInspection},
    { path: '/inspections/new', name: 'CreateInspection', component: CreateInspection},
    { path: '/:pathMatch(.*)*' , redirect: '/inspections'},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {return { top: 0}}
})

export default router;