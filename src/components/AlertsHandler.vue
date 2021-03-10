<template>
	<div class="absolute w-full bottom-4">
		<transition-group
			tag="div"
			class="relative space-y-4 flex flex-col w-3/6 mx-auto"
			name="alert"
		>
			<alert
				v-for="{ id, content } in currAlerts"
				:key="id"
				@alertDismissed="removeAlertFromList(id)"
			>
				{{ content }}
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

const { alertsList, removeAlertFromList } = useAlerts();

ref: currAlerts = computed(() =>
	Object.values(alertsList.value).sort((a, b) => b.id - a.id)
);
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
