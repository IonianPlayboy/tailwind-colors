<template>
	<section
		class="flex flex-col items-center justify-center flex-grow h-full space-y-1 border rounded shadow-lg border-warm-gray-700"
		:style="{
			backgroundColor: hexCode,
			textShadow: getCurrTextShadow(shadeNumber),
		}"
	>
		<strong
			class="text-xl font-bold md:text-3xl sm:text-2xl font-display"
			:class="{
				'text-warm-gray-50': shadeNumber >= 400,
				'text-warm-gray-800': shadeNumber < 400,
			}"
		>
			{{ colorName ? `${colorName}-` : "" }}{{ shadeNumber }}
		</strong>
		<span
			class="text-base md:text-2xl sm:text-xl"
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
import { defineProps } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import { getCurrTextShadow } from "@/utils";

const props = defineProps<{
	colorName?: string;
	hexCode: string;
	shadeNumber: number;
}>();
</script>
