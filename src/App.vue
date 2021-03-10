<template>
	<router-view />
	<alerts-handler />
</template>

<script lang="ts"></script>

<script setup lang="ts">
import AlertsHandler from "@/components/AlertsHandler.vue";
</script>

<style>
#app {
	@apply relative font-body overflow-hidden bg-warm-gray-800 text-warm-gray-200;
	text-shadow: 2px 2px 6px #111827;
}
h1,
h2,
h3,
h4,
h5,
h6,
header {
	@apply font-display;
}
</style>
