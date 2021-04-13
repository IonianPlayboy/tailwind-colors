<template>
	<icon-button
		:curr-title="'Validate the new shade'"
		:curr-icon="'validate'"
		v-bind="{ hexCode, shadeNumber }"
		thin-border
		big
	/>
</template>

<script lang="ts">
import { defineProps } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import IconButton from "@/components/atoms/IconButton.vue";

const props = defineProps<{
	hexCode: string;
	shadeNumber: number;
}>();
</script>
