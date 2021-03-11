<template>
	<layout>
		<main-title :style="{ color: currShades[300] }">
			{{ formatColorKey(currColor) }}</main-title
		>
		<router-link class="mt-3" to="/">&lt; Go back</router-link>
		<color-list wide :colors-list="currShades">
			<template #default="{ currKey, currValue }">
				<button
					class="absolute w-6 h-6 top-4 left-4"
					title="Copy the current color hexcode"
					@click="copyCurrValue(currValue)"
				>
					<copy-icon
						class="fill-current stroke-12"
						:class="{
							'text-warm-gray-200': Number(currKey) >= 400,
							'text-warm-gray-700': Number(currKey) < 400,
						}"
						:style="{
							stroke:
								Number(currKey) < 400
									? colors.warmGray[100]
									: colors.warmGray[900],
							filter: getCurrBoxShadow(currKey),
						}"
					/>
				</button>
				<div
					class="flex flex-col items-center justify-center flex-grow space-y-1 border rounded shadow-lg border-warm-gray-700"
					:style="{
						backgroundColor: currValue,
						textShadow: getCurrTextShadow(currKey),
					}"
				>
					<strong
						class="text-3xl font-bold font-display"
						:class="{
							'text-warm-gray-50': Number(currKey) >= 400,
							'text-warm-gray-800': Number(currKey) < 400,
						}"
						>{{ currKey }}</strong
					>
					<span
						class="text-2xl"
						:class="{
							'text-warm-gray-200': Number(currKey) >= 400,
							'text-warm-gray-700': Number(currKey) < 400,
						}"
						>{{ currValue }}</span
					>
				</div>
			</template>
			<template #last>
				<custom-color v-bind="{ currColor, currShades }" />
			</template>
		</color-list>
	</layout>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { computed } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import ColorList from "@/components/molecules/ColorList.vue";
import CustomColor from "@/components/CustomColor.vue";
import colors from "windicss/colors";
import { formatColorKey } from "@/utils";
import { render as CopyIcon } from "@/assets/copySymbol.svg";
import { copyCurrValue } from "@/utils";

const currRoute = useRoute();
ref: currColor = computed(() => currRoute.params.key as keyof typeof colors);
ref: currShades = computed(
	() => colors[currColor] as Record<string | number, string>
);

const getCurrHexValue = (key: string) => {
	const hexValue = Math.round((Number(key) / 900) * 255).toString(16);
	return hexValue.length === 1 ? "0" + hexValue : hexValue;
};

const getCurrBoxShadow = (key: string) => {
	return `drop-shadow(2px 2px 6px ${colors.warmGray[900]}${getCurrHexValue(
		key
	)})`;
};

const getCurrTextShadow = (key: string) => {
	const shadow = `2px 2px 6px ${colors.warmGray[900]}${getCurrHexValue(key)}`;
	const outline = `1px 0 0 ${
		Number(key) < 400 ? colors.warmGray[100] : colors.warmGray[900]
	}AA,
		0 1px 0 ${Number(key) < 400 ? colors.warmGray[100] : colors.warmGray[900]}AA,
		-1px 0 0 ${Number(key) < 400 ? colors.warmGray[100] : colors.warmGray[900]}AA,
		0 -1px 0 ${Number(key) < 400 ? colors.warmGray[100] : colors.warmGray[900]}AA`;
	return `${outline}, ${shadow}`;
};
</script>
<style scoped>
button {
	text-shadow: inherit;
}
</style>
