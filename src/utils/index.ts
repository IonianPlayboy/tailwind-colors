import { useAlerts } from "@/hooks";

export const formatColorKey = (key: string): string =>
	key
		.replaceAll(/([A-Z])/g, " $1")
		.replace(/^./, (match) => match.toUpperCase());

const { addAlertToList } = useAlerts();

export const copyCurrValue = async (currValue: string): Promise<void> => {
	try {
		navigator.clipboard.writeText(currValue);
		console.log(`The color ${currValue} was copied !`);
		addAlertToList({
			content: `The color ${currValue} was copied !`,
		});
	} catch (error) {
		console.log(error);
	}
};
