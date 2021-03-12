<template>
	<layout>
		<main-title :style="{ color: currShades[300] }">
			{{ formatColorKey(currColor) }}</main-title
		>
		<router-link class="mt-3" to="/">&lt; Go back</router-link>
		<colors-list wide :colors-list="currShades">
			<template #default="{ currKey, currValue }">
				<color-item
					:hex-code="currValue"
					:shade-number="Number(currKey)"
				/>
			</template>
			<template #last>
				<custom-color v-bind="{ currColor, currShades }" />
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
</script>
<style scoped>
button {
	text-shadow: inherit;
}
</style>
