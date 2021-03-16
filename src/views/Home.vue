<template>
	<layout>
		<main-title> Welcome to Tailwind Colors ! </main-title>
		<h2 class="mt-8 font-body text-xl text-warm-gray-300 md:text-2xl">
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
		<h2 class="mt-8 font-body text-xl text-warm-gray-300 md:text-2xl">
			Create your own colors :
		</h2>
		<section class="grid mt-6 gap-6 grid-cols-2">
			<button
				v-if="state === 'inactive'"
				class="px-4 py-4 text-lg font-display font-bold border rounded shadow-md bg-warm-gray-700 border-true-gray-800"
				@click="state = 'choosing'"
			>
				Generate a custom shade for one of the base colors
			</button>
			<color-input
				v-if="state === 'choosing'"
				v-model="currInput"
				type="text"
				:custom-color="customColor ?? ''"
				:shade-number="currShade ?? 0"
				@buttonClicked="state = 'done'"
			/>
			<color-item
				v-if="state === 'done'"
				editable
				:hex-code="customColor"
				:shade-number="currShade"
				@colorEdited="state = 'choosing'"
			/>
			<button
				class="px-4 py-4 text-lg font-display font-bold border rounded shadow-md bg-warm-gray-700 border-true-gray-800"
				@click="wipText = 'Coming soon™. :)'"
			>
				{{ wipText }}
			</button>
		</section>
	</layout>
</template>

<script lang="ts">
import colors from "windicss/colors";
</script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import ColorsList from "@/components/molecules/ColorsList.vue";
import ValidateButton from "@/components/molecules/ValidateButton.vue";
import ColorInput from "@/components/molecules/ColorInput.vue";
import ColorItem from "@/components/organisms/ColorItem.vue";

import {
	formatColorKey,
	copyCurrValue,
	adjustColor,
	findClosestShade,
} from "@/utils";
import { computed } from "@vue/runtime-core";
import { watchEffect } from "vue";

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

ref: state = "inactive" as "inactive" | "choosing" | "done";
ref: currInput = "";
ref: customColor = null as null | string;
ref: currColorName = computed(() => {
	if (!currInput) return null;
	const [currMatch] = currInput.match(/[-\w]+(?=(-\d+))/) ?? [];
	if (!currMatch) return null;
	return currMatch.replace(/-\w/, (match) =>
		match.toUpperCase().replace("-", "")
	);
});
ref: currShade = computed(() => {
	if (!currInput) return null;
	const [currMatch] = currInput.match(/\d+/) ?? [];
	if (!currMatch) return null;
	return Number(currMatch);
});

watchEffect(() => {
	if (!currInput || !currShade || !currColorName) return;
	const foundShades = colors[currColorName as keyof typeof colors] as Record<
		string | number,
		string
	>;
	console.log(Object.keys(colors));
	console.log(foundShades);
	if (!foundShades) return;
	const foundCurrShade = foundShades[currShade];
	if (foundCurrShade) return (customColor = foundCurrShade);
	const closestShade = findClosestShade(currShade, foundShades);
	const nearestShade = findClosestShade(currShade, foundShades, closestShade);
	console.log(closestShade, nearestShade);
	customColor = adjustColor(
		foundShades[closestShade],
		foundShades[nearestShade],
		closestShade - currShade
	);
});

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
