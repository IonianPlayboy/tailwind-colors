<template>
	<transition-group
		tag="section"
		class="fixed transform left-1/2 -translate-x-1/2 bottom-5 w-sm md:w-4/10 mx-auto space-y-5"
		enter-active-class="transition-all duration-500 ease-in-out"
		enter-from-class="opacity-0 transform translate-y-30px"
		move-class="transition-all duration-700 ease-in-out"
		leave-active-class="transition-all duration-700 ease-in-out !absolute"
		leave-to-class="opacity-0 transform translate-y-30px"
	>
		<!--  -->
		<alert
			v-for="{ id, event, content, hexCode, shadeNumber } in currAlerts"
			:key="id"
			:style="{
				borderLeft: `0.75rem solid ${hexCode ?? 'transparent'}`,
			}"
			@alertDismissed="removeAlertFromList(id)"
		>
			{{ !event ? content : "" }}
			<template v-if="event === 'colorCopied'">
				The color
				<em
					class="box-content px-3 py-2 mx-1 not-italic font-bold border rounded shadow w-7ch border-warm-gray-700 font-display"
					:class="{
						'text-warm-gray-200': shadeNumber >= 400,
						'text-warm-gray-700': shadeNumber < 400,
					}"
					:style="{
						backgroundColor: hexCode,
						textShadow: getCurrTextShadow(shadeNumber),
					}"
				>
					{{ hexCode }}
				</em>
				was copied !
			</template>
		</alert>
	</transition-group>
</template>
<script lang="ts">
import { useAlerts } from "@/hooks";
</script>
<script setup lang="ts">
import Alert from "@/components/Alert.vue";
import { computed } from "@vue/runtime-core";
import { getCurrTextShadow } from "@/utils";

const { alertsList, removeAlertFromList } = useAlerts();

ref: currAlerts = computed(() =>
	Object.values(alertsList.value).sort((a, b) => b.id - a.id)
);
</script>
