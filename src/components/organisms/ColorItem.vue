<template>
	<save-button
		v-if="!noSave"
		class="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4"
		v-bind="{ shadeNumber, hexCode }"
		thin-border
		@click="saveColor({ colorName, shadeNumber, hexCode })"
	/>
	<custom-color-link
		:color-name="colorName"
		:hex-code="hexCode"
		:shade-number="shadeNumber"
	/>
	<icon-button
		v-if="!noSave"
		class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4"
		:curr-title="'Delete the custom color'"
		:curr-icon="'cross'"
		v-bind="{ shadeNumber, hexCode }"
		extra-thin-border
		@click="removeCustomColor(colorName)"
	/>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import CustomColorLink from "@/components/organisms/CustomColorLink.vue";
import SaveButton from "@/components/molecules/SaveButton.vue";
import IconButton from "@/components/atoms/IconButton.vue";
import { defineProps } from "@vue/runtime-core";
import { useCustomThemes, useAlerts, useCustomColors } from "@/hooks";

const props = defineProps<{
	colorName: string;
	shadeNumber: number;
	hexCode: string;
	noSave?: boolean;
}>();
ref: ({ addedColorsNames, removeCustomColor } = useCustomColors());
const { addColorToTheme } = useCustomThemes();
const { addAlertToList } = useAlerts();

const saveColor = ({
	colorName,
	shadeNumber,
	hexCode,
}: {
	colorName: string;
	shadeNumber: number;
	hexCode: string;
}) => {
	addAlertToList({
		event: "colorSaved",
		hexCode: hexCode,
		shadeNumber: shadeNumber,
	});
	addColorToTheme({ ...addedColorsNames[colorName], colorName });
};
</script>
