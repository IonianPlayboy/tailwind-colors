export const formatColorKey = (key: string): string =>
	key
		.replaceAll(/([A-Z])/g, " $1")
		.replace(/^./, (match) => match.toUpperCase());
