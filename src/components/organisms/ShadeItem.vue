<template>
	<section class="relative w-full">
		<copy-button
			class="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4"
			v-bind="{ shadeNumber, hexCode }"
		/>
		<save-button
			class="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4"
			v-bind="{ shadeNumber, hexCode }"
			thin-border
			@click="saveShade()"
		/>
		<shade-display v-bind="{ colorName, shadeNumber, hexCode }" />
		<edit-button
			v-if="editable"
			v-bind="{ hexCode, shadeNumber }"
			class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4"
			@click="$emit('shadeEdited')"
		/>
	</section>
</template>

<script lang="ts">
import { defineEmit, defineProps } from "@vue/runtime-core";
</script>

<script setup lang="ts">
import CopyButton from "@/components/molecules/CopyButton.vue";
import SaveButton from "@/components/molecules/SaveButton.vue";
import ShadeDisplay from "@/components/molecules/ShadeDisplay.vue";
import EditButton from "@/components/molecules/EditButton.vue";
import { useCustomThemes } from "@/hooks/customThemes";
import { useAlerts } from "@/hooks";

const props = defineProps<{
	colorName?: string;
	shadeNumber: number;
	hexCode: string;
	editable?: boolean;
}>();

defineEmit<(event: "shadeEdited") => void>();

const { addShadeToTheme } = useCustomThemes();
const { addAlertToList } = useAlerts();

const saveShade = () => {
	addAlertToList({
		event: "colorSaved",
		hexCode: props.hexCode,
		shadeNumber: props.shadeNumber,
	});
	addShadeToTheme({
		colorName: props.colorName ?? "",
		shadeNumber: props.shadeNumber,
		hexCode: props.hexCode,
	});
};
</script>
