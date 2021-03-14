<template>
	<button
		class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
		:class="{
			'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9': big,
			'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7': !big,
		}"
		:title="currTitle"
		@click="$emit('buttonClicked')"
	>
		<component
			:is="currIconComponent"
			v-if="currIconComponent"
			class="w-full h-full fill-current"
			:class="{
				'text-warm-gray-200': shadeNumber >= 400,
				'text-warm-gray-700': shadeNumber < 400,
				'stroke-12': !thinBorder,
				'stroke-4': thinBorder,
			}"
			:style="{
				stroke:
					shadeNumber < 400
						? colors.warmGray[100]
						: colors.warmGray[900],
				filter: getCurrBoxShadow(shadeNumber),
			}"
		/>
	</button>
</template>

<script lang="ts">
import { computed, defineProps } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import colors from "windicss/colors";
import { getCurrHexValue } from "@/utils";

const icons = import.meta.glob("/src/assets/icons/*.svg");
ref: iconsComponents = {} as Record<string, any>;
Object.entries(icons).forEach(async ([path, getModule]) => {
	const currKey = path.replace("/src/assets/icons/", "").replace(".svg", "");
	const currModule = await getModule();
	iconsComponents[currKey] = currModule.render;
});

const props = defineProps<{
	currTitle: string;
	currIcon: string;
	hexCode: string;
	shadeNumber: number;
	thinBorder?: boolean;
	big?: boolean;
}>();

const currIconComponent = computed(() => iconsComponents[props.currIcon]);

const getCurrBoxShadow = (shadeNumber: number) => {
	return `drop-shadow(2px 2px 6px ${colors.warmGray[900]}${getCurrHexValue(
		shadeNumber
	)})`;
};
</script>
