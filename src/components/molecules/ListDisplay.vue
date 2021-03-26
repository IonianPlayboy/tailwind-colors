<template>
	<ul
		:class="{
			'grid-cols-3': wide,
			'md:grid-cols-6 sm:grid-cols-4 grid-cols-3': !wide,
		}"
		class="grid gap-6 mt-6 text-base font-bold sm:text-lg lg:text-xl font-display place-items-center"
	>
		<list-item
			v-for="(value, key) in primaryList"
			:key="`primary${key}`"
			:small="smallItems"
		>
			<slot :currValue="value" :currKey="key" />
		</list-item>
		<template v-if="secondaryList">
			<list-item
				v-for="(value, key) in secondaryList"
				:key="`secondary${key}`"
				:small="smallItems"
			>
				<slot name="secondary" :currValue="value" :currKey="key" />
			</list-item>
		</template>
		<template v-if="slots.last">
			<list-item class="items-center justify-center">
				<slot name="last" />
			</list-item>
		</template>
	</ul>
</template>

<script lang="ts">
import { defineProps, useContext } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import ListItem from "@/components/atoms/ListItem.vue";
const props = defineProps<{
	primaryList:
		| Record<string, string | Record<number | string, string>>
		| Array<Record<string, string | number>>;
	secondaryList?: Record<string, string>;
	smallItems?: boolean;
	wide?: boolean;
}>();
const { slots } = useContext();
</script>
