<template>
	<syntax-highlighter
		v-if="currDisplay === 'javascript'"
		class="!mt-8"
		:language="'javascript'"
		:code="jsCode"
	/>
	<syntax-highlighter
		v-else
		class="!mt-8"
		:language="'css'"
		:code="cssCode"
	/>

	<button
		class="px-6 py-2 text-lg font-bold border rounded shadow-md font-display bottom-4 right-8 bg-hex-5b2a27 border-hex-400f0f md:text-xl"
		@click="switchDisplay()"
	>
		Switch
	</button>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import SyntaxHighlighter from "@/components/SyntaxHighlighter.vue";
import { computed, defineProps } from "@vue/runtime-core";

const props = defineProps<{
	jsCode: string;
	cssCode: string;
}>();

ref: currDisplay = "javascript" as "javascript" | "css";
ref: currCode = computed(() =>
	currDisplay === "javascript" ? props.jsCode : props.cssCode
);
const switchDisplay = () =>
	(currDisplay = currDisplay === "javascript" ? "css" : "javascript");
</script>
