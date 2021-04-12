<template>
	<layout>
		<main-title> Welcome to Tailwind Colors ! </main-title>
		<h2 class="mt-8 text-xl font-body text-warm-gray-300 md:text-2xl">
			Browse the base palette colors :
		</h2>
		<default-colors-list />
		<h2 class="mt-8 text-xl font-body text-warm-gray-300 md:text-2xl">
			Create your own colors :
		</h2>
		<section class="grid grid-cols-2 gap-6 mt-6">
			<custom-shade standalone @shadeValidated="addCustomShade($event)">
				Generate a custom shade for one of the base colors
			</custom-shade>
			<add-custom-color />
		</section>
		<h3
			v-if="customShadesInfos.length"
			class="mt-8 text-lg font-body text-warm-gray-300 md:text-xl"
		>
			Your custom shades :
		</h3>
		<list-display
			v-if="customShadesInfos.length"
			wide
			:primary-list="customShadesInfos"
		>
			<template #default="{ currValue }">
				<shade-item v-bind="currValue" />
				<icon-button
					class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4"
					:curr-title="'Delete the custom shade'"
					:curr-icon="'cross'"
					v-bind="currValue"
					extra-thin-border
					@click="
						removeShadeFromColor(
							currValue.colorName,
							currValue.shadeNumber
						)
					"
				/>
			</template>
		</list-display>
		<h3
			v-if="Object.keys(addedColorsNames).length"
			class="mt-8 text-lg font-body text-warm-gray-300 md:text-xl"
		>
			Your custom colors :
		</h3>
		<list-display
			v-if="Object.keys(addedColorsNames).length"
			wide
			:primary-list="addedColorsNames"
		>
			<template
				#default="{ currKey, currValue: { shadeNumber, hexCode } }"
			>
				<custom-color-link
					:color-name="currKey"
					:hex-code="hexCode"
					:shade-number="Number(shadeNumber)"
				/>
				<icon-button
					class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4"
					:curr-title="'Delete the custom color'"
					:curr-icon="'cross'"
					v-bind="{ shadeNumber, hexCode }"
					extra-thin-border
					@click="removeCustomColor(currKey)"
				/>
			</template>
		</list-display>
	</layout>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import DefaultColorsList from "@/components/organisms/DefaultColorsList.vue";
import ListDisplay from "@/components/molecules/ListDisplay.vue";
import ShadeItem from "@/components/organisms/ShadeItem.vue";
import CustomShade from "@/components/organisms/CustomShade.vue";
import AddCustomColor from "@/components/organisms/AddCustomColor.vue";
import CustomColorLink from "@/components/organisms/CustomColorLink.vue";
import IconButton from "@/components/atoms/IconButton.vue";

import { useCustomColors } from "@/hooks";
import { useCustomThemes } from "@/hooks/customThemes";

const {
	addedColorsNames,
	customShadesInfos,
	addCustomShade,
	removeShadeFromColor,
	addCustomColor,
	removeCustomColor,
} = useCustomColors();

const { customThemes } = useCustomThemes();
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
