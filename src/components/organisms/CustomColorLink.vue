<template>
	<router-link
		class="flex flex-col items-center justify-center flex-grow h-full border rounded shadow-lg bg-warm-gray-700 border-warm-gray-700"
		:style="{
			textShadow: getCurrTextShadow(shadeNumber),
			backgroundColor: hexCode,
		}"
		:to="`/color/${colorName}`"
	>
		<strong
			class="mx-1 mt-auto text-xl font-bold font-display md:text-3xl sm:text-2xl"
			:class="{
				'text-warm-gray-50': shadeNumber >= 400,
				'text-warm-gray-800': shadeNumber < 400,
			}"
		>
			{{ colorName }}
		</strong>
		<ul
			class="box-content flex items-center self-stretch mx-3 mt-auto mb-2 border rounded shadow-lg content h-1/2 border-warm-gray-700"
		>
			<li
				v-for="(currHexCode, currShadeNumber) in currShadesList"
				:key="`generated${currHexCode}${currShadeNumber}`"
				class="h-full w-1/10"
				:class="{
					'rounded-l': Number(currShadeNumber) === 50,
					'rounded-r flex-grow': Number(currShadeNumber) === 900,
					'text-warm-gray-50': Number(currShadeNumber) >= 400,
					'text-warm-gray-800': Number(currShadeNumber) < 400,
				}"
				:style="{ backgroundColor: currHexCode }"
			></li>
		</ul>
	</router-link>
</template>

<script lang="ts">
import { computed, defineProps } from "vue";
</script>
<script setup lang="ts">
import { getCurrTextShadow } from "@/utils";
import { useCustomColors } from "@/hooks";

const props = defineProps<{
	colorName: string;
	hexCode: string;
	shadeNumber: number;
}>();

const { customColors } = useCustomColors();

ref: currShadesList = computed(() => customColors.value[props.colorName]);
</script>
