<template>
	<em
		class="box-content px-3 py-2 mx-1 not-italic font-bold border rounded shadow w-7ch border-warm-gray-700 font-display"
		:class="{
			'text-warm-gray-200': shadeNumber >= 400,
			'text-warm-gray-700': shadeNumber < 400,
		}"
		:style="{
			backgroundColor: hexCode,
			textShadow: getCurrTextShadow(shadeNumber),
		}"
	>
		{{ hexCode }}
	</em>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import { getCurrTextShadow } from "@/utils";
import { defineProps } from "@vue/runtime-core";

const props = defineProps<{
	shadeNumber: number;
	hexCode: string;
}>();
</script>
