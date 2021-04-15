<template>
	<pre :class="`language-${language}`"><code><span
		v-for="(token, i) in tokenizedCode"
		:key="getCurrKey(token, i)"
		:class="getCurrClass(token)">{{getCurrContent(token)}}</span></code></pre>
</template>

<script lang="ts">
import { computed, defineProps } from "@vue/runtime-core";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-tomorrow.css";
</script>
<script setup lang="ts">
const props = defineProps<{
	language: "javascript" | "css";
	code: string;
}>();

ref: tokenizedCode = computed(() =>
	Prism.tokenize(props.code, Prism.languages[props.language])
);

const getCurrKey = (token: typeof tokenizedCode[number], currIndex: number) =>
	`${typeof token === "string" ? token : token.content}${currIndex}`;
const getCurrClass = (token: typeof tokenizedCode[number]) =>
	typeof token === "string" ? "token" : `token ${token.type}`;
const getCurrContent = (token: typeof tokenizedCode[number]) =>
	typeof token === "string" ? token : token.content;
</script>
