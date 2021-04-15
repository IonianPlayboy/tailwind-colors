<template>
	<layout>
		<main-title>
			<span class="capitalize">{{ route.params.key }}</span>
			Theme
		</main-title>
		<router-link class="inline-block mt-4 text-xl text-warm-gray-100" to="/"
			>&lt; Go back</router-link
		>
		<syntax-highlighter
			:code="formatStringWithTabs(customTailwindString)"
			language="javascript"
			class="mt-8"
		/>
		<syntax-highlighter
			:code="formatStringWithTabs(customCSSVarsString)"
			language="css"
			class="mt-8"
		/>
		<h2 class="mt-8 text-xl font-body text-warm-gray-300 md:text-2xl">
			Here are the theme colors :
		</h2>
		<list-display
			wide
			:primary-list="currTheme.shades"
			:secondary-list="currTheme.colors"
		>
			<template
				#default="{ currValue: { colorName, hexCode, shadeNumber } }"
			>
				<shade-item
					:color-name="colorName"
					:hex-code="hexCode"
					:shade-number="shadeNumber"
					no-save
				/>
			</template>
			<template
				#secondary="{ currKey, currValue: { shadeNumber, hexCode } }"
			>
				<color-item
					:color-name="currKey"
					:shade-number="shadeNumber"
					:hex-code="hexCode"
					no-save
				/>
			</template>
		</list-display>
	</layout>
</template>

<script lang="ts"></script>
<script setup lang="ts">
import Layout from "@/components/atoms/Layout.vue";
import MainTitle from "@/components/atoms/MainTitle.vue";
import ListDisplay from "@/components/molecules/ListDisplay.vue";
import ShadeItem from "@/components/organisms/ShadeItem.vue";
import ColorItem from "@/components/organisms/ColorItem.vue";
import SyntaxHighlighter from "@/components/SyntaxHighlighter.vue";
import { useCustomThemes } from "@/hooks/customThemes";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useCustomColors } from "@/hooks";

const route = useRoute();

ref: ({ customThemes } = useCustomThemes());
ref: ({ customColors } = useCustomColors());

ref: currTheme = computed(() => customThemes[route.params.key as string]);
ref: themeShades = computed(() => currTheme?.shades ?? {});
ref: themeColors = computed(() => currTheme?.colors ?? {});

ref: customJSConfig = computed(() => ({
	...Object.keys(themeColors).reduce(
		(result, colorName) => ({
			...result,
			[colorName]: customColors[colorName],
		}),
		{} as Record<string, Record<number, string>>
	),
	...Object.values(themeShades).reduce(
		(result, { colorName, shadeNumber, hexCode }) => ({
			...result,
			[colorName]: {
				...(result[colorName] ?? {}),
				[shadeNumber]: hexCode,
			},
		}),
		{} as Record<string, Record<number, string>>
	),
}));
ref: customTailwindConfig = computed(() => ({
	theme: {
		extend: {
			colors: {
				...customJSConfig,
			},
		},
	},
}));
ref: customCSSConfig = computed(() => ({
	...Object.keys(themeColors).reduce(
		(result, colorName) => ({
			...result,
			...Object.entries(customColors[colorName]).reduce(
				(res, [shadeNumber, hexCode]) => ({
					...res,
					[`--${colorName}-${shadeNumber}`]: hexCode,
				}),
				{} as Record<string, string>
			),
		}),
		{} as Record<string, string>
	),
	...Object.values(themeShades).reduce(
		(result, { colorName, shadeNumber, hexCode }) => ({
			...result,
			[`--${colorName}-${shadeNumber}`]: hexCode,
		}),
		{} as Record<string, string>
	),
}));
ref: customCSSVarsConfig = computed(() => ({
	"--root": {
		...customCSSConfig,
	},
}));

ref: customTailwindString = computed(
	() =>
		`module.exports = ${JSON.stringify(customTailwindConfig)
			.replace(/(")([A-Za-z\d]+)("):/g, "$2:")
			.replace(/\{/g, "{\n")
			.replace(/\}/g, "\n}")
			.replace(/,/g, ",\n")
			.replace(/:/g, " : ")}`
);

ref: customCSSVarsString = computed(
	() => `${JSON.stringify(customCSSVarsConfig)
		.replace(/[A-Z]/g, (match) => match.toLowerCase())
		.replace(/([a-z]) ([a-z])/g, "$1-$2")
		.replace(/(")([-A-Za-z\d]+)("):/g, "$2:")
		.replace(/.$/, "")
		.replace(/^./, "")
		.replace(/\{/g, "{\n")
		.replace(/\}/g, "\n}")
		.replace(/,/g, ";\n")
		.replace(/:/g, ": ")}
`
);

const formatStringWithTabs = (baseString: string) => {
	const { finalString } = (baseString.split("\n") ?? [""]).reduce(
		({ finalString, indentationLevel }, line, i, array) => {
			const formattedLine = `${"\t".repeat(
				Math.max(indentationLevel - (line.includes("}") ? 1 : 0), 0)
			)}${line}`;
			const nextIndentationLevel = line.includes("{")
				? indentationLevel + 1
				: line.includes("}")
				? Math.max(indentationLevel - 1, 0)
				: indentationLevel;
			return {
				finalString: [...finalString, formattedLine],
				indentationLevel: nextIndentationLevel,
			};
		},
		{ finalString: [] as Array<string>, indentationLevel: 0 }
	);
	return finalString.join("\n");
};
</script>
