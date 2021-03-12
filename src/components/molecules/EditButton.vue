<template>
	<icon-button
		:curr-title="'Edit the color shade number'"
		:curr-icon="'edit'"
		v-bind="{ hexCode, shadeNumber }"
		@buttonClicked="$emit('buttonClicked')"
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
