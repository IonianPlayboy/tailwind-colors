<template>
	<layout>
		<main-title> Welcome to Tailwind Colors ! </main-title>
		<h2 class="mt-8 text-xl font-body text-warm-gray-300 md:text-2xl">
			Browse the base palette colors :
		</h2>
		<colors-list
			small-items
			:colors-list="colorPalette"
			:basic-colors="basicColors"
		>
			<template #default="{ currKey, currValue }">
				<router-link
					class="flex items-center justify-center flex-grow rounded shadow-lg"
					:style="{ backgroundColor: currValue[700] }"
					:to="`/color/${currKey}`"
					>{{ formatColorKey(currKey) }}</router-link
				>
			</template>
			<template #basic="{ currKey, currValue }">
				<button
					class="flex items-center justify-center flex-grow font-bold rounded"
					:style="{
						backgroundColor: currValue,
						...getBasicColorStyle(currKey),
					}"
					@click="copyCurrValue(currValue)"
				>
					{{ formatColorKey(currKey) }}
				</button>
			</template>
		</colors-list>
		<h2 class="mt-8 text-xl font-body text-warm-gray-300 md:text-2xl">
			Create your own colors :
		</h2>
		<section class="grid grid-cols-2 gap-6 mt-6">
			<custom-color standalone @colorValidated="addCustomShade($event)">
				Generate a custom shade for one of the base colors
			</custom-color>
			<button
				class="px-4 py-4 text-lg font-bold border rounded shadow-md font-display bg-warm-gray-700 border-true-gray-800"
				@click="wipText = 'Coming soon™. :)'"
			>
				{{ wipText }}
			</button>
		</section>
		<h3
			v-if="customColorsInfos.length"
			class="mt-8 text-lg font-body text-warm-gray-300 md:text-xl"
		>
			Your custom shades :
		</h3>
		<colors-list
			v-if="customColorsInfos.length"
			wide
			:colors-list="customColorsInfos"
		>
			<template #default="{ currValue }">
				<color-item v-bind="currValue" />
			</template>
		</colors-list>
	</layout>
</template>

<script lang="ts">
import colors from "windicss/colors";
</script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import ColorsList from "@/components/molecules/ColorsList.vue";
import ColorItem from "@/components/organisms/ColorItem.vue";
import CustomColor from "@/components/CustomColor.vue";

import { formatColorKey, copyCurrValue } from "@/utils";
import { useCustomColors } from "@/hooks";

const colorPalette = Object.entries(colors)
	.filter(([key, _value]) => key !== "white" && key !== "black")
	.reduce(
		(result, [key, value]) => ({ ...result, [key]: value }),
		{} as Omit<typeof colors, "white" | "black">
	);
const basicColors = Object.entries(colors)
	.filter(([key, _value]) => key === "white" || key === "black")
	.reduce(
		(result, [key, value]) => ({ ...result, [key]: value }),
		{} as Pick<typeof colors, "white" | "black">
	);
const getBasicColorStyle = (color: "white" | "black") =>
	color === "black"
		? {}
		: {
				color: colorPalette.warmGray[900],
				textShadow: `2px 2px
						6px ${colorPalette.warmGray[300]}`,
		  };

const { customColorsInfos, addCustomShade } = useCustomColors();

ref: wipText = "Generate all shades for a given color";
</script>
<style scoped>
button {
	text-shadow: inherit;
}

input[type="number"] {
	-moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
