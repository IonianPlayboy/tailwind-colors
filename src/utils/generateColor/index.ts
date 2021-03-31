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
		return res.hexCode && res.distance <= currDistance
			? res
			: {
					distance: currDistance,
					shadeNumber,
					hexCode: gapInfos.hexCode,
			  };
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
			return result.hexCode &&
				result.distance <= nearestShadeData.distance
				? result
				: {
						...nearestShadeData,
						colorName,
				  };
		},
		{} as ClosestColorInfos
	);
};

type ShadesNumbersList = Readonly<
	[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
>;
type PossibleShadeNumber = ShadesNumbersList[number];

interface ShadeData {
	hexCode: string;
	rgb: { red: number; green: number; blue: number };
}

const calculateCurrRGBValue = (
	currValue: number,
	currKey: RGB,
	RGBGap: Record<RGB, number> | null
) =>
	Math.max(
		Math.min(Math.round(currValue + (RGBGap ? RGBGap[currKey] : 0)), 255),
		0
	);

const generateShadesInOrder = (
	startingShade: ShadeData & { shadeNumber: number },
	shadesNumbersToGenerate: Array<PossibleShadeNumber>,
	currentColorGaps: Record<number, RGBGapInfos>,
	direction: "toNext" | "toPrevious"
) =>
	shadesNumbersToGenerate.reduce((result, shadeNumber, i, array) => {
		const prevShade = array[i - 1];
		const prevRGB = prevShade ? result[prevShade].rgb : startingShade.rgb;
		const RGBGap =
			currentColorGaps[prevShade ?? startingShade.shadeNumber][direction];
		const rgb = (Object.entries(prevRGB) as Array<[RGB, number]>).reduce(
			(res, [key, value]) => ({
				...res,
				[key]: calculateCurrRGBValue(value, key, RGBGap),
			}),
			{} as Record<RGB, number>
		);
		return {
			...result,
			[shadeNumber]: {
				rgb,
				hexCode: convertRGBToHexCode(
					...(Object.values(rgb) as RGBValues)
				),
			},
		};
	}, {} as Record<PossibleShadeNumber, ShadeData>);

export const generateShadesForColor = (
	currColor: string
): Record<PossibleShadeNumber, ShadeData> => {
	const defaultColorsGaps = getGapsBetweenBasicShades();
	const closestDefaultColor = getClosestDefaultColor(currColor);
	const colorName = closestDefaultColor.colorName;
	const shadesNumberList: ShadesNumbersList = [
		50,
		100,
		200,
		300,
		400,
		500,
		600,
		700,
		800,
		900,
	];
	const startingShadeNumber = closestDefaultColor.shadeNumber as PossibleShadeNumber;
	const upperShadesNumbers = shadesNumberList.filter(
		(shade) => shade > startingShadeNumber
	);
	const lowerShadesNumbers = shadesNumberList
		.filter((shade) => shade < startingShadeNumber)
		.reverse();
	const startingShade = {
		shadeNumber: startingShadeNumber,
		hexCode: currColor,
	};
	const startingShadeInfos = {
		...startingShade,
		rgb: convertHexCodeToRGB(currColor),
	};
	const currentColorGaps = defaultColorsGaps[colorName];
	return {
		...generateShadesInOrder(
			startingShadeInfos,
			upperShadesNumbers,
			currentColorGaps,
			"toNext"
		),
		...generateShadesInOrder(
			startingShadeInfos,
			lowerShadesNumbers,
			currentColorGaps,
			"toPrevious"
		),
		[startingShadeNumber]: startingShade,
	};
};
