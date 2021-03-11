<template>
	<layout>
		<main-title> Welcome to Tailwind Colors ! </main-title>
		<p class="text-2xl mt-8">Browse the base palette colors :</p>
		<color-list
			small-items
			:colors-list="colorPalette"
			:basic-colors="basicColors"
		>
			<template #default="{ currKey, currValue }">
				<router-link
					class="flex rounded flex-grow justify-center items-center"
					:style="{ backgroundColor: currValue[700] }"
					:to="`/color/${currKey}`"
					>{{ formatColorKey(currKey) }}</router-link
				>
			</template>
			<template #basic="{ currKey, currValue }">
				<button
					class="flex font-bold rounded flex-grow justify-center items-center"
					:style="{
						backgroundColor: currValue,
						...getBasicColorStyle(currKey),
					}"
					@click="copyCurrValue(currValue)"
				>
					{{ formatColorKey(currKey) }}
				</button>
			</template>
		</color-list>
		<p class="text-2xl mt-6"></p>
		<!-- <p class="text-2xl mt-6">... Or generate your own custom color</p> -->
	</layout>
</template>

<script lang="ts">
import colors from "windicss/colors";
</script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import ColorList from "@/components/molecules/ColorList.vue";
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
