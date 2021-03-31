<template>
	<list-display
		small-items
		:primary-list="colorPalette"
		:secondary-list="basicColors"
	>
		<template #default="{ currKey, currValue }">
			<router-link
				class="flex items-center justify-center flex-grow p-2 text-center rounded shadow-lg"
				:style="{
					backgroundColor: currValue[700],
					textShadow: getCurrTextShadow(700),
				}"
				:to="`/color/${currKey}`"
			>
				{{ formatColorKey(currKey) }}
			</router-link>
		</template>
		<template #secondary="{ currKey, currValue }">
			<button
				class="flex items-center justify-center flex-grow font-bold rounded"
				:style="{
					backgroundColor: currValue,
					...getBasicColorStyle(currKey),
				}"
				@click="
					copyCurrValue(currValue, currKey === 'black' ? 900 : 50)
				"
			>
				{{ formatColorKey(currKey) }}
			</button>
		</template>
	</list-display>
</template>

<script lang="ts">
import colors from "windicss/colors";
</script>
<script setup lang="ts">
import ListDisplay from "@/components/molecules/ListDisplay.vue";
import { formatColorKey, copyCurrValue, getCurrTextShadow } from "@/utils";

const colorPalette = Object.entries(colors)
	.filter(([key, _value]) => key !== "white" && key !== "black")
	.reduce(
		(result, [key, value]) => ({ ...result, [key]: value }),
		{} as Omit<typeof colors, "white" | "black">
	);
const basicColors = Object.entries(colors)
	.filter(([key, _value]) => key === "white" || key === "black")
	.reduce(
		(result, [key, value]) => ({ ...result, [key]: value }),
		{} as Pick<typeof colors, "white" | "black">
	);

const getBasicColorStyle = (color: "white" | "black") =>
	color === "black"
		? {
				textShadow: getCurrTextShadow(900),
		  }
		: {
				color: colorPalette.warmGray[900],
				textShadow: getCurrTextShadow(50),
		  };
</script>
