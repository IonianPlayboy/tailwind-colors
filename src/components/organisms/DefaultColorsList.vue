<template>
	<colors-list
		small-items
		:colors-list="colorPalette"
		:basic-colors="basicColors"
	>
		<template #default="{ currKey, currValue }">
			<router-link
				class="flex items-center justify-center flex-grow rounded shadow-lg"
				:style="{ backgroundColor: currValue[700] }"
				:to="`/color/${currKey}`"
				>{{ formatColorKey(currKey) }}</router-link
			>
		</template>
		<template #basic="{ currKey, currValue }">
			<button
				class="flex items-center justify-center flex-grow font-bold rounded"
				:style="{
					backgroundColor: currValue,
					...getBasicColorStyle(currKey),
				}"
				@click="copyCurrValue(currValue)"
			>
				{{ formatColorKey(currKey) }}
			</button>
		</template>
	</colors-list>
</template>

<script lang="ts">
import colors from "windicss/colors";
</script>
<script setup lang="ts">
import ColorsList from "@/components/molecules/ColorsList.vue";
import { formatColorKey, copyCurrValue } from "@/utils";

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
		? {}
		: {
				color: colorPalette.warmGray[900],
				textShadow: `2px 2px
						6px ${colorPalette.warmGray[300]}`,
		  };
</script>
