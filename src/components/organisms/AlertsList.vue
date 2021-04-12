<template>
	<transition-group
		tag="section"
		class="fixed mx-auto space-y-5 transform -translate-x-1/2 left-1/2 bottom-5 w-sm md:w-4/10"
		enter-active-class="transition-all duration-500 ease-in-out"
		enter-from-class="transform opacity-0 translate-y-30px"
		move-class="transition-all duration-700 ease-in-out"
		leave-active-class="transition-all duration-700 ease-in-out !absolute"
		leave-to-class="transform opacity-0 translate-y-30px"
	>
		<alert-item
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
				<hexcode-display
					:shade-number="shadeNumber"
					:hex-code="hexCode"
				/>
				was copied !
			</template>
		</alert-item>
	</transition-group>
</template>
<script lang="ts">
import { useAlerts } from "@/hooks";
</script>
<script setup lang="ts">
import AlertItem from "@/components/molecules/AlertItem.vue";
import HexcodeDisplay from "@/components/atoms/HexcodeDisplay.vue";

const { currAlerts, removeAlertFromList } = useAlerts();
</script>
