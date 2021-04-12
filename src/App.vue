<template>
	<router-view />
	<alerts-list />
	<router-link
		class="fixed px-6 py-4 text-lg font-bold border rounded shadow-md custom-animation font-display bottom-4 right-8 bg-hex-5b2a27 border-hex-400f0f md:text-xl"
		to="/theme/default"
		>Go to my themes</router-link
	>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import AlertsList from "@/components/organisms/AlertsList.vue";
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

.custom-animation {
	animation: bgPulse 4s ease-out infinite alternate;
}

@keyframes bgPulse {
	0% {
		background-color: #653430;
	}
	100% {
		background-color: #4e1d1b;
	}
}
</style>
