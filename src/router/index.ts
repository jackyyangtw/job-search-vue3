import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import JobResultsView from "@/views/JobResultsView.vue"
import JobView from "@/views/JobView.vue"
import TeamsViewVue from "@/views/TeamsView.vue"

const routes = [
  {
    path: "/job-search-vue3",
    name: "Home",
    component: HomeView
  },
  {
    path: "/job-search-vue3/jobs/results",
    name: "JobResults",
    component: JobResultsView
  },
  {
    path: "/job-search-vue3/jobs/results/:id",
    name: "JobListing",
    component: JobView
  },
  {
    path: "/job-search-vue3/teams",
    name: "Teams",
    component: TeamsViewVue
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
