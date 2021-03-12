<template>
	<icon-button
		:curr-title="'Copy the current color hexcode'"
		:curr-icon="'copy'"
		v-bind="{ hexCode, shadeNumber }"
		@buttonClicked="copyCurrValue(hexCode)"
	/>
</template>

<script lang="ts">
import { defineProps } from "@vue/runtime-core";
</script>
<script setup lang="ts">
import IconButton from "@/components/atoms/IconButton.vue";
import { copyCurrValue } from "@/utils";

const props = defineProps<{
	hexCode: string;
	shadeNumber: number;
}>();
</script>
