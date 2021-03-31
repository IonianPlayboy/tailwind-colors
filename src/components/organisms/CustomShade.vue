<template>
	<button
		v-if="state === 'inactive' && !noStartButton"
		class="font-bold border rounded shadow-lg"
		:class="{
			'w-full h-full bg-warm-gray-600 border-warm-gray-700': !standalone,
			'px-4 py-6 text-lg font-display bg-warm-gray-700 border-true-gray-800 md:text-xl': standalone,
		}"
		@click="state = 'choosing'"
	>
		<slot />
	</button>
	<shade-input
		v-if="state === 'choosing'"
		v-model="currInput"
		:type="standalone ? 'text' : 'number'"
		:hex-code="customHexCode ?? baseHexCode ?? ''"
		:shade-number="currShade ?? shadeNumber ?? 0"
		@buttonClicked="shadeWasValidated()"
	/>
	<shade-item
		v-if="shouldShowColorItem"
		editable
		:hex-code="standalone ? customHexCode : baseHexCode"
		:shade-number="standalone ? currShade : shadeNumber"
		@shadeEdited="state = 'choosing'"
	/>
</template>

<script lang="ts">
import { getCustomShade } from "@/utils";
import {
	computed,
	defineEmit,
	defineProps,
	watchEffect,
} from "@vue/runtime-core";
import colors from "windicss/colors";
</script>
<script setup lang="ts">
import ShadeItem from "@/components/organisms/ShadeItem.vue";
import ShadeInput from "@/components/molecules/ShadeInput.vue";

const props = defineProps<{
	colorName?: string;
	shadesList?: Record<string | number, string>;
	shadeNumber?: number;
	baseHexCode?: string;
	noStartButton?: boolean;
	standalone?: boolean;
}>();
ref: state = "inactive" as "inactive" | "choosing" | "done";
ref: currInput = "";
ref: currColorName = null as null | undefined | string;
ref: currShade = null as null | number;
ref: currShadesList = null as
	| null
	| string
	| undefined
	| Record<string | number, string>;
ref: customHexCode = null as null | string;

ref: shouldShowColorItem = computed(
	() => (state === "inactive" && props.noStartButton) || state === "done"
);

const getStandaloneColorName = () => {
	if (!currInput) return null;
	const [currMatch] = currInput.match(/[-\w]+(?=(-\d+))/) ?? [];
	if (!currMatch) return null;
	return currMatch.replace(/-\w/, (match) =>
		match.toUpperCase().replace("-", "")
	);
};
const getStandaloneShade = () => {
	if (!currInput) return null;
	const [currMatch] = currInput.match(/\d+/) ?? [];
	if (!currMatch) return null;
	return Number(currMatch);
};

watchEffect(() => {
	if (!Number(currInput) && !props.standalone) return;
	currShade = props.standalone ? getStandaloneShade() : Number(currInput);
	currColorName = props.standalone
		? getStandaloneColorName()
		: props.colorName;
	currShadesList = props.standalone
		? colors[currColorName as keyof typeof colors]
		: props.shadesList;
	if (!currShade || !currShadesList) return;
	customHexCode = getCustomShade(currShade, currShadesList);
});

const emit = defineEmit<
	(event: "shadeValidated", payload: Record<string, number | string>) => void
>();

const shadeWasValidated = () => {
	if (!currInput || !customHexCode) return;
	emit("shadeValidated", {
		colorName: currColorName as string,
		shadeNumber: currShade as number,
		hexCode: customHexCode,
		oldShadeNumber: props.shadeNumber as number,
	});
	currInput = !props.standalone && !props.noStartButton ? "" : currInput;
	currShade = null;
	customHexCode = null;
	state = props.standalone ? "done" : "inactive";
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
