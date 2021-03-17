import { Ref } from "vue";

type RGB = "red" | "green" | "blue";
type RGBValues = [redValue: number, greenValue: number, blueValue: number];

const getValuesFromColor = (currColor: string) => ({
	red: parseInt(currColor.substring(1, 3), 16),
	green: parseInt(currColor.substring(3, 5), 16),
	blue: parseInt(currColor.substring(5, 7), 16),
});

const formatHexValue = (currValue: number) =>
	`${currValue < 16 ? "0" : ""}${currValue.toString(16)}`;

const formatHexColor = (red: number, green: number, blue: number) =>
	`#${formatHexValue(red)}${formatHexValue(green)}${formatHexValue(blue)}`;

const calculateNewRGBValue = (
	currValue: number,
	currGap: number,
	amount: number
) =>
	Math.max(
		Math.min(Math.round(currValue + (currGap * amount) / 100), 255),
		0
	);

const adjustColor = (
	closestColor: string,
	nearestColor: string,
	amount: number
) => {
	// console.log(`closestColor : ${closestColor}`);
	// console.log(`nearestColor : ${nearestColor}`);
	// console.log(`amount : ${amount}`);
	const closestValues = getValuesFromColor(closestColor);
	const nearestValues = getValuesFromColor(nearestColor);

	// console.log(`closestValues : `, closestValues);
	// console.log(`nearestValues : `, nearestValues);
	const adjustedValues = (Object.entries(closestValues) as Array<
		[RGB, number]
	>).map(([currKey, currValue]) => {
		const currGap = nearestValues[currKey] - currValue;
		console.log(`${currKey} currGap : ${currGap}`);
		return calculateNewRGBValue(currValue, currGap, Math.abs(amount));
	}) as RGBValues;
	// console.log(`adjustedValues : ${adjustedValues}`);
	return formatHexColor(...adjustedValues);
};

export const getCustomColor = (
	shadeNumber: number,
	shadesList: Record<number, string>
): string => {
	const foundShade = shadesList[shadeNumber];
	if (foundShade) return foundShade;
	const closestShade = findClosestShade(shadeNumber, shadesList);
	const nearestShade = findClosestShade(
		shadeNumber,
		shadesList,
		closestShade
	);
	return adjustColor(
		shadesList[closestShade],
		shadesList[nearestShade],
		closestShade - shadeNumber
	);
};

const findClosestShade = (
	currValue: number,
	currShades: Record<string | number, string>,
	shadeToExclude?: number
) =>
	Object.keys(currShades).reduce((result, key) => {
		if (!result) return Number(key);
		if (shadeToExclude && shadeToExclude === Number(key)) return result;
		return Math.abs(Number(key) - currValue) < Math.abs(result - currValue)
			? Number(key)
			: result;
	}, 0);

export const getCurrHexValue = (shadeNumber: number): string => {
	const hexValue = Math.round((shadeNumber / 900) * 255);
	return formatHexValue(hexValue);
};
