import { ref } from "@vue/reactivity";
import { computed } from "vue";
import colors from "windicss/colors";

const customColors = ref(
	Object.keys(colors).reduce(
		(result, key) => ({ ...result, [key]: {} }),
		{} as Record<string, Record<number, string>>
	)
);

const addedColorsNames = ref({} as Record<string, string>);

interface ColorInfos {
	colorName: string;
	shadeNumber: number;
	hexCode: string;
}

const customShadesInfos = computed(() =>
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
		.filter(
			({ colorName }) =>
				!Object.keys(addedColorsNames.value).includes(colorName)
		)
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

const addCustomColor = (
	colorName: string,
	hexCode: string,
	shadesList: Record<number, string>
) => {
	addedColorsNames.value[colorName] = hexCode;
	customColors.value[colorName] = shadesList;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCustomColors = () => ({
	customColors,
	customShadesInfos,
	addedColorsNames,
	addCustomColor,
	addCustomShade,
	removeShadeFromColor,
	editShadeFromColor,
});
