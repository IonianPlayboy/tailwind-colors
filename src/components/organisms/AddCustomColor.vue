<template>
	<button
		v-if="state === 'inactive'"
		class="px-4 py-6 text-lg font-bold border rounded shadow-md font-display bg-warm-gray-700 border-true-gray-800 md:text-xl"
		@click="state = 'choosing'"
	>
		Generate all shades for a given color
	</button>
	<div
		v-if="state === 'choosing'"
		class="flex flex-wrap items-center px-4 py-6 space-y-2 text-base sm:space-y-0 md:space-x-4 md:text-lg font-body bg-warm-gray-600"
	>
		<div class="space-x-2">
			<label for="colorName"> Name : </label>
			<input
				id="colorName"
				v-model="colorName"
				class="w-32 text-sm rounded shadow-md md:text-lg sm:text-base border-warm-gray-800 bg-warm-gray-700"
				name="colorName"
				type="text"
				placeholder="Color name..."
			/>
		</div>
		<div class="space-x-2">
			<label for="hexCode"> Hex code : </label>
			<input
				id="hexCode"
				v-model="hexCode"
				class="box-content text-sm rounded shadow-md w-7ch md:text-lg sm:text-base border-warm-gray-800 bg-warm-gray-700"
				name="hexCode"
				type="text"
				placeholder="#000000"
			/>
		</div>
		<validate-button
			class="m-auto"
			:shade-number="900"
			v-bind="{ hexCode }"
			@click="customColorAdded()"
		/>
	</div>
</template>
<script lang="ts"></script>
<script setup lang="ts">
import ValidateButton from "@/components/molecules/ValidateButton.vue";
import { useCustomColors } from "@/hooks";
import { generateShadesForColor } from "@/utils";
import { useRouter } from "vue-router";

ref: state = "inactive" as "inactive" | "choosing";
ref: colorName = "";
ref: hexCode = "";

const router = useRouter();

const { addCustomColor } = useCustomColors();

const customColorAdded = () => {
	const generatedShades = generateShadesForColor(hexCode);
	const shadesList = Object.entries(generatedShades).reduce(
		(result, [shadeNumber, { hexCode }]) => ({
			...result,
			[shadeNumber]: hexCode,
		}),
		{} as Record<number, string>
	);
	// console.log(colorName, hexCode, shadesList);
	addCustomColor(colorName, hexCode, shadesList);
	router.push(`/color/${colorName}`);
};
</script>
