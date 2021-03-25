<template>
	<layout>
		<main-title> Welcome to Tailwind Colors ! </main-title>
		<h2 class="mt-8 text-xl font-body text-warm-gray-300 md:text-2xl">
			Browse the base palette colors :
		</h2>
		<default-colors-list />
		<h2 class="mt-8 text-xl font-body text-warm-gray-300 md:text-2xl">
			Create your own colors :
		</h2>
		<section class="grid grid-cols-2 gap-6 mt-6">
			<custom-color standalone @colorValidated="addCustomShade($event)">
				Generate a custom shade for one of the base colors
			</custom-color>
			<button
				class="px-4 py-6 text-lg font-bold border rounded shadow-md font-display bg-warm-gray-700 border-true-gray-800 md:text-xl"
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
		<ul v-if="baseColor" class="flex items-center">
			<li
				v-for="({ hexCode, rgb }, shadeNumber) in baseColor"
				:key="`base${hexCode}${shadeNumber}`"
				class="h-20 w-45"
				:class="{
					'text-warm-gray-50': shadeNumber >= 400,
					'text-warm-gray-800': shadeNumber < 400,
				}"
				:style="{ backgroundColor: hexCode }"
			>
				{{ shadeNumber }}
				<br />
				{{ hexCode }}
				<br />
				<div>
					<span v-for="(value, key) in rgb" :key="`base${key}`">
						{{ key.charAt(0) }}{{ value }}
					</span>
				</div>
			</li>
		</ul>
		<ul v-if="testColor" class="flex items-center">
			<li
				v-for="({ hexCode, rgb }, shadeNumber) in testColor"
				:key="`base${hexCode}${shadeNumber}`"
				class="h-20 w-45"
				:class="{
					'text-warm-gray-50': shadeNumber >= 400,
					'text-warm-gray-800': shadeNumber < 400,
				}"
				:style="{ backgroundColor: hexCode }"
			>
				{{ shadeNumber }}
				<br />
				{{ hexCode }}
				<br />
				<div>
					<span v-for="(value, key) in rgb" :key="`base${key}`">
						{{ key.charAt(0) }}{{ value }}
					</span>
				</div>
			</li>
		</ul>
		<ul class="flex items-center">
			<li
				v-for="({ hexCode, rgb }, shadeNumber) in generatedColor"
				:key="`generated${hexCode}${shadeNumber}`"
				class="h-20 w-30"
				:class="{
					'text-warm-gray-50': shadeNumber >= 400,
					'text-warm-gray-800': shadeNumber < 400,
				}"
				:style="{ backgroundColor: hexCode }"
			>
				{{ shadeNumber }}
				<br />
				{{ hexCode }}
				<br />
				<div>
					<span v-for="(value, key) in rgb" :key="`generated${key}`">
						{{ key.charAt(0) }}{{ value }}
					</span>
				</div>
			</li>
		</ul>
	</layout>
</template>

<script lang="ts">
import colors from "windicss/colors";
</script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import DefaultColorsList from "@/components/organisms/DefaultColorsList.vue";
import ColorsList from "@/components/molecules/ColorsList.vue";
import ColorItem from "@/components/organisms/ColorItem.vue";
import CustomColor from "@/components/organisms/CustomColor.vue";

import { useCustomColors } from "@/hooks";
import {
	generateShadesForColor,
	getClosestDefaultColor,
	getGapsBetweenBasicShades,
} from "@/utils";

console.log(colors);

console.log(getGapsBetweenBasicShades());

console.log(getClosestDefaultColor("#c9e6a2"));
// console.log(getClosestDefaultColor("#fbbf24"));
// console.log(generateShadesForColor("#fbbf24"));
// console.log(colors.amber);

// const baseColor = getGapsBetweenBasicShades().pink;
// const testColor = getGapsBetweenBasicShades().yellow;
const generatedColor = generateShadesForColor("#c9e6a2");
// console.log(baseColor);
console.log(generatedColor);

// console.log(
// 	(Object.entries(baseColor[400].rgb) as Array<[string, number]>).reduce(
// 		(res, [key, value]) => ({
// 			...res,
// 			[key]: Math.max(
// 				Math.min(
// 					Math.round(
// 						value +
// 							(baseColor[400].toNext
// 								? baseColor[400].toNext[key]
// 								: 0)
// 					),
// 					255
// 				),
// 				0
// 			),
// 		}),
// 		{}
// 	)
// );

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
