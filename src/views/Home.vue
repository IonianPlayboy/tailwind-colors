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
			<custom-shade standalone @colorValidated="addCustomShade($event)">
				Generate a custom shade for one of the base colors
			</custom-shade>
			<button
				v-if="state === 'inactive'"
				class="px-4 py-6 text-lg font-bold border rounded shadow-md font-display bg-warm-gray-700 border-true-gray-800 md:text-xl"
				@click="state = 'choosing'"
			>
				Generate all shades for a given color
			</button>
			<div v-if="state === 'choosing'">
				<label for="colorName"> Color name : </label>
				<input
					id="colorName"
					v-model="colorName"
					class="text-sm rounded shadow-md md:text-lg sm:text-base border-warm-gray-800 bg-warm-gray-700"
					name="colorName"
					type="text"
				/>
				<label for="hexCode"> Hex code : </label>
				<input
					id="hexCode"
					v-model="hexCode"
					class="text-sm rounded shadow-md md:text-lg sm:text-base border-warm-gray-800 bg-warm-gray-700"
					name="hexCode"
					type="text"
				/>
				<validate-button
					:shade-number="900"
					v-bind="{ hexCode }"
					@buttonClicked="customColorAdded()"
				/>
			</div>
		</section>
		<h3
			v-if="customShadesInfos.length"
			class="mt-8 text-lg font-body text-warm-gray-300 md:text-xl"
		>
			Your custom shades :
		</h3>
		<shades-list
			v-if="customShadesInfos.length"
			wide
			:colors-list="customShadesInfos"
		>
			<template #default="{ currValue }">
				<shade-item v-bind="currValue" />
			</template>
		</shades-list>
		<!-- <ul v-if="baseColor" class="flex items-center">
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
		</ul> -->
	</layout>
</template>

<script lang="ts">
import colors from "windicss/colors";
</script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import DefaultColorsList from "@/components/organisms/DefaultColorsList.vue";
import ShadesList from "@/components/molecules/ShadesList.vue";
import ShadeItem from "@/components/organisms/ShadeItem.vue";
import CustomShade from "@/components/organisms/CustomShade.vue";
import ValidateButton from "@/components/molecules/ValidateButton.vue";

import { useCustomColors } from "@/hooks";
import { generateShadesForColor } from "@/utils";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

ref: state = "inactive" as "inactive" | "choosing";
ref: colorName = "";
ref: hexCode = "";

const generatedColor = generateShadesForColor("#974875");

const {
	addedColorsNames,
	customColors,
	customShadesInfos,
	addCustomShade,
	addCustomColor,
} = useCustomColors();

watchEffect(() => console.log(addedColorsNames.value, customColors.value));

const router = useRouter();

const customColorAdded = () => {
	const generatedShades = generateShadesForColor(hexCode);
	const shadesList = Object.entries(generatedShades).reduce(
		(result, [shadeNumber, { hexCode }]) => ({
			...result,
			[shadeNumber]: hexCode,
		}),
		{} as Record<number, string>
	);
	console.log(colorName, hexCode, shadesList);
	addCustomColor(colorName, hexCode, shadesList);
	router.push(`/color/${colorName}`);
};
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
