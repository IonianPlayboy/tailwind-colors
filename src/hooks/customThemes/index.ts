import { ref } from "@vue/reactivity";

const customThemes = ref({
	default: {
		shades: {},
		colors: {},
	},
} as Record<
	string,
	{
		shades: Record<
			string,
			{
				colorName: string;
				shadeNumber: number;
				hexCode: string;
				id: string;
				customName: string | null;
			}
		>;
		colors: Record<number, string>;
	}
>);

const addShadeToTheme = (
	{
		colorName,
		shadeNumber,
		hexCode,
	}: {
		colorName: string;
		shadeNumber: number;
		hexCode: string;
	},
	themeName = "default"
) => {
	customThemes.value[themeName].shades = {
		...(customThemes.value[themeName]?.shades ?? {}),
		[`${colorName}-${shadeNumber}`]: {
			colorName,
			shadeNumber,
			hexCode,
			id: `${colorName}-${shadeNumber}`,
			customName: null,
		},
	};
};
const editShadeNameFromTheme = (
	{ id, customName }: { id: string; customName: string },
	themeName = "default"
) => {
	if (!customThemes.value[themeName].shades) return;
	customThemes.value[themeName].shades[id].customName = customName;
};
const removeShadeFromTheme = (id: string, themeName = "default") => {
	if (!customThemes.value[themeName].shades) return;
	const {
		[id]: shadeToRemove,
		...restOfCurrThemeShades
	} = customThemes.value[themeName].shades;
	customThemes.value[themeName].shades = restOfCurrThemeShades;
	return shadeToRemove;
};

const changeThemeForShade = (
	id: string,
	newTheme: string,
	baseTheme = "default"
) => {
	if (!customThemes.value[newTheme].shades) return;
	const shadeData = removeShadeFromTheme(id, baseTheme);
	if (!shadeData) return;
	addShadeToTheme(shadeData, newTheme);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCustomThemes = () => ({
	customThemes,
	addShadeToTheme,
	editShadeNameFromTheme,
	changeThemeForShade,
	removeShadeFromTheme,
});
