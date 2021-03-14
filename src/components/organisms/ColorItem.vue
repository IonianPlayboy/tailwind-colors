<template>
	<copy-button
		class="top-2 absolute left-2 sm:top-3 sm:left-3 md:top-4 md:left-4"
		v-bind="{ hexCode, shadeNumber }"
	/>
	<color-display v-bind="{ hexCode, shadeNumber }" />
	<edit-button
		v-if="editable"
		v-bind="{ hexCode, shadeNumber }"
		class="top-2 absolute right-2 sm:top-3 sm:right-3 md:top-4 md:right-4"
		@buttonClicked="$emit('colorEdited')"
	/>
</template>

<script lang="ts">
import { defineEmit, defineProps } from "@vue/runtime-core";
</script>

<script setup lang="ts">
import CopyButton from "@/components/molecules/CopyButton.vue";
import ColorDisplay from "@/components/molecules/ColorDisplay.vue";
import EditButton from "@/components/molecules/EditButton.vue";

const props = defineProps<{
	hexCode: string;
	shadeNumber: number;
	editable?: boolean;
}>();

defineEmit<(event: "colorEdited") => void>();
</script>
