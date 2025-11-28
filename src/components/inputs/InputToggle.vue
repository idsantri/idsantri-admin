<template lang="">
	<q-field outlined :dense="dense" :disable="disable" :filled="disable">
		<template v-slot:control>
			<q-toggle
				v-model="model"
				:true-value="trueValue"
				:false-value="falseValue"
				:dense="dense"
				:label="label"
				checked-icon="check"
				unchecked-icon="clear"
				:color="color"
				:disable="disable"
				:left-label="leftLabel"
			/>
			<span v-if="leftLabel" class="q-ml-sm text-italic text-caption">{{ model ? trueText : falseText }}</span>
		</template>
	</q-field>
</template>
<script setup>
const model = defineModel({
	type: [String, Number, Boolean],
	default: false,
});
defineProps({
	label: { type: String, default: '' },
	trueValue: { type: [String, Number, Boolean], default: true },
	falseValue: { type: [String, Number, Boolean], default: false },
	trueText: { type: String, default: 'Ya' },
	falseText: { type: String, default: 'Tidak' },
	dense: { type: Boolean, default: true },
	color: { type: String, default: 'green-6' },
	disable: { type: Boolean, default: false },
	leftLabel: { type: Boolean, default: true },
});
</script>
<style lang=""></style>
