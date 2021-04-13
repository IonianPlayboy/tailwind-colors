<template>
	<icon-button
		:curr-title="'Save this shade to use it for a custom theme'"
		:curr-icon="'save'"
		v-bind="{ hexCode, shadeNumber }"
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
