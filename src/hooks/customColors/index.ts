import { ref } from "@vue/reactivity";
import colors from "windicss/colors";

const customColors = ref(
	Object.keys(colors).reduce(
		(result, key) => ({ ...result, [key]: {} }),
		{} as Record<string, Record<number, string>>
	)
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
	oldShadeNumber,
	newShadeNumber,
	hexCode,
}: {
	colorName: string;
	oldShadeNumber: number;
	newShadeNumber: number;
	hexCode: string;
}) => {
	removeShadeFromColor(colorName, oldShadeNumber);
	addCustomShade({ colorName, shadeNumber: newShadeNumber, hexCode });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCustomColors = () => ({
	customColors,
	addCustomShade,
	removeShadeFromColor,
	editShadeFromColor,
});
