<template>
	<layout>
		<main-title>Oops</main-title>
		<p class="text-2xl mt-8">
			This page does not seem to exist. Sorry about that.
		</p>
		<p
			class="mt-6 text-xl underline hover:text-teal-400 transition-colors duration-150 ease-out"
		>
			<router-link to="/">Go back to the home page</router-link>
		</p>
	</layout>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
</script>
