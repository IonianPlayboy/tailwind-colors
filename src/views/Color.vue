<template>
	<layout>
		<main-title :style="{ color: currShades[300] }">
			{{ formatColorKey(currColor) }}</main-title
		>
		<router-link class="mt-3" to="/">&lt; Go back</router-link>
		<colors-list
			wide
			:colors-list="currShades"
			:custom-colors="customShades"
		>
			<template #default="{ currKey, currValue }">
				<color-item
					:hex-code="currValue"
					:shade-number="Number(currKey)"
				/>
			</template>
			<template #custom="{ currKey, currValue }">
				<color-item
					editable
					:hex-code="currValue"
					:shade-number="Number(currKey)"
				/>
			</template>
			<template #last>
				<custom-color
					small
					v-bind="{ currColor, currShades }"
					@colorValidated="addCustomShade($event)"
				>
					Create your own...
				</custom-color>
			</template>
		</colors-list>
	</layout>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { computed } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import ColorsList from "@/components/molecules/ColorsList.vue";
import ColorItem from "@/components/organisms/ColorItem.vue";
import CustomColor from "@/components/CustomColor.vue";
import colors from "windicss/colors";
import { formatColorKey } from "@/utils";

const currRoute = useRoute();
ref: currColor = computed(() => currRoute.params.key as keyof typeof colors);
ref: currShades = computed(
	() => colors[currColor] as Record<string | number, string>
);
ref: customShades = {} as Record<string, string>;

const addCustomShade = ({
	colorName,
	shadeNumber,
	hexCode,
}: {
	colorName: string;
	shadeNumber: number;
	hexCode: string;
}) => {
	customShades[shadeNumber] = hexCode;
};
</script>
<style scoped>
button {
	text-shadow: inherit;
}
</style>
