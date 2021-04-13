<template>
	<div
		class="relative w-full pt-8 text-lg text-center border shadow-md border-warm-gray-600 pb-7 bg-warm-gray-700"
		@mouseenter="stopTimeout()"
		@mouseleave="startTimeout()"
	>
		<slot />
		<button
			class="absolute w-4 h-4 top-1.5 right-3"
			@click="alertWasDismissed()"
		>
			<cross-icon
				:style="{
					filter: `drop-shadow(2px 2px 6px #1c1917)`,
				}"
				class="transition-colors fill-current text-warm-gray-200 hover:text-warm-gray-50"
			/>
		</button>
	</div>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import { render as CrossIcon } from "@/assets/icons/cross.svg";
import { defineEmit } from "@vue/runtime-core";

const emit = defineEmit<(event: "alertDismissed") => void>();
const alertWasDismissed = () => emit("alertDismissed");
ref: currTimeout = undefined as undefined | number;

const startTimeout = () => {
	clearTimeout(currTimeout);
	currTimeout = setTimeout(() => emit("alertDismissed"), 2000);
};
const stopTimeout = () => clearTimeout(currTimeout);
startTimeout();
</script>
