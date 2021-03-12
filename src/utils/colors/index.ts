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

export const adjustColor = (
	closestColor: string,
	nearestColor: string,
	amount: number
): string => {
	const closestValues = getValuesFromColor(closestColor);
	const nearestValues = getValuesFromColor(nearestColor);

	const adjustedValues = (Object.entries(closestValues) as Array<
		[RGB, number]
	>).map(([currKey, currValue]) => {
		const currGap = Math.abs(currValue - nearestValues[currKey]);
		return calculateNewRGBValue(currValue, currGap, amount);
	}) as RGBValues;

	return formatHexColor(...adjustedValues);
};
export const findClosestShade = (
	currValue: number,
	currShades: Record<string | number, string>,
	shadeToExclude?: number
): number =>
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
