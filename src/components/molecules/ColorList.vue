<template>
	<ul
		:class="{
			'grid-cols-3': wide,
			'grid-cols-6': !wide,
		}"
		class="grid gap-6 mt-6 text-xl font-bold font-display place-items-center"
	>
		<list-item
			v-for="(value, key) in colorsList"
			:key="key"
			:small="smallItems"
		>
			<slot :currValue="value" :currKey="key" />
		</list-item>
		<template v-if="basicColors">
			<list-item
				v-for="(value, key) in basicColors"
				:key="key"
				:small="smallItems"
			>
				<slot name="basic" :currValue="value" :currKey="key" />
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
	colorsList: Record<string, string | Record<number | string, string>>;
	basicColors?: Record<string, string>;
	smallItems?: boolean;
	wide?: boolean;
}>();
const { slots } = useContext();
console.log(slots);
</script>
