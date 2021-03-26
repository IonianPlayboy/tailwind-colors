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
		<shades-list
			wide
			:colors-list="currShades"
			:custom-colors="customShades"
		>
			<template #default="{ currKey, currValue }">
				<shade-item
					:hex-code="currValue"
					:shade-number="Number(currKey)"
				/>
			</template>
			<template #custom="{ currKey, currValue }">
				<custom-shade
					no-start-button
					:color-name="currColor"
					:hex-code="currValue.hexCode"
					:shade-number="currValue.shadeNumber"
					:shades-list="currShades"
					@colorValidated="editShadeFromColor($event)"
				/>
			</template>
			<template #last>
				<custom-shade
					:color-name="currColor"
					:shades-list="currShades"
					@colorValidated="addCustomShade($event)"
				>
					Create your own...
				</custom-shade>
			</template>
		</shades-list>
	</layout>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { computed } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import ShadesList from "@/components/molecules/ShadesList.vue";
import ShadeItem from "@/components/organisms/ShadeItem.vue";
import CustomShade from "@/components/organisms/CustomShade.vue";
import colors from "windicss/colors";
import { formatColorKey, getCurrTextShadow } from "@/utils";
import { useCustomColors } from "@/hooks";

const currRoute = useRoute();
ref: currColor = computed(() => currRoute.params.key as keyof typeof colors);
const {
	customColors,
	customShadesInfos,
	addCustomShade,
	editShadeFromColor,
} = useCustomColors();
ref: currShades = computed(
	() =>
		colors[currColor] ??
		(customColors.value[currColor] as Record<string | number, string>)
);

ref: customShades = computed(() =>
	customShadesInfos.value.filter(({ colorName }) => colorName === currColor)
);
</script>
<style scoped>
button {
	text-shadow: inherit;
}
</style>
