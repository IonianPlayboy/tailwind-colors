import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
// const AddParty = () => import("@/views/party/add/index.vue");

const routes = [
	{ path: "/", component: Home },
	// { path: "/party/add", component: AddParty },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
