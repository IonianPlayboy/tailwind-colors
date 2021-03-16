<template>
	<button
		v-if="state === 'inactive'"
		class="font-bold border rounded shadow-lg"
		:class="{
			'w-full h-full bg-warm-gray-600 border-warm-gray-700': small,
			'text-xl md:text-2xl': !small,
		}"
		@click="state = 'choosing'"
	>
		<slot />
	</button>
	<color-input
		v-if="state === 'choosing'"
		v-model="currInput"
		type="number"
		:custom-color="customColor ?? ''"
		:shade-number="shadeNumber ?? 0"
		@buttonClicked="colorWasValidated()"
	/>
</template>

<script lang="ts">
import { adjustColor, findClosestShade } from "@/utils";
import { defineEmit, defineProps, watchEffect } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import ColorInput from "@/components/molecules/ColorInput.vue";

const props = defineProps<{
	currColor: string;
	currShades: Record<string | number, string>;
	small?: boolean;
}>();
ref: state = "inactive" as "inactive" | "choosing";
ref: currInput = "";
ref: shadeNumber = null as null | number;
ref: customColor = null as null | string;

watchEffect(() => {
	if (!Number(currInput)) return;
	shadeNumber = Number(currInput);
	const foundShade = props.currShades[shadeNumber];
	if (foundShade) return (customColor = foundShade);
	const closestShade = findClosestShade(shadeNumber, props.currShades);
	const nearestShade = findClosestShade(
		shadeNumber,
		props.currShades,
		closestShade
	);
	customColor = adjustColor(
		props.currShades[closestShade],
		props.currShades[nearestShade],
		closestShade - shadeNumber
	);
});

const emit = defineEmit<
	(event: "colorValidated", payload: Record<string, number | string>) => void
>();

const colorWasValidated = () => {
	if (!currInput || !customColor) return;
	emit("colorValidated", {
		colorName: props.currColor,
		shadeNumber: shadeNumber as number,
		hexCode: customColor,
	});
	currInput = "";
	shadeNumber = null;
	customColor = null;
	state = "inactive";
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
