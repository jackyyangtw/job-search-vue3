import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/HomeView.vue")
    },
    {
        path: "/jobs/results",
        name: "JobResults",
        component: () => import("@/views/JobResultsView.vue")
    },
    {
        path: "/jobs/results/:id",
        name: "JobListing",
        component: () => import("@/views/JobView.vue")
    },
    {
        path: "/teams",
        name: "Teams",
        component: () => import("@/views/TeamsView.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0, left: 0, behavior: "smooth" }
    }
})

export default router
