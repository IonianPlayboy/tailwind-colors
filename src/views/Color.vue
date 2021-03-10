<template>
	<main class="flex flex-col min-h-screen">
		<section class="w-4/6 m-auto">
			<h1
				:style="{ color: colors[currColor][300] }"
				class="text-5xl font-bold"
			>
				{{ formatColorKey(currColor) }}
			</h1>
			<ul
				v-if="currShades"
				class="grid grid-cols-3 gap-6 mt-6 text-xl place-items-center"
			>
				<li
					v-for="(value, key) in currShades"
					:key="`${currColor}${key}`"
					class="flex w-full h-36"
				>
					<div
						class="flex flex-col items-center justify-center flex-grow space-y-1 border rounded shadow-lg border-warm-gray-700"
						:style="{
							backgroundColor: value,
							textShadow: getCurrTextShadow(key),
						}"
					>
						<strong
							class="text-3xl font-bold text-warm-gray-50 font-display"
							>{{ key }}</strong
						>
						<span class="text-2xl text-warm-gray-200">{{
							value
						}}</span>
					</div>
				</li>
				<li
					class="flex items-center justify-center w-full h-16 col-span-2"
				>
					Create your own...
				</li>
			</ul>
		</section>
	</main>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
</script>
<script setup lang="ts">
import colors from "windicss/colors";
import { formatColorKey } from "@/utils";
import { computed } from "@vue/runtime-core";

const currRoute = useRoute();
ref: currColor = computed(() => currRoute.params.key as keyof typeof colors);
ref: currShades = computed(
	() =>
		(currColor !== "black" && currColor !== "white"
			? colors[currColor]
			: null) as null | Record<string | number, string>
);

const getCurrTextShadow = (key: string) => {
	const currHexValue = Math.round((Number(key) / 900) * 255).toString(16);
	const shadow = `2px 2px 6px ${colors.warmGray[900]}${
		currHexValue.length === 1 ? "0" + currHexValue : currHexValue
	}`;
	const outline = `1px 0 0 ${colors.warmGray[900]}AA,
		0 1px 0 ${colors.warmGray[900]}AA,
		-1px 0 0 ${colors.warmGray[900]}AA,
		0 -1px 0 ${colors.warmGray[900]}AA`;
	console.log(`${outline}, ${shadow}`);
	return `${outline}, ${shadow}`;
};
</script>
