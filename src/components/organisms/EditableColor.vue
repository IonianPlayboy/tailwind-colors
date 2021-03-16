<template>
	<color-item
		v-if="state === 'inactive'"
		editable
		:hex-code="hexCode"
		:shade-number="shadeNumber"
		@colorEdited="state = 'choosing'"
	/>
	<color-input
		v-if="state === 'choosing'"
		v-model="currInput"
		type="number"
		:custom-color="customColor"
		:shade-number="shadeNumber"
		@buttonClicked="colorWasValidated()"
	/>
</template>

<script lang="ts">
import { defineProps } from "@vue/runtime-core";
import { defineEmit, watchEffect } from "vue";
</script>

<script setup lang="ts">
import ColorItem from "@/components/organisms/ColorItem.vue";
import ColorInput from "@/components/molecules/ColorInput.vue";

import { findClosestShade, adjustColor } from "@/utils";

const props = defineProps<{
	colorName: string;
	shadeNumber: number;
	hexCode: string;
	currShades: Record<number, string>;
}>();

ref: state = "inactive" as "inactive" | "choosing";
ref: currInput = `${props.shadeNumber}`;
ref: customColor = props.hexCode;
ref: newShadeNumber = props.shadeNumber;

watchEffect(() => {
	if (!Number(currInput)) return;
	newShadeNumber = Number(currInput);
	const foundShade = props.currShades[newShadeNumber];
	if (foundShade) return (customColor = foundShade);
	const closestShade = findClosestShade(newShadeNumber, props.currShades);
	const nearestShade = findClosestShade(
		newShadeNumber,
		props.currShades,
		closestShade
	);
	customColor = adjustColor(
		props.currShades[closestShade],
		props.currShades[nearestShade],
		closestShade - newShadeNumber
	);
});

const emit = defineEmit<
	(event: "colorValidated", payload: Record<string, number | string>) => void
>();

const colorWasValidated = () => {
	if (!currInput || !customColor) return;
	emit("colorValidated", {
		colorName: props.colorName,
		oldShadeNumber: props.shadeNumber,
		newShadeNumber,
		hexCode: customColor,
	});
	state = "inactive";
};
</script>
