<template>
	<main class="min-h-screen flex flex-col">
		<section class="m-auto w-4/6">
			<h1 class="text-5xl font-bold">Welcome to Tailwind Colors !</h1>
			<p class="text-2xl mt-8">Browse the base palette colors :</p>
			<ul
				class="grid mt-6 text-xl font-display font-bold grid-cols-6 place-items-center gap-6"
			>
				<li
					v-for="(values, key) in colorPalette"
					:key="key"
					class="flex h-16 w-full"
				>
					<router-link
						class="flex rounded flex-grow justify-center items-center"
						:style="{ backgroundColor: colorPalette[key][700] }"
						:to="`/color/${key}`"
						>{{ formatColorKey(key) }}</router-link
					>
				</li>
				<li class="flex h-16 w-full">
					<router-link
						class="flex rounded flex-grow justify-center items-center"
						:style="{ backgroundColor: colors.black }"
						:to="`/color/${'black'}`"
						>Black</router-link
					>
				</li>
				<li class="flex h-16 w-full">
					<router-link
						class="flex rounded flex-grow justify-center items-center"
						:style="{
							backgroundColor: colors.white,
							color: colorPalette.warmGray[900],
							textShadow: `2px 2px 6px ${colorPalette.warmGray[300]}`,
						}"
						:to="`/color/${'white'}`"
						>White</router-link
					>
				</li>
			</ul>
			<p class="text-2xl mt-6">... Or generate your own custom color</p>
		</section>
	</main>
</template>

<script lang="ts">
// import colors from "windicss/colors";
</script>
<script setup lang="ts">
import colors from "windicss/colors";
import { formatColorKey } from "@/utils";

const colorPalette = Object.entries(colors)
	.filter(([key, _value]) => key !== "white" && key !== "black")
	.reduce(
		(result, [key, value]) => ({ ...result, [key]: value }),
		{} as Omit<typeof colors, "white" | "black">
	);
</script>
