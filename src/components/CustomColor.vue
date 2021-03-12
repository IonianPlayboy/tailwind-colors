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
	<color-item
		v-if="state === 'done'"
		editable
		:hex-code="customColor"
		:shade-number="currInput"
		@colorEdited="state = 'choosing'"
	/>
</template>

<script lang="ts">
import { adjustColor, findClosestShade } from "@/utils";
import { defineProps, watchEffect } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import ColorItem from "@/components/organisms/ColorItem.vue";

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
	const closestShade = findClosestShade(currInput, props.currShades);
	const nearestShade = findClosestShade(
		currInput,
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
