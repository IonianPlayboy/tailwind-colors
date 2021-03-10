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
					class="relative flex w-full h-36"
				>
					<button
						class="absolute w-6 h-6 top-4 left-4"
						title="Copy the current color hexcode"
						@click="copyCurrValue(value)"
					>
						<copy-icon
							class="fill-current stroke-12"
							:class="{
								'text-warm-gray-200': Number(key) >= 400,
								'text-warm-gray-700': Number(key) < 400,
							}"
							:style="{
								stroke:
									Number(key) < 400
										? colors.warmGray[100]
										: colors.warmGray[900],
								filter: getCurrBoxShadow(key),
							}"
						/>
					</button>
					<div
						class="flex flex-col items-center justify-center flex-grow space-y-1 border rounded shadow-lg border-warm-gray-700"
						:style="{
							backgroundColor: value,
							textShadow: getCurrTextShadow(key),
						}"
					>
						<strong
							class="text-3xl font-bold font-display"
							:class="{
								'text-warm-gray-50': Number(key) >= 400,
								'text-warm-gray-800': Number(key) < 400,
							}"
							>{{ key }}</strong
						>
						<span
							class="text-2xl"
							:class="{
								'text-warm-gray-200': Number(key) >= 400,
								'text-warm-gray-700': Number(key) < 400,
							}"
							>{{ value }}</span
						>
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
import { render as CopyIcon } from "@/assets/copySymbol.svg";
import { useAlerts } from "@/hooks";
import { computed } from "@vue/runtime-core";

const currRoute = useRoute();
ref: currColor = computed(() => currRoute.params.key as keyof typeof colors);
ref: currShades = computed(
	() =>
		(currColor !== "black" && currColor !== "white"
			? colors[currColor]
			: null) as null | Record<string | number, string>
);

const getCurrHexValue = (key: string) => {
	const hexValue = Math.round((Number(key) / 900) * 255).toString(16);
	return hexValue.length === 1 ? "0" + hexValue : hexValue;
};

const getCurrBoxShadow = (key: string) => {
	return `drop-shadow(2px 2px 6px ${colors.warmGray[900]}${getCurrHexValue(
		key
	)})`;
};

const getCurrTextShadow = (key: string) => {
	const shadow = `2px 2px 6px ${colors.warmGray[900]}${getCurrHexValue(key)}`;
	const outline = `1px 0 0 ${
		Number(key) < 400 ? colors.warmGray[100] : colors.warmGray[900]
	}AA,
		0 1px 0 ${Number(key) < 400 ? colors.warmGray[100] : colors.warmGray[900]}AA,
		-1px 0 0 ${Number(key) < 400 ? colors.warmGray[100] : colors.warmGray[900]}AA,
		0 -1px 0 ${Number(key) < 400 ? colors.warmGray[100] : colors.warmGray[900]}AA`;
	console.log(`${outline}, ${shadow}`);
	return `${outline}, ${shadow}`;
};
const { addAlertToList } = useAlerts();
const copyCurrValue = async (currValue: string) => {
	try {
		navigator.clipboard.writeText(currValue);
		console.log(`The color ${currValue} was copied !`);
		addAlertToList({
			content: `The color ${currValue} was copied !`,
		});
	} catch (error) {
		console.log(error);
	}
};
</script>
