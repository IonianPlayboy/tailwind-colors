import { ref } from "@vue/reactivity";
import { computed } from "vue";
import colors from "windicss/colors";

const customColors = ref(
	Object.keys(colors).reduce(
		(result, key) => ({ ...result, [key]: {} }),
		{} as Record<string, Record<number, string>>
	)
);

interface ColorInfos {
	colorName: string;
	shadeNumber: number;
	hexCode: string;
}

const customColorsInfos = computed(() =>
	Object.entries(customColors.value)
		.reduce(
			(result, [colorName, value]) => [
				...result,
				...Object.entries(value).map(([shadeNumber, hexCode]) => ({
					colorName,
					shadeNumber: Number(shadeNumber),
					hexCode,
				})),
			],
			[] as Array<ColorInfos>
		)
		.flat()
		.sort((a, b) => a.colorName.localeCompare(b.colorName))
);

const addCustomShade = ({
	colorName,
	shadeNumber,
	hexCode,
}: {
	colorName: string;
	shadeNumber: number;
	hexCode: string;
}) => {
	customColors.value[colorName][shadeNumber] = hexCode;
};
const removeShadeFromColor = (colorName: string, shadeNumber: number) => {
	const {
		[shadeNumber]: _shadeToRemove,
		...restOfShades
	} = customColors.value[colorName];
	customColors.value[colorName] = restOfShades;
};

const editShadeFromColor = ({
	colorName,
	shadeNumber,
	oldShadeNumber,
	hexCode,
}: {
	colorName: string;
	shadeNumber: number;
	oldShadeNumber: number;
	hexCode: string;
}) => {
	removeShadeFromColor(colorName, oldShadeNumber);
	addCustomShade({ colorName, shadeNumber, hexCode });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCustomColors = () => ({
	customColors,
	customColorsInfos,
	addCustomShade,
	removeShadeFromColor,
	editShadeFromColor,
});
