import {
	calculateRGBGap,
	convertRGBToHexCode,
	convertHexCodeToRGB,
	RGB,
	RGBValues,
} from "@/utils";
import colors from "windicss/colors";

interface RGBGapInfos {
	hexCode: string;
	toPrevious: Record<RGB, number> | null;
	toNext: Record<RGB, number> | null;
	rgb: Record<RGB, number>;
	[x: string]: unknown;
}

const getGapsForShadesList = (
	shadesList: string | Record<string | number, string>
) =>
	Object.entries(shadesList).reduce(
		(res, [shadeNumber, hexCode], i, shadesArray) => {
			const [_ps, previousHexCode] = shadesArray[i - 1] ?? [];
			const [_ns, nextHexCode] = shadesArray[i + 1] ?? [];
			return {
				...res,
				[shadeNumber]: {
					hexCode,
					toPrevious: previousHexCode
						? calculateRGBGap(hexCode, previousHexCode)
						: null,
					toNext: nextHexCode
						? calculateRGBGap(hexCode, nextHexCode)
						: null,
					rgb: convertHexCodeToRGB(hexCode),
				},
			};
		},
		{} as Record<number, RGBGapInfos>
	);

export const getGapsBetweenBasicShades = (): Record<
	string,
	Record<number, RGBGapInfos>
> =>
	Object.entries(colors).reduce(
		(result, [colorName, shadesList]) =>
			colorName === "white" || colorName === "black"
				? result
				: {
						...result,
						[colorName]: getGapsForShadesList(shadesList),
				  },
		{} as Record<string, Record<number, RGBGapInfos>>
	);

const getDistanceBetweenColors = (
	colorA: Record<RGB, number>,
	colorB: Record<RGB, number>
) => {
	return Math.sqrt(
		(Object.entries(colorA) as Array<[RGB, number]>).reduce(
			(result, [key, value]) => result + Math.pow(value - colorB[key], 2),
			0
		)
	);
};

interface ClosestShadeInfos {
	distance: number;
	shadeNumber: number;
	hexCode: string;
}

interface ClosestColorInfos extends ClosestShadeInfos {
	colorName: string;
}

const getClosestShadeForColor = (
	currColor: string,
	shadesInfosList: Record<number, RGBGapInfos>
) =>
	((Object.entries(shadesInfosList) as unknown) as Array<
		[number, RGBGapInfos]
	>).reduce((res, [shadeNumber, gapInfos]) => {
		const currDistance = getDistanceBetweenColors(
			convertHexCodeToRGB(currColor),
			gapInfos.rgb
		);
		// console.log(colorName, shadeNumber, currDistance, res);
		return !res.hexCode || res.distance > currDistance
			? {
					distance: currDistance,
					shadeNumber,
					hexCode: gapInfos.hexCode,
			  }
			: res;
	}, {} as ClosestShadeInfos);

export const getClosestDefaultColor = (
	currColor: string
): ClosestColorInfos => {
	const defaultColorsGaps = getGapsBetweenBasicShades();
	return Object.entries(defaultColorsGaps).reduce(
		(result, [colorName, shadesList]) => {
			const nearestShadeData = getClosestShadeForColor(
				currColor,
				shadesList
			);
			return !result.hexCode ||
				nearestShadeData.distance < result.distance
				? {
						...nearestShadeData,
						colorName,
				  }
				: result;
		},
		{} as ClosestColorInfos
	);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const generateShadesForColor = (currColor: string) => {
	const defaultColorsGaps = getGapsBetweenBasicShades();
	const closestDefaultColor = getClosestDefaultColor(currColor);
	const colorName = closestDefaultColor.colorName;
	const result = {
		50: { hexCode: "", rgb: { red: 0, green: 0, blue: 0 } },
		100: { hexCode: "", rgb: { red: 0, green: 0, blue: 0 } },
		200: { hexCode: "", rgb: { red: 0, green: 0, blue: 0 } },
		300: { hexCode: "", rgb: { red: 0, green: 0, blue: 0 } },
		400: { hexCode: "", rgb: { red: 0, green: 0, blue: 0 } },
		500: { hexCode: "", rgb: { red: 0, green: 0, blue: 0 } },
		600: { hexCode: "", rgb: { red: 0, green: 0, blue: 0 } },
		700: { hexCode: "", rgb: { red: 0, green: 0, blue: 0 } },
		800: { hexCode: "", rgb: { red: 0, green: 0, blue: 0 } },
		900: { hexCode: "", rgb: { red: 0, green: 0, blue: 0 } },
	};
	const startingShade = closestDefaultColor.shadeNumber as keyof typeof result;
	result[startingShade].hexCode = currColor;
	result[startingShade].rgb = convertHexCodeToRGB(currColor);
	const upperShades = ((Object.keys(result) as unknown) as Array<
		keyof typeof result
	>).filter((key) => Number(key) > startingShade);
	const lowerShades = ((Object.keys(result) as unknown) as Array<
		keyof typeof result
	>)
		.filter((key) => Number(key) < startingShade)
		.reverse();
	upperShades.forEach((shade, i) => {
		const prevShade = i ? upperShades[i - 1] : startingShade;
		const currGap = defaultColorsGaps[colorName][prevShade];
		const prevRGB = convertHexCodeToRGB(result[prevShade].hexCode);
		result[shade].rgb = (Object.entries(prevRGB) as Array<
			[RGB, number]
		>).reduce(
			(res, [key, value]) => ({
				...res,
				[key]: Math.max(
					Math.min(
						Math.round(
							value + (currGap.toNext ? currGap.toNext[key] : 0)
						),
						255
					),
					0
				),
			}),
			{} as Record<RGB, number>
		);
		console.log("upper", shade, result[shade].rgb);
		result[shade].hexCode = convertRGBToHexCode(
			...(Object.values(result[shade].rgb) as RGBValues)
		);
	});
	lowerShades.forEach((shade, i) => {
		const prevShade = i ? lowerShades[i - 1] : startingShade;
		const currGap = defaultColorsGaps[colorName][prevShade];
		const prevRGB = convertHexCodeToRGB(result[prevShade].hexCode);
		result[shade].rgb = (Object.entries(prevRGB) as Array<
			[RGB, number]
		>).reduce(
			(res, [key, value]) => ({
				...res,
				[key]: Math.max(
					Math.min(
						Math.round(
							value +
								(currGap.toPrevious
									? currGap.toPrevious[key]
									: 0)
						),
						255
					),
					0
				),
			}),
			{} as Record<RGB, number>
		);
		console.log("lower", shade, result[shade].rgb);
		result[shade].hexCode = convertRGBToHexCode(
			...(Object.values(result[shade].rgb) as RGBValues)
		);
	});
	return result;
};
