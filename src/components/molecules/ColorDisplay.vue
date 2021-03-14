<template>
	<section
		class="flex flex-col items-center justify-center flex-grow h-full space-y-1 border rounded shadow-lg border-warm-gray-700"
		:style="{
			backgroundColor: hexCode,
			textShadow: getCurrTextShadow(shadeNumber),
		}"
	>
		<strong
			class="md:text-3xl sm:text-2xl text-xl font-bold font-display"
			:class="{
				'text-warm-gray-50': shadeNumber >= 400,
				'text-warm-gray-800': shadeNumber < 400,
			}"
		>
			{{ shadeNumber }}
		</strong>
		<span
			class="md:text-2xl sm:text-xl text-base"
			:class="{
				'text-warm-gray-200': shadeNumber >= 400,
				'text-warm-gray-700': shadeNumber < 400,
			}"
		>
			{{ hexCode }}
		</span>
	</section>
</template>

<script lang="ts">
import { getCurrHexValue } from "@/utils";
import { defineProps } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import colors from "windicss/colors";

const props = defineProps<{
	hexCode: string;
	shadeNumber: number;
}>();

const getCurrTextShadow = (shadeNumber: number) => {
	const shadow = `2px 2px 6px ${colors.warmGray[900]}${getCurrHexValue(
		shadeNumber
	)}`;
	const outlineColor =
		shadeNumber < 400 ? colors.warmGray[100] : colors.warmGray[900];
	const outline = `1px 0 0 ${outlineColor}AA,
		0 1px 0 ${outlineColor}AA,
		-1px 0 0 ${outlineColor}AA,
		0 -1px 0 ${outlineColor}AA`;
	return `${outline}, ${shadow}`;
};
</script>
