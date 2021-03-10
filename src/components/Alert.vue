<template>
	<div
		class="w-full relative py-5 text-center bg-warm-gray-700"
		@mouseenter="stopTimeout()"
		@mouseleave="startTimeout()"
	>
		<slot />
		<button class="absolute top-0.5 right-2" @click="alertWasDismissed()">
			X
		</button>
	</div>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import { defineEmit } from "@vue/runtime-core";

const emit = defineEmit<(event: "alertDismissed") => void>();
const alertWasDismissed = () => emit("alertDismissed");

ref: currTimeout = null as null | number;

const startTimeout = () =>
	(currTimeout = setTimeout(() => emit("alertDismissed"), 2000));
const stopTimeout = () => (currTimeout ? clearTimeout(currTimeout) : null);
startTimeout();
</script>
