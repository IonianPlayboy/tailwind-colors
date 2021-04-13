<template>
	<layout>
		<main-title>
			<span class="capitalize">
				{{ route.params.key }}
			</span>
			Theme
		</main-title>
		<router-link
			class="inline-block mt-4 text-xl text-warm-gray-100"
			to="/"
		>
			&lt; Go back
		</router-link>
		<h2 class="mt-8 text-xl font-body text-warm-gray-300 md:text-2xl">
			Here are the theme colors :
		</h2>
		<list-display
			wide
			:primary-list="currTheme.shades"
			:secondary-list="currTheme.colors"
		>
			<template
				#default="{ currValue: { colorName, hexCode, shadeNumber } }"
			>
				<shade-item
					:color-name="colorName"
					:hex-code="hexCode"
					:shade-number="shadeNumber"
					no-save
				/>
			</template>
			<template
				#secondary="{ currKey, currValue: { shadeNumber, hexCode } }"
			>
				<color-item
					:color-name="currKey"
					:shade-number="shadeNumber"
					:hex-code="hexCode"
					no-save
				/>
			</template>
		</list-display>
	</layout>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import ListDisplay from "@/components/molecules/ListDisplay.vue";
import ShadeItem from "@/components/organisms/ShadeItem.vue";
import ColorItem from "@/components/organisms/ColorItem.vue";
import { useCustomThemes } from "@/hooks/customThemes";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const route = useRoute();

ref: ({ customThemes } = useCustomThemes());

ref: currTheme = computed(() => customThemes[route.params.key as string]);
</script>
