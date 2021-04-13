<template>
	<layout>
		<main-title
			:style="{
				color: currShades[300],
				textShadow: getCurrTextShadow(900),
			}"
		>
			{{ formatColorKey(currColor) }}
		</main-title>
		<router-link
			class="inline-block mt-4 text-xl text-warm-gray-100"
			to="/"
		>
			&lt; Go back
		</router-link>
		<list-display
			wide
			:primary-list="currShades"
			:secondary-list="customShades"
		>
			<template #default="{ currKey, currValue }">
				<shade-item
					:color-name="currColor"
					:hex-code="currValue"
					:shade-number="Number(currKey)"
					hide-color-name
				/>
			</template>
			<template #secondary="{ currValue: { hexCode, shadeNumber } }">
				<custom-shade
					no-start-button
					:color-name="currColor"
					:base-hex-code="hexCode"
					:shade-number="shadeNumber"
					:shades-list="currShades"
					@shadeValidated="editShadeFromColor($event)"
				/>
			</template>
			<template #last>
				<custom-shade
					:color-name="currColor"
					:shades-list="currShades"
					@shadeValidated="addCustomShade($event)"
				>
					Create your own...
				</custom-shade>
			</template>
		</list-display>
	</layout>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { computed } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import ListDisplay from "@/components/molecules/ListDisplay.vue";
import ShadeItem from "@/components/organisms/ShadeItem.vue";
import CustomShade from "@/components/organisms/CustomShade.vue";
import colors from "windicss/colors";
import { formatColorKey, getCurrTextShadow } from "@/utils";
import { useCustomColors } from "@/hooks";

const currRoute = useRoute();
ref: currColor = computed(() => currRoute.params.key as keyof typeof colors);
ref: ({
	customColors,
	customShadesInfos,
	addCustomShade,
	editShadeFromColor,
} = useCustomColors());
ref: currShades = computed(
	() =>
		colors[currColor] ??
		(customColors[currColor] as Record<string | number, string>)
);

ref: customShades = computed(() =>
	customShadesInfos.filter(({ colorName }) => colorName === currColor)
);
</script>
<style scoped>
button {
	text-shadow: inherit;
}
</style>
