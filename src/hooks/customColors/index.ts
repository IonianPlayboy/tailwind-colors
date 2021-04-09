import { ref } from "@vue/reactivity";
import { computed, watchEffect } from "vue";
import colors from "windicss/colors";

const customColors = ref(
	localStorage.getItem("customColors")
		? (JSON.parse(localStorage.getItem("customColors") || "{}") as Record<
				string,
				Record<number, string>
		  >)
		: Object.keys(colors).reduce(
				(result, key) => ({ ...result, [key]: {} }),
				{} as Record<string, Record<number, string>>
		  )
);

const addedColorsNames = ref(
	localStorage.getItem("addedColorsNames")
		? (JSON.parse(
				localStorage.getItem("addedColorsNames") || "{}"
		  ) as Record<
				string,
				{
					shadeNumber: number;
					hexCode: string;
				}
		  >)
		: ({} as Record<
				string,
				{
					shadeNumber: number;
					hexCode: string;
				}
		  >)
);

watchEffect(() => {
	localStorage.setItem("customColors", JSON.stringify(customColors.value));
});
watchEffect(() => {
	localStorage.setItem(
		"addedColorsNames",
		JSON.stringify(addedColorsNames.value)
	);
});

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
	addedColorsNames.value[colorName] = {
		hexCode,
		shadeNumber:
			Number(
				(Object.entries(shadesList).find(
					([_currShade, currHex]) => currHex === hexCode
				) ?? [])[0]
			) ?? 0,
	};
	customColors.value[colorName] = shadesList;
};

const removeCustomColor = (colorName: string) => {
	const {
		[colorName]: colorToRemove,
		...restOfAddedColorsNames
	} = addedColorsNames.value;
	addedColorsNames.value = restOfAddedColorsNames;

	const {
		[colorName]: shadesToRemove,
		...restOfCustomColors
	} = customColors.value;
	customColors.value = restOfCustomColors;
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
	removeCustomColor,
});
