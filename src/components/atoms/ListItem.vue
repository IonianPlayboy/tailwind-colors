<template>
	<li
		:class="{
			'h-18 sm:h-24 md:h-36': !small,
			'h-16': small,
		}"
		class="relative flex w-full"
	>
		<slot />
	</li>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import { defineProps } from "@vue/runtime-core";

const props = defineProps<{ small?: boolean }>();
</script>
