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
		class="flex items-center justify-center w-full h-full space-x-1.5 sm:space-x-3 md:space-x-8 font-bold transition-colors duration-300 ease-out border rounded shadow-lg bg-warm-gray-600 border-warm-gray-700"
	>
		<input
			v-model.number="currInput"
			class="md:text-lg sm:text-base text-sm font-bold rounded shadow-md border-warm-gray-800 box-content w-3ch bg-warm-gray-700"
			type="number"
		/>
		<validate-button
			:hex-code="customColor"
			:shade-number="currInput"
			class="relative"
			@buttonClicked="state = 'done'"
		/>
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
import ValidateButton from "@/components/molecules/ValidateButton.vue";
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
<style scoped>
input[type="number"] {
	-moz-appearance: textfield; /* Firefox */
}
</style>
