<template>
	<button
		v-if="state === 'inactive'"
		class="w-full h-full font-bold border rounded shadow-lg bg-warm-gray-600 border-warm-gray-700"
		@click="state = 'choosing'"
	>
		Create your own...
	</button>
	<section
		v-if="state === 'choosing'"
		:style="{
			backgroundColor: `${customColor ?? 'initial'}`,
		}"
		class="flex items-center justify-center w-full h-full space-x-8 font-bold transition-colors duration-300 ease-out border rounded shadow-lg bg-warm-gray-600 border-warm-gray-700"
	>
		<input
			v-model.number="currInput"
			class="text-lg font-bold rounded shadow-md border-warm-gray-800 w-8ch bg-warm-gray-700"
			type="number"
		/>
		<button
			class="px-3 py-2 font-bold border rounded shadow-md bg-cool-gray-700 border-cool-gray-800"
			@click="state = 'done'"
		>
			Validate
		</button>
	</section>
	<section
		v-if="state === 'done'"
		class="flex flex-col items-center justify-center flex-grow h-full space-y-1 border rounded shadow-lg border-warm-gray-700"
		:style="{
			backgroundColor: `${customColor ?? 'initial'}`,
		}"
	>
		<strong
			class="text-3xl font-bold font-display"
			:class="{
				'text-warm-gray-50': currInput >= 400,
				'text-warm-gray-800': currInput < 400,
			}"
			>{{ currInput }}</strong
		>
		<span
			class="text-2xl"
			:class="{
				'text-warm-gray-200': currInput >= 400,
				'text-warm-gray-700': currInput < 400,
			}"
			>{{ customColor }}</span
		>
		<button @click="state = 'choosing'">Edit</button>
	</section>
</template>

<script lang="ts">
import { defineProps, watchEffect } from "@vue/runtime-core";
</script>
<script setup lang="ts">
const props = defineProps<{
	currColor: string;
	currShades: Record<string | number, string>;
}>();
ref: state = "inactive" as "inactive" | "choosing" | "done";
ref: currInput = null as null | number;
ref: customColor = null as null | string;

const adjustColor = (
	closestColor: string,
	nearestColor: string,
	amount: number
) => {
	const closestR = parseInt(closestColor.substring(1, 3), 16);
	const closestG = parseInt(closestColor.substring(3, 5), 16);
	const closestB = parseInt(closestColor.substring(5, 7), 16);

	const nearestR = parseInt(nearestColor.substring(1, 3), 16);
	const nearestG = parseInt(nearestColor.substring(3, 5), 16);
	const nearestB = parseInt(nearestColor.substring(5, 7), 16);
	const gapR = Math.abs(closestR - nearestR);
	const gapG = Math.abs(closestG - nearestG);
	const gapB = Math.abs(closestB - nearestB);
	console.log(
		closestR,
		nearestR,
		amount,
		gapR,
		(gapR * amount) / 100,
		closestR + (gapR * amount) / 100,
		Math.max(Math.min(Math.round(closestR + (gapR * amount) / 100), 255), 0)
	);
	console.log(
		closestG,
		nearestG,
		amount,
		gapG,
		(gapG * amount) / 100,
		closestG + (gapG * amount) / 100,
		Math.max(Math.min(Math.round(closestG + (gapG * amount) / 100), 255), 0)
	);
	console.log(
		closestB,
		nearestB,
		amount,
		gapB,
		(gapB * amount) / 100,
		closestB + (gapB * amount) / 100,
		Math.max(Math.min(Math.round(closestG + (gapG * amount) / 100), 255), 0)
	);
	const adjustedR = Math.max(
		Math.min(Math.round(closestR + (gapR * amount) / 100), 255),
		0
	);
	const adjustedG = Math.max(
		Math.min(Math.round(closestG + (gapG * amount) / 100), 255),
		0
	);
	const adjustedB = Math.max(
		Math.min(Math.round(closestB + (gapB * amount) / 100), 255),
		0
	);
	return `#${adjustedR < 16 ? "0" : ""}${adjustedR.toString(16)}${
		adjustedG < 16 ? "0" : ""
	}${adjustedG.toString(16)}${adjustedB < 16 ? "0" : ""}${adjustedB.toString(
		16
	)}`;
};

watchEffect(() => {
	if (!currInput) return;
	const foundShade = props.currShades[currInput];
	console.log("test");
	if (foundShade) return (customColor = foundShade);
	const closestShade = Object.keys(props.currShades).reduce(
		(result, key) =>
			!result ||
			Math.abs(Number(key) - (currInput as number)) <
				Math.abs(result - (currInput as number))
				? Number(key)
				: result,
		0
	);
	const nearestShade = Object.keys(props.currShades).reduce(
		(result, key) =>
			!result ||
			(Math.abs(Number(key) - (currInput as number)) <
				Math.abs(result - (currInput as number)) &&
				Number(key) !== closestShade)
				? Number(key)
				: result,
		0
	);
	console.log(closestShade, nearestShade, closestShade - currInput);

	customColor = adjustColor(
		props.currShades[closestShade],
		props.currShades[nearestShade],
		closestShade - currInput
	);
});
</script>
<style scoped></style>
