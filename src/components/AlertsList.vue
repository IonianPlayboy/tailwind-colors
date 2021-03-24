<template>
	<div class="absolute w-full bottom-5">
		<transition-group
			tag="div"
			class="relative flex flex-col w-3/6 mx-auto space-y-5"
			name="alert"
		>
			<!--  -->
			<alert
				v-for="{
					id,
					event,
					content,
					hexCode,
					shadeNumber,
				} in currAlerts"
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
	</div>
</template>
<script lang="ts">
import { useAlerts } from "@/hooks";
</script>
<script setup lang="ts">
import Alert from "@/components/Alert.vue";
import { computed } from "@vue/runtime-core";
import { watchEffect } from "vue";
import { getCurrTextShadow } from "@/utils";

const { alertsList, removeAlertFromList } = useAlerts();

ref: currAlerts = computed(() =>
	Object.values(alertsList.value).sort((a, b) => b.id - a.id)
);

watchEffect(() => console.log(currAlerts));
</script>
<style>
.alert-enter-active,
.alert-leave-active,
.alert-move {
	transition: all 0.5s ease;
}
.alert-enter-from,
.alert-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
.alert-leave-active {
	position: absolute !important;
	bottom: 0;
}
.alert-move {
	transition: transform 0.8s ease;
}
</style>
