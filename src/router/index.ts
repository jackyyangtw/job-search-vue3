import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "@/views/HomeView.vue";
// import JobResultsView from "@/views/JobResultsView.vue";
// import JobView from "@/views/JobView.vue";
// import TeamsView from "@/views/TeamsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: () => import("@/views/JobResultsView.vue"),
  },
  {
    path: "/jobs/results/:id",
    name: "JobListing",
    component: () => import("@/views/JobView.vue"),
  },
  {
    path: "/teams",
    name: "Teams",
    component: () => import("@/views/TeamsView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  }
});

export default router;