<template>
	<section
		:style="{
			backgroundColor: `${customColor ?? 'initial'}`,
		}"
		class="flex items-center justify-center w-full h-full space-x-1.5 sm:space-x-3 md:space-x-8 font-bold transition-colors duration-300 ease-out border rounded shadow-lg bg-warm-gray-600 border-warm-gray-700"
	>
		<input
			:value="modelValue"
			class="text-sm rounded shadow-md md:text-lg sm:text-base border-warm-gray-800 bg-warm-gray-700"
			:class="{
				'box-content font-bold w-3ch': type === 'number',
				'': type === 'text',
			}"
			:type="type"
			:pattern="`${type === 'number' ? '[0-9]*' : ''}`"
			:inputmode="`${type === 'number' ? 'numeric' : 'text'}`"
			:placeholder="`${type === 'number' ? '000' : 'warmGray-600'}`"
			@input="$emit('update:modelValue', $event.target?.value)"
		/>
		<validate-button
			:hex-code="customColor ?? ''"
			:shade-number="shadeNumber ?? 0"
			class="relative"
			@buttonClicked="$emit('buttonClicked')"
		/>
	</section>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import ValidateButton from "@/components/molecules/ValidateButton.vue";
import { defineProps } from "@vue/runtime-core";

const props = defineProps<{
	modelValue: string;
	customColor: string;
	shadeNumber: number;
	type: "text" | "number";
	small?: boolean;
}>();
</script>
<style scoped>
input[type="number"] {
	-moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
