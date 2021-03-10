/* eslint-disable*/
declare module "*.vue" {
	import { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
declare module "*.svg" {
	import { DefineComponent } from "vue";
	// NOTE: Add Component type for plugin added component
	const render: DefineComponent<{}, {}, any>;
	export { render };
	// const src: string;
	// export default src;
}
