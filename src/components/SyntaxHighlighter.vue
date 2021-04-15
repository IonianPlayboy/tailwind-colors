<template>
	<pre ref="codeContainer" class="match-braces"><code
			class="inline-color"
			:class="`language-${language}`"
			v-html="formattedCode"
		/></pre>
</template>

<script lang="ts">
import { defineProps, onMounted } from "@vue/runtime-core";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/show-language/prism-show-language";
import "prismjs/plugins/inline-color/prism-inline-color";
import "prismjs/plugins/inline-color/prism-inline-color.css";
import "prismjs/plugins/match-braces/prism-match-braces";
import "prismjs/plugins/match-braces/prism-match-braces.css";

import { watch, watchEffect } from "vue";
</script>
<script setup lang="ts">
const props = defineProps<{
	language: "javascript" | "css";
	code: string;
}>();

ref: codeContainer = null as null | ParentNode;
ref: isMounted = true;
ref: formattedCode = "";
ref: tokenizedCode = [] as Array<unknown>;

const formatCode = () => {
	if (!codeContainer) return;
	// Prism.highlightAllUnder(codeContainer);
	// console.log(Object.keys(Prism.plugins));
	// const grammar = Prism.languages[props.language];
	// Prism.hooks.run("before-highlight", { grammar });
	console.log(Object.keys(Prism.plugins));
	formattedCode = Prism.highlight(
		props.code,
		Prism.languages[props.language],
		props.language
	);
	tokenizedCode = Prism.tokenize(props.code, Prism.languages[props.language]);
};

onMounted(() => {
	isMounted = true;
	formatCode();
});
watch(
	() => props.code,
	() => {
		if (!isMounted) return;
		formatCode();
	}
);

watchEffect(() => console.log(tokenizedCode));
</script>
<style>
.toolbar {
	@apply font-mono;
}
</style>
