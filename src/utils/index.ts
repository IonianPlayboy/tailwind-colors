import { useAlerts } from "@/hooks";
import { getCurrHexValue } from "@/utils/colors";

export const formatColorKey = (key: string): string =>
	key
		.replace(/([A-Z])/g, " $1")
		.replace(/^./, (match) => match.toUpperCase());

const { addAlertToList } = useAlerts();

export const copyCurrValue = async (
	currValue: string,
	shadeNumber: number
): Promise<void> => {
	try {
		navigator.clipboard.writeText(currValue);
		addAlertToList({
			event: "colorCopied",
			hexCode: currValue,
			shadeNumber,
		});
	} catch (error) {
		console.log(error);
	}
};
export * from "./colors";

import colors from "windicss/colors";
export const getCurrTextShadow = (shadeNumber: number): string => {
	const shadow = `2px 2px 6px ${colors.warmGray[900]}${getCurrHexValue(
		shadeNumber
	)}`;
	const outlineColor =
		shadeNumber < 400 ? colors.warmGray[100] : colors.warmGray[900];
	const outline = `1px 0 0 ${outlineColor}AA,
		0 1px 0 ${outlineColor}AA,
		-1px 0 0 ${outlineColor}AA,
		0 -1px 0 ${outlineColor}AA`;
	return `${outline}, ${shadow}`;
};
