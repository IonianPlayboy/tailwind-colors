import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
const Color = () => import("@/views/Color.vue");
const ErrorPage = () => import("@/views/Error.vue");

const routes = [
	{ path: "/", component: Home },
	{ path: "/color/:key", component: Color },
	{ path: "/:catchAll(.*)", component: ErrorPage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
