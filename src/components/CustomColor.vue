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
import { adjustColor, findClosestShade } from "@/utils/colors";
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

watchEffect(() => {
	if (!currInput) return;
	const foundShade = props.currShades[currInput];
	if (foundShade) return (customColor = foundShade);
	const closestShade = findClosestShade(Number(currInput), props.currShades);
	const nearestShade = findClosestShade(
		Number(currInput),
		props.currShades,
		closestShade
	);
	customColor = adjustColor(
		props.currShades[closestShade],
		props.currShades[nearestShade],
		closestShade - currInput
	);
});
</script>
<style scoped></style>
