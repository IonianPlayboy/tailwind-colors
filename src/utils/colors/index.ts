import { Ref } from "vue";

export type RGB = "red" | "green" | "blue";
export type RGBValues = [
	redValue: number,
	greenValue: number,
	blueValue: number
];

export const convertHexCodeToRGB = (hexCode: string): Record<RGB, number> => ({
	red: parseInt(hexCode.substring(1, 3), 16),
	green: parseInt(hexCode.substring(3, 5), 16),
	blue: parseInt(hexCode.substring(5, 7), 16),
});

const formatHexValue = (currValue: number) =>
	`${currValue < 16 ? "0" : ""}${currValue.toString(16)}`;

export const convertRGBToHexCode = (
	red: number,
	green: number,
	blue: number
): string =>
	`#${formatHexValue(red)}${formatHexValue(green)}${formatHexValue(blue)}`;

export const calculateRGBGap = (
	baseHexCode: string,
	otherHexCode: string
): Record<RGB, number> => {
	const baseRGBValues = convertHexCodeToRGB(baseHexCode);
	const otherRBGValues = convertHexCodeToRGB(otherHexCode);
	return (Object.entries(baseRGBValues) as Array<[RGB, number]>).reduce(
		(result, [key, value]) => ({
			...result,
			[key]: Math.max(
				Math.min(Math.round(otherRBGValues[key] - value), 255),
				-255
			),
		}),
		{} as Record<RGB, number>
	);
};

const calculateNewRGBValue = (
	currValue: number,
	currGap: number,
	amount: number
) =>
	Math.max(
		Math.min(Math.round(currValue + (currGap * amount) / 100), 255),
		0
	);

const adjustShade = (
	closestHexCode: string,
	nearestHexCode: string,
	amount: number
) => {
	const closestValues = convertHexCodeToRGB(closestHexCode);
	const nearestValues = convertHexCodeToRGB(nearestHexCode);
	const adjustedValues = (Object.entries(closestValues) as Array<
		[RGB, number]
	>).map(([currKey, currValue]) => {
		const currGap = nearestValues[currKey] - currValue;
		return calculateNewRGBValue(
			currValue,
			nearestHexCode === "#000000" ? currGap / 8 : currGap,
			Math.abs(amount)
		);
	}) as RGBValues;
	return convertRGBToHexCode(...adjustedValues);
};

export const getCustomShade = (
	shadeNumber: number,
	shadesList: Record<number, string>
): string => {
	const foundShade = shadesList[shadeNumber];
	if (foundShade) return foundShade;
	const [closestShadeNumber, nearestShadeNumber] = findClosestShadesNumbers(
		shadeNumber
	);
	const nearestHexCode =
		shadesList[nearestShadeNumber as number] ??
		(shadeNumber > closestShadeNumber ? "#000000" : "#ffffff");
	return adjustShade(
		shadesList[closestShadeNumber],
		nearestHexCode,
		closestShadeNumber - shadeNumber
	);
};

const findClosestShadesNumbers = (
	currValue: number
): [ClosestShade: number, NearestShade: number | null] => {
	if (currValue > 900) return [900, null];
	if (currValue < 50) return [50, null];
	if (currValue < 100) return currValue <= 75 ? [50, 100] : [100, 50];
	const closestShade = Math.round(currValue / 100) * 100;
	const nearestShade =
		closestShade + (currValue >= closestShade ? 1 : -1) * 100;
	return [closestShade, nearestShade];
};

export const getCurrHexValue = (shadeNumber: number): string => {
	const hexValue = Math.round((shadeNumber / 900) * 255);
	return formatHexValue(hexValue);
};
