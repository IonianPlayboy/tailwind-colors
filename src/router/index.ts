import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
const Color = () => import("@/views/Color.vue");

const routes = [
	{ path: "/", component: Home },
	{ path: "/color/:key", component: Color },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
