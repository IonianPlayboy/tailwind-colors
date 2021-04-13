import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
const Color = () => import("@/views/Color.vue");
const Theme = () => import("@/views/Theme.vue");
const ErrorPage = () => import("@/views/Error.vue");

const routes = [
	{ path: "/", component: Home },
	{ path: "/theme/:key", component: Theme },
	{ path: "/color/:key", component: Color },
	{ path: "/:catchAll(.*)", component: ErrorPage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
