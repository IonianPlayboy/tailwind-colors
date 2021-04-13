import { ref } from "@vue/reactivity";
import { computed } from "vue";

type AlertInfos =
	| {
			event: null;
			content: string;
	  }
	| {
			event: "colorSaved";
			hexCode: string;
			shadeNumber: number;
	  }
	| {
			event: "colorCopied";
			hexCode: string;
			shadeNumber: number;
	  };

type Alert = { id: number } & AlertInfos;

let alertID = 0;

const alertsList = ref<Record<number, Alert>>({});
const currAlerts = computed(() =>
	Object.values(alertsList.value).sort((a, b) => b.id - a.id)
);

const addAlertToList = (alertParams: AlertInfos) => {
	const currID = alertID++;
	alertsList.value = {
		...alertsList.value,
		[currID]: {
			...alertParams,
			id: currID,
		},
	};
};
const removeAlertFromList = (alertID: number) => {
	const { [alertID]: _alertToRemove, ...restOfAlerts } = alertsList.value;
	alertsList.value = restOfAlerts;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAlerts = () => ({
	alertsList,
	currAlerts,
	addAlertToList,
	removeAlertFromList,
});
